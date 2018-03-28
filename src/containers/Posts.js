import React, { Component } from 'react';
import Post from '../components/Post';
import { connect } from 'react-redux';
import { addPost, editPost, deletePost, receivePosts } from '../actions.js'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import moment from 'moment/moment.js';
import fetch from 'cross-fetch'
import NavBar from '../components/NavBar'

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
        .then(() => dispatch(deletePost(post)))
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
        .then(post => dispatch(addPost(post)))
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
        .then(() => dispatch(editPost(post)))
    },

    onReceivePosts: () => {
      fetch('http://localhost:8081/api/posts', {
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${getAccessToken()}`
        }
      })
        .then(response => response.json())
        .then(posts => dispatch(receivePosts(posts)))
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
      posts: this.props.posts
    }
  }

  componentWillMount() { this.props.onReceivePosts() }

  componentWillReceiveProps(nextProps) {
    this.setState({ posts: nextProps.posts })
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.posts !== nextProps.props) {
      return true;
    }
    return false;
  }

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
        <NavBar />
        <div style={{ height: 37, marginTop: 8, maxWidth: 500 }}>
          <RadioButtonGroup
            name="post"
            defaultSelected="date"
          >
            <RadioButton
              value="date"
              label="Sort by date"
              style={{ height: 37, maxWidth: '50%', float: 'left' }}
              onClick={this.sortByDate}
            />
            <RadioButton
              value="alphabet"
              label="Sort by alphabet"
              style={{ height: 37, maxWidth: '50%' }}
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
                  isMyPosts={false}
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

