import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
// import Avatar from '@material-ui/core/Avatar'
import ProTypes from 'prop-types'
import IconTest from '@material-ui/icons/Home'
import { withStyles } from '@material-ui/core/styles'
import {
  topicPrimaryStyle,
  topicSecondaryStyles,
} from './styles'

const Primary = ({ classes, topic }) => (
  <div className={classes.root}>
    <span className={classes.tab}>
      { topic.tab }
    </span>
    <span className={classes.title}>
      { topic.title }
    </span>
  </div>
)

const Secondary = ({ classes, topic }) => (
  <div className={classes.root}>
    <span className={classes.userName}>
      {topic.username}
    </span>
    <span className={classes.count}>
      <span className={classes.accentColor}>
        {topic.reply_count}
      </span>
      <span>
        /
      </span>
      <span>
        {topic.visit_count}
      </span>
    </span>
    <span>
      创建时间：
      {topic.create_at}
    </span>
  </div>
)

const StylePrimary = withStyles(topicPrimaryStyle)(Primary)
const StyleSecondary = withStyles(topicSecondaryStyles)(Secondary)

const TopicListItem = ({ onClick, topic }) => (
  <ListItem button onClick={onClick}>
    <ListItemAvatar>
      <IconTest />
    </ListItemAvatar>
    <ListItemText
      primary={<StylePrimary topic={topic} />}
      secondary={<StyleSecondary topic={topic} />}
    />
  </ListItem>
)


Primary.propTypes = {
  topic: ProTypes.object.isRequired,
  classes: ProTypes.object.isRequired,
}
Secondary.propTypes = {
  topic: ProTypes.object.isRequired,
  classes: ProTypes.object.isRequired,
}

TopicListItem.propTypes = {
  onClick: ProTypes.func.isRequired,
  topic: ProTypes.object.isRequired,
}

export default TopicListItem
