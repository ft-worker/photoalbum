import React, { Component } from 'react'
import { Card, CardHeader, CardActions } from 'material-ui/Card'
import DeleteIcon from 'material-ui/svg-icons/action/delete'
import EditIcon from 'material-ui/svg-icons/image/edit'
import CommentActions from './CommentActions'
import IconButton from 'material-ui/IconButton'
import DeleteComment from './DeleteComment'
import AccountCircle from 'material-ui/svg-icons/action/account-circle'

export default class Comment extends Component {
    constructor(props) {
        super(props)
        this.state = {
            comment: this.props.comment,
            open: false,
            deleteOpen: false
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ comment: nextProps.comment })
    }

    isClose = () => { this.setState({ open: false }) }
    isOpen = () => { this.setState({ open: true }) }
    isDeleteClose = () => { this.setState({ deleteOpen: false }) }
    isDeleteOpen = () => { this.setState({ deleteOpen: true }) }

    render() {
        return (
            <Card
                style={{
                    maxWidth: 700,
                    padding: 0,
                    margin: 0,
                    boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 0px, inset rgba(0, 0, 0, 0.12) 0px 1px 0px 0px',
                    borderRadius: 2
                }}
            >
                {
                    `${this.state.comment.user_id}` === localStorage.getItem('user_id') ?
                        <CardActions style={{ float: 'right', padding: 0, height: 16, marginTop: 17, paddingBottom: 5, zIndex: 1500 }}>
                            <IconButton
                                onClick={() => this.isDeleteOpen()}
                                iconStyle={{ width: 16, height: 16, padding: 0 }}
                                style={{ width: 16, height: 16, padding: 0, marginRight: 2 }}
                            >
                                <DeleteIcon style={{ padding: 0 }} />
                                <DeleteComment
                                    comment={this.state.comment}
                                    deleteComment={this.props.deleteComment}
                                    open={this.state.deleteOpen}
                                    isClose={this.isDeleteClose}
                                />
                            </IconButton>
                            <IconButton
                                onClick={() => this.isOpen()}
                                iconStyle={{ width: 16, height: 16, padding: 0 }}
                                style={{ width: 16, height: 16, padding: 0, marginRight: 16 }}
                            >
                                <EditIcon style={{ padding: 0}} />
                                <CommentActions
                                    comment={this.state.comment}
                                    editComment={this.props.editComment}
                                    open={this.state.open}
                                    isClose={this.isClose}
                                />
                            </IconButton>
                        </CardActions>
                        :
                        null
                }
                <CardHeader
                    style={{ maxWidth: '100%' }}
                    title={this.state.comment.name}
                    titleStyle={{ fontWeight: 'bold', fontSize: 15, paddingRight: 0 }}
                    avatar={<AccountCircle style={{ width: 30, height: 30 }} />}
                    subtitleStyle={{ maxWidth: '100%', fontSize: 15 }}
                    subtitle={this.state.comment.text}
                    textStyle={{ paddingRight: 47 }}
                />
            </Card>
        )
    }
}
