import { Component } from 'react';
import { setIdToken, setAccessToken } from '.././AuthService';
import { browserHistory } from 'react-router'

export let userAccessToken;

class Callback extends Component {

  componentDidMount() {
    setAccessToken();
    setIdToken();
    let fragmentString = window.location.hash.substr(1);
    let fragment = {};
    let fragmentItemStrings = fragmentString.split('&');
    for (let i in fragmentItemStrings) {
      let fragmentItem = fragmentItemStrings[i].split('=');
      if (fragmentItem.length !== 2) {
        continue;
      }
      fragment[fragmentItem[0]] = fragmentItem[1];
    }
    userAccessToken = fragment['access_token']
    browserHistory.push('/posts');

  }

  render() {
    return null;
  }
}

export default Callback;
