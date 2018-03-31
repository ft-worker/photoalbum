import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Router, Route, browserHistory } from 'react-router';
import Posts from './containers/Posts';
import MyPosts from './containers/MyPosts';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider style={{ maxWidth: 500 }}>
          <Router history={browserHistory}>
            <Route exact path="/" component={Posts} />
            <Route exact path="/posts" component={Posts} />
            <Route exact path="/myposts" component={MyPosts} />
          </Router>
      </MuiThemeProvider >
    );
  }
}

export default App;
