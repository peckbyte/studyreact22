const asyncBootstrap = require('react-async-bootstrapper')
const ejs = require('ejs')
const serialize = require('serialize-javascript')
const ReactDomServer = require('react-dom/server')
const Helmet = require('react-helmet').default

const getStoreState = (stores) => {
  return Object.keys(stores).reduce((result,storeName) => {
    result[storeName] = stores[storeName].toJson()
    return result
  }, {})
}


module.exports = (bundle, template, req, res) => {
  return new Promise((resolve,reject) =>
  {
    const createStoreMap = bundle.createStoreMap  // eslint-disable-line
    const createApp = bundle.default
    const routerContex = {}
    const stores = createStoreMap()  // eslint-disable-line
    const app = createApp(stores, routerContex, req.url)
    asyncBootstrap(app).then(() => {

      if (routerContex.url) {
        res.status(302).setHeader('Location', routerContex.url)
        res.end()
        return
      }
      const helmet = Helmet.rewind()
      const content = ReactDomServer.renderToString(app)
      const state = getStoreState(stores)
      console.log(stores.appState.count)

      const html = ejs.render(template, {
        appString: content,
        initialState: serialize(state),
        meta: helmet.meta.toString(),
        title: helmet.title.toString(),
        style: helmet.style.toString(),
        link: helmet.link.toString(),
      })

      res.send(html)
      resolve()

    }).catch(reject)
  })
}
