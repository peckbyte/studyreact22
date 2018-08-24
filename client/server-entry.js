import React from 'react'
import { StaticRouter } from 'react-router-dom'
import { Provider, useStaticRendering } from 'mobx-react'
import { MuiThemeProvider } from '@material-ui/core/styles'
import JssProvider from 'react-jss/lib/JssProvider'
import App from './views/App'
import { createStoreMap } from './store/store'

useStaticRendering(true)

export default (stores, routerContext, sheetsRegistry, generateClassName, theme, sheetsManager, url) => ( // eslint-disable-line
  <Provider {...stores}>
    <StaticRouter context={routerContext} location={url}>
      <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
        <MuiThemeProvider theme={theme} sheetsManager={sheetsManager}>
          <App />
        </MuiThemeProvider>
      </JssProvider>
    </StaticRouter>
  </Provider>
)

export { createStoreMap }
