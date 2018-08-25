import React from 'react'
import PropTypes from 'prop-types'
// import Button from '@material-ui/core/Button'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import {
  observer,
  inject,
} from 'mobx-react'
import Helmet from 'react-helmet'
import AppState from '../../store/app-static'
import Container from '../layout/container'
import TopicListItem from './list-item'
@inject('appState') @observer
export default class TopicList extends React.Component {
  constructor() {
    super()
    this.state = {
      tabIndex: 0,
    }
    this.changeTab = this.changeTab.bind(this)
    this.listItemClick = this.listItemClick.bind(this)
  }

  componentDidMount() {
    // do something here
  }

  asyncBootstrap() {
    const test = this.props
    return new Promise((resolve) => {
      setTimeout(() => {
        test.appState.count = 5
        resolve(true)
      })
    })
  }

  changeTab(e, index) {
    this.setState({
      tabIndex: index,
    })
  }
  /* eslint-disable */
  listItemClick() {
  }
  /* eslint-enable */

  render() {
    const {
      tabIndex, // 这里使用了解构函数
    } = this.state

    const topic = {
      title: 'this is title',
      username: 'Jokcy',
      reply_count: 20,
      visit_count: 30,
      create_at: '2018年8月',
      tab: 'share',
    }
    // const test = this.props;
    return (
      <Container>
        <Helmet>
          <title>
            Title good
          </title>
          <meta name="description" content="this description" />
        </Helmet>
        <Tabs value={tabIndex} onChange={this.changeTab}>
          <Tab label="全部" />
          <Tab label="分享" />
          <Tab label="工作" />
          <Tab label="问答" />
          <Tab label="精品" />
          <Tab label="测试" />
        </Tabs>
        <TopicListItem onClick={this.listItemClick} topic={topic} />
      </Container>
    )
  }
}

TopicList.propTypes = {
  appState: PropTypes.instanceOf(AppState), // eslint-disable-line
}
