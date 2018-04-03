import React, { Component } from 'react'
import Comment from './Comment'
import CommentActions from './CommentActions'
import { CardText } from 'material-ui/Card'
import appFetch from '../components/AppFetch'

export default class Comments extends Component {
    constructor(props) {
        super(props)
        this.state = {
            comments: [],
            showComments: false,
            post_id: this.props.post.post_id
        }
    }

    receiveComments = post_id => {
        appFetch('comments', '', '', post_id)
            .then(response => response.json())
            .then(comments => this.setState({ comments: comments }))
    }
    addComment = (comment) => {
        appFetch('comments', 'PUT', comment)
            .then(response => response.json())
            .then(comment => this.setState(prevState => { return { ...prevState, comment } }))
    }
    // editComment = comment => {
    //     appFetch('comments/comment_id', 'POST', comment)
    //         .then(response => response.json())
    //         .then(response => (
    //             this.state.comments.map((comment) => {
    //                 if (comment.comment_id === response.comment_id) {
    //                     return {
    //                         ...comment,
    //                         text: response.text,
    //                     }
    //                 }
    //                 return comment
    //             }))
    //         )
    // }
    // deleteComment = (comment) => {
    //     console.log(comment)
    //     appFetch('comments/comment_id', 'DELETE', comment)
    //         .then(response => response.json())
    //         .then(comments => console.log(comments))
    // }    

    onReceiveComments = () => {
        if (!this.state.showComments) {
            this.receiveComments(this.state.post_id)
            this.handleClick()
        }
    }
    handleClick = () => {
        this.setState(prevState => {
            return { showComments: !prevState.showComments }
        })
    }
    render() {
        return (
            <span>
                <CommentActions
                    addComment={this.addComment}
                    handleComments={this.onReceiveComments}
                    showComments={this.state.showComments}
                    post={this.props.post}
                />
                <CardText
                    style={{ maxWidth: 125, padding: 2, paddingLeft: 18, paddingRight: 16, paddingBottom: 8 }}
                    onClick={this.handleClick}
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
            </span>
        )
    }
}
