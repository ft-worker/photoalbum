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
        const avatarurl = 'https://vignette.wikia.nocookie.net/tumblr-survivor-athena/images/7/7a/Blank_Avatar.png/revision/latest?cb=20161204161729'
        return (
            <Card>
                <CardHeader
                    title={this.props.post.name}
                    subtitle={'Added ' + moment(this.props.post.updated).fromNow()}
                    avatar={avatarurl}
                />
                <CardMedia>
                    <img src={this.props.post.imageurl} alt="" />
                </CardMedia>
                {
                    this.props.isMyPosts ?
                        <CardActions style={{ float: 'right', padding: 8, paddingTop: 10 }}>
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
                        null
                }
                <CardTitle
                    style={{ maxWidth: '50%', padding: 8, paddingLeft: 18 }}
                    title={this.props.post.title}
                />
                <CardText style={{ maxWidth: 666, padding: 2, paddingLeft: 18, paddingRight: 16 }} >
                    <div style={{ maxWidth: 666 }}> {this.props.post.description}</div>
                </CardText>
                <Comments post={this.props.post} showComments={false} style={{ maxWidth: 700 }}/>
            </Card>
        )
    }
}
