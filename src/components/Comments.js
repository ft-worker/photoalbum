import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addPost, editPost, deletePost, receivePosts } from '../actions.js'
import fetch from 'cross-fetch'
import TextField from 'material-ui/TextField'
//import moment from 'moment/moment.js'
import { CardText } from 'material-ui/Card'

// const mapStateToProps = (state, ownProps) => {
//     return {
//         posts: state.Posts
//     }
// }

// const mapDispatchToProps = (dispatch) => {
//     return {
//         onDeletePost: post => {
//             fetch(`http://localhost:8081/api/posts/:post_${post.id}`, {
//                 body: JSON.stringify(post),
//                 method: 'DELETE',
//                 headers: {
//                     'Content-Type': 'application/json',

//                 }
//             })
//                 .then(response => response.json())
//                 .then(() => dispatch(deletePost(post)))
//         },

//         onAddPost: post => {
//             fetch('http://localhost:8081/api/post', {
//                 body: JSON.stringify(post),
//                 method: 'POST',
//                 mode: 'default',
//                 headers: {
//                     'Content-Type': 'application/json',

//                 }
//             })
//                 .then(response => response.json())
//                 .then(post => dispatch(addPost(post)))
//         },

//         onEditPost: post => {
//             fetch(`http://localhost:8081/api/posts/:post_${post.id}`, {
//                 body: JSON.stringify(post),
//                 method: 'POST',
//                 mode: 'default',
//                 headers: {
//                     'Content-Type': 'application/json',

//                 }
//             })
//                 .then(response => response.json())
//                 .then(() => dispatch(editPost(post)))
//         },

//         onReceivePosts: () => {
//             fetch('http://localhost:8081/api/myposts', {
//                 headers: {
//                     'Content-Type': 'application/json',

//                 }
//             })
//                 .then(response => response.json())
//                 .then(posts => dispatch(receivePosts(posts)))
//         }
//     }
// }


export class CommentsList extends Component {
    constructor(props) {
        super(props)
        // this.state = {
        //     isOpen: false,
        //     posts: this.props.posts
        // }
    }

    // componentWillMount() { this.props.onReceivePosts() }

    // componentWillReceiveProps(nextProps) {
    //     this.setState({ posts: nextProps.posts })
    // }

    // shouldComponentUpdate(nextProps, nextState) {
    //     if (this.props.posts !== nextProps.props) {
    //         return true;
    //     }
    //     return false;
    // }

    // isOpen = () => (
    //     this.setState({ isOpen: true })
    // )
    // isClose = () => (
    //     this.setState({ isOpen: false })
    // )

    // isOpen = () => (
    //     this.setState({ isOpen: true })
    // )
    // isClose = () => (
    //     this.setState({ isOpen: false })
    // )

    render() {
        return (
            <div>
                <TextField
                    hintText="Add a comment"
                    style={{ paddingLeft: 18, maxWidth: 445 }}
                    multiLine
                    fullWidth
                />

                {
                    this.props.showComments ?
                        <CardText >
                            <div style={{ fontWeight: 'bold', maxWidth: '50%', float: 'left' }}>{'Jakob'}</div>
                            <div style={{ maxWidth: '50%' }}> &nbsp;  What a beauty!!!</div>
                        </CardText> : 
                        <div />
            }
            </div>
        )
    }
}

const Comments = connect(
    // mapStateToProps,
    // mapDispatchToProps,
)(CommentsList)

export default Comments;
