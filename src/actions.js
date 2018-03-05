export const ADD_POST = 'ADD_POST';
export const EDIT_POST = 'EDIT_POST';
export const DELETE_POST = 'DELETE_POST';
export const ADD_COMMENT = 'ADD_COMMENT';

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

export function addComment() {
    return {
        type: ADD_COMMENT,
    }
}

