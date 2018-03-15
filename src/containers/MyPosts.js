import React, { Component } from 'react';
import MyPost from '../components/MyPost';
import { connect } from 'react-redux';
import { addPost, editPost, deletePost } from '../actions.js'
import AddAPhoto from 'material-ui/svg-icons/image/add-a-photo'
import FlatButton from 'material-ui/FlatButton';
import EditPost from '../components/EditPost'

const mapStateToProps = (state, ownProps) => {
    return {
        myPosts: state.myPosts
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onDeletePost: id => { dispatch(deletePost(id)) },
        onAddPost: post => { dispatch(addPost(post)) },
        onEditPost: post => { dispatch(editPost(post)) }
    }
}

export class MyPostsList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: false,
            myPosts: []
        }
    }

    componentDidMount() {
        fetch('http://localhost:8081/api/myposts', {
            method: 'GET',
            mode: 'NO-CORS'
        }).then(res => res.json())
            .then(data => {
                this.setState({
                    myPosts: data
                })
            }).catch(err => err);
    }

    isOpen = () => (
        this.setState({ isOpen: true })
    )
    isClose = () => (
        this.setState({ isOpen: false })
    )

    render() {
        return (
            <div>
                <FlatButton
                    label="Add new photo"
                    labelPosition="after"
                    containerElement="label"
                    style={{ marginTop: 5, width: 500 }}
                    icon={<AddAPhoto />}
                    onClick={this.isOpen}
                >
                    <EditPost
                        onAddPost={this.props.onAddPost}
                        post={{ id: this.state.myPosts.length, title: '', description: '' }}
                        isOpen={this.state.isOpen}
                        isClose={this.isClose}
                    />
                </FlatButton>
                <div>
                    {
                        this.state.myPosts.map((post, id) => (
                            <div key={post.id} style={{ margin: 1, marginTop: 5, maxWidth: 500 }}>
                                <MyPost
                                    post={post}
                                    onDeletePost={() => this.props.onDeletePost(id)}
                                    onEditPost={this.props.onEditPost}
                                />
                            </div>
                        ))
                    }
                </div>
            </div>
        )
    }

}

const MyPosts = connect(
    mapStateToProps,
    mapDispatchToProps,
)(MyPostsList)

export default MyPosts;

