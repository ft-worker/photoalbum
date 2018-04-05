import React, { Component } from 'react'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import moment from 'moment/moment.js'
import PostActions from './PostActions'
import DeletePost from './DeletePost'
import { RaisedButton } from 'material-ui'
import Comments from './Comments'

export default class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            isDeleteOpen: false
        }
    }
    isOpen = () => (this.setState({ isOpen: true }))
    isClose = () => (this.setState({ isOpen: false }))
    isDeleteOpen = () => (this.setState({ isDeleteOpen: true }))
    isDeleteClose = () => (this.setState({ isDeleteOpen: false }))

    render() {
        const avatarurl = 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png'
        return (
            <Card>
                <CardHeader
                    title={this.props.post.name}
                    subtitle="Russia"
                    avatar={avatarurl}
                />
                <CardMedia>
                    <img src={this.props.post.imageurl} alt="" />
                </CardMedia>
                {
                    this.props.isMyPosts ?
                        <CardActions style={{ float: 'right', padding: 10, paddingTop: 15 }}>
                            <RaisedButton label="Edit" onClick={() => this.isOpen()} >
                                <PostActions
                                    onEditPost={this.props.onEditPost}
                                    post={this.props.post}
                                    isOpen={this.state.isOpen}
                                    isClose={this.isClose}
                                    name={'edit'}
                                />
                            </RaisedButton>
                            <RaisedButton label="Delete" onClick={this.isDeleteOpen} >
                                <DeletePost
                                    onDeletePost={this.props.onDeletePost}
                                    post={this.props.post}
                                    isDeleteOpen={this.state.isDeleteOpen}
                                    isDeleteClose={this.isDeleteClose}
                                />
                            </RaisedButton>
                        </CardActions> :
                        <CardActions style={{ float: 'right', padding: 10, paddingTop: 15 }}>
                            <RaisedButton label="Like" />
                        </CardActions>
                }
                <CardTitle
                    style={{ maxWidth: '50%', padding: 8, paddingLeft: 18 }}
                    title={this.props.post.title}
                    subtitle={this.props.post.updated > this.props.post.date ?
                        'Updated ' + moment(this.props.post.updated).fromNow() :
                        'Uploaded ' + moment(this.props.post.date).fromNow()}
                />
                <CardText style={{ maxWidth: 448, padding: 2, paddingLeft: 18, paddingRight: 16 }} >
                    <div style={{ width: 448 }}> {this.props.post.description}</div>
                </CardText>
                <CardText style={{ padding: 2, paddingLeft: 18, paddingRight: 16, fontSize: 12 }}>
                    {'Liked By:'}
                </CardText>
                <Comments post={this.props.post} showComments={false} />
            </Card>
        )
    }
}
