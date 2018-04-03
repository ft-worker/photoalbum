import fetch from 'cross-fetch'

export default function appFetch(url = '', method = 'GET', body, post_id = '') {
    let myHeaders = {
        'Content-Type': 'application/json',
        'User-Id': `${localStorage.getItem('user_id')}`,
        'Post_id': `${post_id}`
    }
    let fullurl = `http://localhost:8081/api/${url}`;
    let myInit = {
        method: method,
        headers: myHeaders,
        mode: 'CORS',
        body: body ? JSON.stringify(body) : ''
    }
    return fetch(fullurl, myInit)
}
