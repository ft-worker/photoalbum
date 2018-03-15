import React, { Component } from 'react';
import Post from '../components/Post';
import { connect } from 'react-redux';
import { addPost, editPost, deletePost } from '../actions.js'
import AddAPhoto from 'material-ui/svg-icons/image/add-a-photo'
import FlatButton from 'material-ui/FlatButton';
import EditPost from '../components/EditPost'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import moment from 'moment/moment.js';

const mapStateToProps = (state, ownProps) => {
  return {
    posts: state.Posts
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onDeletePost: post => {
      fetch(`http://localhost:8081/api/posts/:post_${post.id}`, {
        body: JSON.stringify(post),
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
      dispatch(deletePost(post))
    },

    onAddPost: post => {
      fetch('http://localhost:8081/api/post', {
        body: JSON.stringify(post),
        method: 'POST',
        mode: 'default',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
      dispatch(addPost(post))
    },

    onEditPost: post => {
      fetch(`http://localhost:8081/api/posts/:post_${post.id}`, {
        body: JSON.stringify(post),
        method: 'POST',
        mode: 'default',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
      dispatch(editPost(post))
    }
  }
}

export class PostsList extends Component {
  constructor(props) {
    super(props)
    this.sortByDate = this.sortByDate.bind(this);
    this.SortByAlphabet = this.SortByAlphabet.bind(this);
    this.sortAlphabetically = this.sortAlphabetically.bind(this);
    this.state = {
      isOpen: false,
      posts: this.props.posts
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ posts: nextProps.posts })
  }

  isOpen = () => (
    this.setState({ isOpen: true })
  )
  isClose = () => (
    this.setState({ isOpen: false })
  )

  sortByDate(event) {
    this.setState(prevState => {
      const postsCopy = prevState.posts.slice();
      const sorted = postsCopy.sort((a, b) => (moment(b.date).diff(moment(a.date))));
      return {
        posts: sorted
      }
    });
  }

  SortByAlphabet(event) {
    this.setState(prevState => {
      const postsCopy = prevState.posts.slice();
      const sorted = postsCopy.sort(this.sortAlphabetically);
      return {
        posts: sorted
      }
    });
  }

  sortAlphabetically(a, b) {
    const nameA = a.username.toUpperCase();
    const nameB = b.username.toUpperCase();
    if (nameA < nameB) {
      return -1;
    } else if (nameA > nameB) {
      return 1;
    }
    return 0;
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
            post={{ id: this.state.posts.length, title: '', description: '' }}
            isOpen={this.state.isOpen}
            isClose={this.isClose}
          />
        </FlatButton>
        <div style={{ marginTop: 10, marginLeft: 5, maxWidth: 500 }}>
          <RadioButtonGroup
            name="post"
            defaultSelected="date"
          >
            <RadioButton
              value="date"
              label="Sort by date"
              style={{ height: 36, maxWidth: '50%', float: 'left' }}
              onClick={this.sortByDate}
            />
            <RadioButton
              value="alphabet"
              label="Sort by alphabet"
              style={{ height: 36, maxWidth: '50%' }}
              onClick={this.SortByAlphabet}
            />
          </RadioButtonGroup>
        </div>
        <div style={{ clear: 'both' }}>
          {
            this.state.posts.map((post) => (
              <div key={post.id} style={{ margin: 1, marginTop: 5, maxWidth: 500 }}>
                <Post
                  post={post}
                  onDeletePost={this.props.onDeletePost}
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

const Posts = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PostsList)

export default Posts;

