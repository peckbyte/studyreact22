import AppStateClass from './app-static'

export const AppState = AppStateClass

export default {
  AppState,
}

/* eslint-disable */
export const createStoreMap = () => {
  return{
    appState: new AppState(),
  }
}
/* eslint-enable */
