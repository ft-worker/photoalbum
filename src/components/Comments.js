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
import { isLoggedIn } from '../AuthService'

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
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getAccessToken()}`
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
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getAccessToken()}`
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
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getAccessToken()}`
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