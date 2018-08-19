const axios = require('axios')
const path = require('path')
const webpack = require('webpack')
const serverConfig = require('../../build/webpack.config.server')
const ReactDomServer = require('react-dom/server')
const MemoryFs = require('memory-fs')
const proxy = require('http-proxy-middleware')
const asyncBootstrap = require('react-async-bootstrapper')
const ejs = require('ejs')
const serialize = require('serialize-javascript')
const getTemplate = () => {
return new Promise((resolve, reject) => {
    axios.get('http://0.0.0.0:5577/public/server.ejs')
        .then(res => {
            resolve(res.data)
        })
        .catch(reject)
})
}

const NativeModule = require('module')
const vm = require('vm')
const getModuleFromString = (bundle, filename) => {
  const m = {exports: { } }
  const wrapper = NativeModule.wrap(bundle)
  const script = vm.Script(wrapper, {
    filename: filename,
    displayErrors: true,
  })

  const result = script.runInThisContext()
  result.call(m.exports, m.exports, require, m)

}


// const Module = module.constructor
let serverBundle, createStoreMap
const  mfs = new MemoryFs
const serverCompiler = webpack(serverConfig)
serverCompiler.outputFileSystem = mfs
serverCompiler.watch({},(err,stats) => {
    if(err) throw err
    stats = stats.toJson()
    stats.errors.forEach(err => console.error(err))
    stats.warnings.forEach(warn => console.warn(warn))

    const bundlePath = path.join(
        serverConfig.output.path,
        serverConfig.output.filename
    )
    const bundle = mfs.readFileSync(bundlePath,'utf-8')
    const m = new Module()
    m._compile(bundle,'server-entry.js')
    serverBundle = m.exports.default
    createStoreMap = m.exports.createStoreMap
})

const getStoreState = (stores) => {
  return Object.keys(stores).reduce((result,storeName) => {
    result[storeName] = stores[storeName].toJson()
    return result
  }, {})
}


module.exports = function (app) {
    app.use('/public',proxy({
        target: 'http://0.0.0.0:5577'
    }))
app.get('*',function (req,res) {
    getTemplate().then(template => {
      const routerContex = {}
      const stores = createStoreMap()
      const app = serverBundle(stores, routerContex, req.url)
      asyncBootstrap(app).then(() => {

        if(routerContex.url) {
          res.status(302).setHeader('Location',routerContex.url)
          res.end()
          return
        }
        const content = ReactDomServer.renderToString(app)
        const state = getStoreState(stores)
        console.log(stores.appState.count)

        const html = ejs.render(template,{
          appString: content,
          initialState: serialize(state),
        })

        res.send(html)

        // res.send(template.replace('<!-- app -->',content))
      })

    })
})
}
