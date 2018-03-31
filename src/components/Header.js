import React, { Component } from 'react';
import Authorize from '.././Authorize';
import RaisedButton from 'material-ui/RaisedButton';
import { AppBar } from 'material-ui'
import NavBar from './NavBar'
import { browserHistory } from 'react-router';

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            isLoginOpen: false,
            loggedIn: false
        }
    }

    componentWillMount() {
        this.setState({ loggedIn: localStorage.getItem('user_id') ? true : false })
    }

    isOpen = () => (this.setState({ isOpen: true }))
    isClose = () => (this.setState({ isOpen: false }))
    isLoginOpen = () => (this.setState({ isLoginOpen: true }))
    isLoginClose = () => (this.setState({ isLoginOpen: false }))

    isLoggedIn = () => (this.setState({ loggedIn: true }))
    isLoggedOut = () => {
        this.setState({ loggedIn: false })
        localStorage.removeItem('user_id')
        browserHistory.push('/posts')
    }

    render() {
        return (
            <div>
                <AppBar
                    title={<span >Instagram</span>}
                    style={{ maxWidth: 500 }}
                    iconElementLeft={<div />}
                    iconElementRight={this.state.loggedIn ? <RaisedButton label="Log Out" secondary onClick={this.isLoggedOut} /> :
                        <div>
                            <RaisedButton label="Sign Up" secondary onClick={this.isOpen} >
                                <Authorize
                                    isOpen={this.state.isOpen}
                                    isClose={this.isClose}
                                    isLoggedIn={this.isLoggedIn}
                                />
                            </RaisedButton>
                            <RaisedButton label="Log In" secondary onClick={this.isLoginOpen} >
                                <Authorize
                                    name={'login'}
                                    isOpen={this.state.isLoginOpen}
                                    isClose={this.isLoginClose}
                                    isLoggedIn={this.isLoggedIn}
                                />
                            </RaisedButton>
                        </div>
                    }
                />
                <NavBar loggedIn={this.state.loggedIn} />
            </div>
        )
    }
}
