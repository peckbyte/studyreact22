import React from 'react'
import ReactDOM from 'react-dom'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { lightBlue, pink } from '@material-ui/core/colors'
import { AppContainer } from 'react-hot-loader' //eslint-disable-line
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'mobx-react'
import App from './views/App'
import AppState from './store/app-static'

const theme = createMuiTheme({
  palette: {
    primary: lightBlue,
    secondary: pink,
    type: 'light',
  },
})
const initialState = window.__INITIAL__STATE__ || { }  // eslint-disable-line

const root = document.getElementById('root')
const render = Component => ReactDOM.hydrate(
  <AppContainer key="appcontainer">
    <Provider appState={new AppState(initialState.appState)} key="provider">
      <BrowserRouter key="router">
        <MuiThemeProvider theme={theme}>
          <Component />
        </MuiThemeProvider>
      </BrowserRouter>
    </Provider>
  </AppContainer>,
  root,
)

render(App)

if (module.hot) {
  module.hot.accept('./views/App', () => {
    const NextApp = require('./views/App').default //eslint-disable-line
    // ReactDOM.hydrate(<NextApp />,document.getElementById('root'))
    render(NextApp)
  })
}
