import React, { Component } from 'react';
import Post from '../components/Post';
import { connect } from 'react-redux';
import { addPost, editPost, deletePost, receivePosts } from '../actions.js'
import AddAPhoto from 'material-ui/svg-icons/image/add-a-photo'
import FlatButton from 'material-ui/FlatButton';
import PostActions from '../components/PostActions'
import fetch from 'cross-fetch'
import { getAccessToken } from '../AuthService';
import NavBar from '../components/NavBar'

const mapStateToProps = (state, ownProps) => {
    return {
        posts: state.Posts
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onDeletePost: post => {
            fetch(`http://localhost:8081/api/posts/:post_${post.id}`, {
                body: JSON.stringify(post),
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then(() => dispatch(deletePost(post)))
        },

        onAddPost: post => {
            fetch('http://localhost:8081/api/post', {
                body: JSON.stringify(post),
                method: 'POST',
                mode: 'default',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then(post => dispatch(addPost(post)))
        },

        onEditPost: post => {
            fetch(`http://localhost:8081/api/posts/:post_${post.id}`, {
                body: JSON.stringify(post),
                method: 'POST',
                mode: 'default',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then(() => dispatch(editPost(post)))
        },

        onReceivePosts: () => {
            fetch('http://localhost:8081/api/myposts', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getAccessToken()}`
                }
            })
                .then(response => response.json())
                .then(posts => dispatch(receivePosts(posts)))
        }
    }
}

export class MyPostsList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: false,
            posts: this.props.posts
        }
    }

    componentWillMount() { this.props.onReceivePosts() }

    componentWillReceiveProps(nextProps) {
        this.setState({ posts: nextProps.posts })
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.posts !== nextProps.props) {
            return true;
        }
        return false;
    }

    isOpen = () => (
        this.setState({ isOpen: true })
    )
    isClose = () => (
        this.setState({ isOpen: false })
    )

    isOpen = () => (
        this.setState({ isOpen: true })
    )
    isClose = () => (
        this.setState({ isOpen: false })
    )

    render() {
        return (
            <div>
                <NavBar />
                <FlatButton
                    label="Add new photo"
                    labelPosition="after"
                    containerElement="label"
                    style={{ marginTop: 5, width: 500 }}
                    icon={<AddAPhoto />}
                    onClick={this.isOpen}
                >
                    <PostActions
                        onAddPost={this.props.onAddPost}
                        post={{ username: 'Sergey' }}
                        isOpen={this.state.isOpen}
                        isClose={this.isClose}
                    />
                </FlatButton>
                <div style={{ clear: 'both' }}>
                    {
                        this.state.posts.map((post) => (
                            <div key={post.id} style={{ margin: 1, marginTop: 5, maxWidth: 500 }}>
                                <Post
                                    post={post}
                                    onDeletePost={this.props.onDeletePost}
                                    onEditPost={this.props.onEditPost}
                                    isMyPosts
                                />
                            </div>
                        ))
                    }
                </div>
            </div>
        )
    }
}

const MyPosts = connect(
    mapStateToProps,
    mapDispatchToProps,
)(MyPostsList)

export default MyPosts;

