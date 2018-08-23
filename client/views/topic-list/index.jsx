import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import {
  observer,
  inject,
} from 'mobx-react'
import Helmet from 'react-helmet'
import AppState from '../../store/app-static'
@inject('appState') @observer
export default class TopicList extends React.Component {
  constructor() {
    super()
    this.changeName = this.changeName.bind(this)
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

  changeName(event) {
    const test = this.props;
    test.appState.changeName(event.target.value)
  }

  render() {
    const test = this.props;
    return (
      <div>
        <Helmet>
          <title>
            Title good
          </title>
          <meta name="description" content="this description" />
        </Helmet>
        <Button variant="contained" color="primary">
          按钮
        </Button>
        <input type="text" onChange={this.changeName} />
        <div>
          {test.appState.msg}
        </div>
      </div>
    )
  }
}

TopicList.propTypes = {
  appState: PropTypes.instanceOf(AppState), // eslint-disable-line
}
