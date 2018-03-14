import fetch from 'cross-fetch'

export const ADD_POST = 'ADD_POST';
export const EDIT_POST = 'EDIT_POST';
export const DELETE_POST = 'DELETE_POST';
export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'

export function addPost(post) {
    return {
        type: ADD_POST,
        post
    }
}

export function editPost(post) {
    return {
        type: EDIT_POST, post
    }
}

export function deletePost(id) {
    return {
        type: DELETE_POST,
        id
    }
}

export function receivePosts(posts) {
    return {
        type: RECEIVE_POSTS,
        posts
    }
}

export function fetchPosts() {
    return function (dispatch) {
        return fetch('http://localhost:8081/api/')
            .then(
                response => response.json()
            )
            .then(posts => dispatch(receivePosts(posts))
            )
    }
}
