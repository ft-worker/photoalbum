import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import moment from 'moment/moment.js';
import EditPost from './EditPost'
import DeletePost from './DeletePost'
import { RaisedButton } from 'material-ui';

export default class MyPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            isDeleteOpen: false
        }
        const a = 5;
    }

    isOpen = () => (
        this.setState({ isOpen: true })
    )

    isClose = () => (
        this.setState({ isOpen: false })
    )

    isDeleteOpen = () => (
        this.setState({ isDeleteOpen: true })
    )

    isDeleteClose = () => (
        this.setState({ isDeleteOpen: false })
    )

    render() {
        return (
            <Card>
                <CardHeader
                    title={this.props.post.username}
                    subtitle="Russia"
                    avatar="https://t3.ftcdn.net/jpg/01/20/82/64/240_F_120826407_VV1V7WOYTbrvLNgxDokcZqqQZMPp2wbO.jpg"
                />
                <CardMedia>
                    <img src={this.props.post.imageurl} alt="" />
                </CardMedia>
                <CardActions style={{ maxWidth: '50%', float: 'right', padding: 16 }}>
                    <RaisedButton label="Edit" onClick={() => this.isOpen()} >
                        <EditPost
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
                    style={{ maxWidth: '50%' }}
                    title={this.props.post.title}
                    subtitle={moment(this.props.post.date).fromNow()}
                />
                <CardText style={{ maxWidth: 500 }} >
                    {this.props.post.description}
                </CardText>
                <CardActions>
                    <FlatButton label="Like" />
                    <FlatButton label="Comment" />
                </CardActions>
                <CardText>{'Liked By:'}</CardText>
            </Card>
        )
    }

}
