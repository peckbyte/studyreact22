import AppState from './app-static'
import TopicStore from './topic-store'

export { AppState, TopicStore }

export default {
  AppState,
  TopicStore,
}

/* eslint-disable */
export const createStoreMap = () => {
  return{
    appState: new AppState(),
    topicStore: new TopicStore(),
  }
}
/* eslint-enable */
