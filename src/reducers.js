import {
    ADD_POST,
    EDIT_POST,
    DELETE_POST,
    RECEIVE_POSTS
} from './actions'
import { combineReducers } from 'redux'
//import fetch from 'cross-fetch'




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
                    description: action.post.description,
                }
            }
            return post
        }
        )

    }
    if (action.type === DELETE_POST) {
        return state.filter((post, id) => id !== action.id)
    }
    return state
}

export default combineReducers({
    Posts
    // postsBySubreddit,
    // selectedSubreddit
});
