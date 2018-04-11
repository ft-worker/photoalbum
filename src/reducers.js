import { combineReducers } from 'redux'
import {
    ADD_POST,
    EDIT_POST,
    DELETE_POST,
    RECEIVE_POSTS,
    ADD_USER
} from './actions'

function Posts(state = [], action) {
    if (action.type === RECEIVE_POSTS) {
        return action.posts
    }
    if (action.type === ADD_POST) {
        return [
            action.post,
            ...state
        ]
    }
    if (action.type === EDIT_POST) {
        return state.map((post) => {
            if (post.post_id === action.post.post_id) {
                return {
                    ...post,
                    title: action.post.title,
                    updated: action.post.updated,
                    description: action.post.description,
                }
            }
            return post
        })
    }
    if (action.type === DELETE_POST) {
        return state.filter((post) => post.post_id !== action.post.post_id)
    }
    return state
}

function User(state = {}, action) {
    if (action.type === ADD_USER) {
        return action.user
    }
    return state
}

export default combineReducers({
    Posts,
    User
});
