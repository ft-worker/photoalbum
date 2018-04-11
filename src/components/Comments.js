import React, { Component } from 'react'
import Comment from './Comment'
import appFetch from '../components/AppFetch'
import TextField from 'material-ui/TextField'
import { CardActions } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'

export default class Comments extends Component {
  constructor(props) {
    super(props)
    this.state = {
      comments: [],
      showComments: this.props.showComments,
      post_id: this.props.post.post_id
    }
  }

  receiveComments = post_id => {
    appFetch('comments', '', '', post_id)
      .then(response => response.json())
      .then(comments => this.setState(prevState => { return { ...prevState, comments: comments } }))
  }
  addComment = comment => {
    appFetch('comments/comment', 'PUT', comment)
      .then(response => response.json())
      .then(comment => this.setState(prevState => { return { ...prevState, comments: [...prevState.comments, comment] } }))
  }

  editComment = (comment) => {
    appFetch('comments/comment/comment_id', 'POST', comment, this.state.post_id)
      .then(response => response.json())
      .then(comments => this.setState(prevState => { return { ...prevState, comments: comments } }))
  }

  deleteComment = comment => {
    appFetch('comments/comment/comment_id', 'DELETE', comment, this.state.post_id)
      .then(response => response.json())
      .then(comments => this.setState(prevState => { return { ...prevState, comments: comments } }))

  }

  onReceiveComments = (ev) => {
    if (!this.state.showComments) {
      this.receiveComments(this.state.post_id)
    }
    if (ev.key !== 'Enter') {
      this.setState(prevState => {
        return { showComments: !prevState.showComments }
      })
    }
  }

  commentChange = text => {
    this.setState(prevState => {
      const comment = { ...prevState.comment, text, post_id: this.state.post_id }
      return { comment }
    })
  }

  onAddComment = (ev) => {
    this.addComment(this.state.comment)
    this.onReceiveComments(ev)
  }

  render() {
    return (
      <div>
        <CardActions
          onClick={this.onReceiveComments}
          style={{ clear: 'both', padding: 0, maxWidth: 120 }}
        >
          <FlatButton
            label={this.state.showComments ? 'Hide comments' : 'Show comments'}
            labelStyle={{ fontSize: 11, color: 'grey', padding: 0 }}
            style={{ size: 'small', textAlign: 'center', marginLeft: 13, width: 110, marginBottom: 7 }}
          />
        </CardActions>
        {
          this.state.showComments ?
            <div>
              <div style={{ maxWidth: 700, marginLeft: 18, marginRight: 18 }}>
                {
                  localStorage.getItem('user_id') ?
                    <TextField
                      hintText="Add a comment"
                      multiLine
                      required
                      fullWidth
                      onChange={(event, text) => this.commentChange(text)}
                      onKeyPress={(ev) => {
                        if (ev.key === 'Enter') {
                          this.onAddComment(ev)
                          ev.currentTarget.value = null
                          ev.preventDefault()
                        }
                      }}
                    />
                    :
                    null
                }
              </div>
              <div style={{ maxWidth: 700, marginLeft: 0, marginRight: 0 }}>
                {
                  this.state.comments.map((comment) => (
                    <div key={comment.comment_id} style={{ maxWidth: 700, padding: 0, margin: 0 }}>
                      <Comment
                        comment={comment}
                        editComment={this.editComment}
                        deleteComment={this.deleteComment}
                      />
                    </div>
                  ))
                }
              </div>
            </div>
            :
            null
        }
      </div >
    )
  }
}
