import React, { Component } from 'react';
import Posts from './containers/Posts.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider style={{ maxWidth: 500 }}>
        <Posts />
      </MuiThemeProvider >
    );
  }
}

export default App;
