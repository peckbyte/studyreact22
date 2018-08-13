import React from 'react'
import PropTypes from 'prop-types'
import {
  observer,
  inject,
} from 'mobx-react'
import { AppState } from '../../store/app-static'

@inject('appState') @observer
export default class TopicList extends React.Component {
  constructor() {
    super()
    this.changeName = this.changeName.bind(this)
  }

  componentDidMount() {
    // do something here
  }

  changeName(event) {
    const test = this.props;
    test.appState.changeName(event.target.value)
  }

  render() {
    const test = this.props;
    return (
      <div>
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
