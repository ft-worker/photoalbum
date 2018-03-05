import React, { Component } from 'react';
import NavBar from './components/NavBar.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { BrowserRouter as Router } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider style={{ maxWidth: 500 }}>
        <Router>
          <NavBar />
        </Router>
      </MuiThemeProvider >
    );
  }
}

export default App;
