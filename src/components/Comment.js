import React, { Component } from 'react'
import { CardText } from 'material-ui/Card'
import DeleteIcon from 'material-ui/svg-icons/action/delete'
import CommentActions from './CommentActions'
import IconButton from 'material-ui/IconButton'

export default class Comment extends Component {
    constructor(props) {
        super(props)
        this.state = {
            comment: this.props.comment,
            open: false
        }
    }

    isClose = () => { this.setState({ open: false }) }
    isOpen = () => { this.setState({ open: true }) }

    render() {
        return (
            <CardText style={{ paddingTop: 1, paddingBottom: 1, margin: 0 }}>
                <div style={{ fontWeight: 'bold', maxWidth: '50%', float: 'left' }}>{this.state.comment.name}</div>
                <div style={{ maxWidth: '100%' }}>
                    &nbsp;  {this.state.comment.text}
                    {
                        `${this.state.comment.user_id}` === localStorage.getItem('user_id') ?
                            <div style={{ maxWidth: 30, height: 14, padding: 0, float: 'right' }} >
                                <DeleteIcon
                                    style={{ width: 14, height: 14, padding: 0, float: 'right' }}
                                    onClick={ev => this.props.onDeleteComment(ev, this.state.comment, true)}
                                />
                                <IconButton
                                    onClick={() => this.isOpen()}
                                    style={{ width: 14, height: 14, padding: 0, float: 'right', backgroundColor: 'black' }}
                                >
                                    <CommentActions
                                        comment={this.state.comment}
                                        editComment={this.props.editComment}
                                        open={this.state.open}
                                        isClose={this.isClose}
                                    />
                                </IconButton>
                            </div>
                            :
                            null
                    }
                </div>
            </CardText>
        )
    }
}
