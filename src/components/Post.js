import React, { Component } from 'react';
//import FlatButton from 'material-ui/FlatButton';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import moment from 'moment/moment.js';
import PostActions from './PostActions'
import DeletePost from './DeletePost'
import { RaisedButton } from 'material-ui';

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

    componentWillReceiveProps(nextProps) {
        this.setState({ posts: nextProps.posts })
    }

    render() {
        return (
            <Card>
                <CardHeader
                    title={this.props.post.username}
                    subtitle="Russia"
                    avatar={this.props.post.imageurl}
                />
                <CardMedia>
                    <img src={this.props.post.imageurl} alt="" />
                </CardMedia>
                <CardActions style={{ float: 'right', padding: 10, paddingTop: 15 }}>
                    <RaisedButton label="Like" />
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
                </CardActions>
                <CardTitle
                    style={{ maxWidth: '50%', padding: 8, paddingLeft: 18 }}
                    title={this.props.post.title}
                    subtitle={this.props.post.updated > this.props.post.date ?
                        'Updated ' + moment(this.props.post.updated).fromNow() :
                        'Uploaded ' + moment(this.props.post.date).fromNow()}
                />
                <CardText style={{ padding: 8, paddingLeft: 18 }}>
                    {'Liked By:'}
                </CardText>
                <CardText style={{ maxWidth: 500, padding: 8, paddingLeft: 18 }} >
                    {this.props.post.description}
                </CardText>
                <TextField
                    hintText="Add a comment"
                    style={{ paddingLeft: 18, maxWidth: 445 }}
                    multiLine
                    fullWidth
                />
                <CardText actAsExpander style={{ maxWidth: 125, padding: 8, paddingLeft: 18 }}>
                    Show all comments
                </CardText>
                <CardText expandable>
                    <div style={{ fontWeight: 'bold', maxWidth: '50%', float: 'left' }}>{this.props.post.username}</div>
                    <div style={{ maxWidth: '50%' }}> &nbsp;  What a beauty!!!</div>
                </CardText>
            </Card>
        )
    }
}
