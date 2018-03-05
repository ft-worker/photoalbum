import {
    ADD_POST,
    EDIT_POST,
    DELETE_POST
} from './actions'
import { combineReducers } from 'redux'

const initialState = [
    {
        title: 'Hello',
        date: '2018-02-14T10:05:18',
        id: '0',
        username: 'My Name',
        imageurl: 'https://www.thecrowdedplanet.com/wp-content/uploads/2016/05/green-stockholm-Skogskyrkogarden-480x240.jpg',
        description: 'This is the first image.',
    },
    {
        title: 'test',
        date: '2018-01-14T10:05:18',
        id: '1',
        username: 'My Name',
        imageurl: 'https://t3.ftcdn.net/jpg/01/20/82/64/240_F_120826407_VV1V7WOYTbrvLNgxDokcZqqQZMPp2wbO.jpg',
        description: 'Test.',
    }
]

function myPosts(state = initialState, action) {
    if (action.type === ADD_POST) {
        return [
            ...state,
            {
                title: action.post.title,
                date: action.post.date,
                id: action.post.id,
                username: 'My Name',
                imageurl: action.post.url,               
                description: action.post.description,
            }
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

export default combineReducers({ myPosts });
