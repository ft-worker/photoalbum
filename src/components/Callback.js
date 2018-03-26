import { Component } from 'react';
import { setIdToken, setAccessToken } from '.././AuthService';
import { browserHistory } from 'react-router';

class Callback extends Component {

  componentDidMount() {
    setAccessToken();
    setIdToken();
    browserHistory.push('/posts');
  }

  render() {
    return null;
  }
}

export default Callback;
