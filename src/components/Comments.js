import React, { Component } from 'react'
import Comment from './Comment'
import { CardText } from 'material-ui/Card'
import appFetch from '../components/AppFetch'
import TextField from 'material-ui/TextField'

export default class Comments extends Component {
    constructor(props) {
        super(props)
        this.state = {
            comments: [],
            showComments: this.props.showComments,
            post_id: this.props.post.post_id,
            comment: {}
        }
    }

    receiveComments = post_id => {
        appFetch('comments', '', '', post_id)
            .then(response => response.json())
            .then(comments => this.setState({ comments: comments }))
    }
    addComment = comment => {
        appFetch('comments', 'PUT', comment)
            .then(response => response.json())
            .then(comment => this.setState(prevState => { return { ...prevState, comment } }))
    }

    editComment = (comment) => {
        appFetch('comments/comment_id', 'POST', comment)
            .then(response => response.json())
            .then(comment => this.setState(prevState => { return { ...prevState, comment } }))

    }

    deleteComment = (event, comment, tr) => {
        if (event.key !== 'Enter' && tr) {
            appFetch('comments/comment_id', 'DELETE', comment, this.state.post_id)
                .then(response => response.json())
                .then(comments => this.setState({ comments: comments }))
        }
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
                <div style={{ paddingLeft: 18, paddingRight: 18 }} >
                    <TextField
                        hintText="Add a comment"
                        multiLine
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
                </div>
                <CardText
                    style={{ maxWidth: 125, padding: 2, paddingLeft: 18, paddingRight: 16, paddingBottom: 8 }}
                    onClick={this.onReceiveComments}
                >
                    {this.state.showComments ? 'Hide comments' : 'Show comments'}
                </CardText>
                {
                    this.state.showComments ?
                        <div>
                            {
                                this.state.comments.map((comment) => (
                                    <div key={comment.comment_id} style={{ maxWidth: 500, paddingBottom: 5 }}>
                                        <Comment
                                            comment={comment}
                                            editComment={this.editComment}
                                            onDeleteComment={this.deleteComment}
                                        />
                                    </div>
                                ))
                            }
                        </div>
                        :
                        null
                }
            </div>
        )
    }
}
