import { combineReducers } from 'redux'
import {
    ADD_POST,
    EDIT_POST,
    DELETE_POST,
    RECEIVE_POSTS
} from './actions'

function Posts(state = [], action) {
    if (action.type === RECEIVE_POSTS) {
        return action.posts
    }
    if (action.type === ADD_POST) {
        return [
            ...state,
            action.post
        ]
    }
    if (action.type === EDIT_POST) {
        return state.map((post) => {
            if (post.id === action.post.id) {
                return {
                    ...post,
                    title: action.post.title,
                    updated: action.post.updated,
                    description: action.post.description,
                }
            }
            return post
        }
        )

    }
    if (action.type === DELETE_POST) {
        return state.filter((post) => post.id !== action.post.id)
    }
    return state
}

export default combineReducers({
    Posts
});
