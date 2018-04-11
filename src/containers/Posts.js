import React, { Component } from 'react'
import Post from '../components/Post'
import { connect } from 'react-redux'
import { receivePosts } from '../actions.js'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import moment from 'moment/moment.js'
import Header from '../components/Header'
import appFetch from '../components/AppFetch'

const mapStateToProps = (state, ownProps) => {
  return {
    posts: state.Posts
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onReceivePosts: () => {
      appFetch('posts')
        .then(response => response.json())
        .then(posts => { let sorted = posts.sort((a, b) => (moment(b.date).diff(moment(a.date)))); return dispatch(receivePosts(sorted)) })
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
      posts: this.props.posts,
      loggedIn: localStorage.getItem('user_id') ? true : false
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

  sortByDate() {
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
    const titleA = a.title.toUpperCase();
    const titleB = b.title.toUpperCase();
    if (titleA < titleB) {
      return -1;
    } else if (titleA > titleB) {
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
        <Header />
        <div
          style={{
            display: 'flex',
            position: 'relative',
            maxWidth: 700,
            alignItems: 'stretch',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: 0
          }}
        >
          <RadioButtonGroup
            name="post"
            defaultSelected="date"
            style={{
              width: 700,
              paddingTop: 10,
              paddingBottom: 0,
              marginBottom: 0
            }}
          >
            <RadioButton
              value="date"
              label="Sort by date"
              //labelStyle={{ alignSelf: 'center' }}
              style={{ height: 37, maxWidth: '50%', float: 'left', maxFontSize: 15 }}
              onClick={this.sortByDate}
            />
            <RadioButton
              value="alphabet"
              label="Sort by alphabet"
              //labelStyle={{ alignSelf: 'center' }}
              style={{ height: 37, maxWidth: '50%', maxFontSize: 15 }}
              onClick={this.SortByAlphabet}
            />
          </RadioButtonGroup>
        </div>
        <div
          style={{
            clear: 'both',
            position: 'relative',
            maxWidth: 700,
            alignItems: 'stretch',
            marginTop: 0,
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
          {
            this.state.posts.map((post) => (
              <div key={post.post_id} style={{ margin: 0, marginTop: 5, maxWidth: 700 }}>
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

