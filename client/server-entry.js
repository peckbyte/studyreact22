import React from 'react'
import { StaticRouter } from 'react-router-dom'

import App from './views/App'


export default ( routerContext, url) => (
  <StaticRouter context={routerContext} location={url}>
     <App />
  </StaticRouter>
)
