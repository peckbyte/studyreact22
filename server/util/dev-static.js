const axios = require('axios')
const path = require('path')
const webpack = require('webpack')
const serverConfig = require('../../build/webpack.config.server')
const ReactDomServer = require('react-dom/server')
const MemoryFs = require('memory-fs')
const proxy = require('http-proxy-middleware')
const asyncBootstrap = require('react-async-bootstrapper')
const getTemplate = () => {
return new Promise((resolve, reject) => {
    axios.get('http://0.0.0.0:5577/public/index.html')
        .then(res => {
            resolve(res.data)
        })
        .catch(reject)
})
}

const Module = module.constructor
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
        const content = ReactDomServer.renderToString(app)

        if(routerContex.url) {
          res.status(302).setHeader('Location',routerContex.url)
          res.end()
          return
        }
        console.log(stores.appState.count)
        res.send(template.replace('<!-- app -->',content))
      })

    })
})
}
