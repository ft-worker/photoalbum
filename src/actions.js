export const ADD_POST = 'ADD_POST'
export const EDIT_POST = 'EDIT_POST'
export const DELETE_POST = 'DELETE_POST'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const ADD_USER = 'ADD_USER'

export function addPost(post) {
    return { type: ADD_POST, post }
}

export function editPost(post) {
    return { type: EDIT_POST, post }
}

export function deletePost(post) {
    return { type: DELETE_POST, post }
}

export function receivePosts(posts) {
    return { type: RECEIVE_POSTS, posts }
}

export function addUser(user) {
    return { type: ADD_USER, user}
}
