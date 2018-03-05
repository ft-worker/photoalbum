import React, { Component } from 'react';
import Post from '../components/Post.js';
import moment from 'moment/moment.js';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';

class Posts extends Component {
  constructor(props) {
    super(props);
    this.sortByDate = this.sortByDate.bind(this);
    this.SortByAlphabet = this.SortByAlphabet.bind(this);
    this.sortAlphabetically = this.sortAlphabetically.bind(this);
    this.state = {
      posts: [
        {
          title: 'Hello',
          date: '2017-09-01T12:30:48',
          id: '1',
          username: 'Jack',
          imageurl: 'http://logoinspirations.com/wp-content/uploads/2017/04/1920-x-1080-6-480x240.jpg',
          description: 'This is the first image. Lorem ipsum dolor sit amet.',
        },
        {
          title: '',
          date: '2018-01-01T08:30:10',
          id: '2',
          username: 'Anna',
          imageurl: 'https://t3.ftcdn.net/jpg/01/33/92/36/240_F_133923669_az6zDEfhs2mw3Tkf3WxFjrKMnVCSyTRO.jpg',
          description: 'This is the first image.',
        },
        {
          title: 'Nature',
          date: '2018-02-13T22:40:38',
          id: '3',
          username: 'Walter',
          imageurl: 'http://ironxiron.co.uk/wp-content/uploads/2018/01/Nature-6-2-480x240.jpg',
          description: 'This is the first image. Lorem ipsum dolor sit amet.',
        }
      ]
    }
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

  render() {
    return (
      <div>
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
            this.state.posts.map(prevState => (
              <div key={prevState.id} style={{ margin: 1, marginTop: 5, maxWidth: 500 }}>
                <Post post={prevState} />
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

export default Posts;
