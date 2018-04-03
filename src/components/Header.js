import React, { Component } from 'react'
import Authorize from '.././Authorize'
import RaisedButton from 'material-ui/RaisedButton'
import { AppBar } from 'material-ui'
import NavBar from './NavBar'
import { browserHistory } from 'react-router'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            isLoginOpen: false,
            loggedIn: false,
            name: localStorage.getItem('name')
        }
    }

    componentWillMount() {
        this.setState({ loggedIn: localStorage.getItem('user_id') ? true : false })
    }

    isOpen = () => (this.setState({ isOpen: true }))
    isClose = () => (this.setState({ isOpen: false }))
    isLoginOpen = () => (this.setState({ isLoginOpen: true }))
    isLoginClose = () => (this.setState({ isLoginOpen: false }))

    isLoggedIn = () => (this.setState({ loggedIn: true, name: localStorage.getItem('name') }))
    isLoggedOut = () => {
        this.setState({ loggedIn: false })
        localStorage.removeItem('user_id')
        localStorage.removeItem('name')
        browserHistory.push('/posts')
    }

    render() {
        return (
            <div>
                <AppBar
                    title={<span >Instagram</span>}
                    style={{ maxWidth: 500 }}
                    iconElementLeft={<div />}
                    iconElementRight={this.state.loggedIn ?
                        <IconMenu
                            iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                            targetOrigin={{ horizontal: 'right', vertical: 'top' }}
                            anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
                        >
                            <MenuItem
                                style={{ color: 'black' }}
                                disabled
                            >
                                <strong>{this.state.name}</strong>
                            </MenuItem>
                            <MenuItem
                                primaryText="Sign out"
                                onClick={this.isLoggedOut}
                            />
                        </IconMenu>
                        :
                        <div style={{ paddingTop: 6 }} >
                            <RaisedButton
                                label="Sign Up"
                                
                                onClick={this.isOpen}
                                style={{ backgroundColor: 'white' }}
                            >
                                <Authorize
                                    isOpen={this.state.isOpen}
                                    isClose={this.isClose}
                                    isLoggedIn={this.isLoggedIn}
                                />
                            </RaisedButton>
                            <RaisedButton
                                label="Log In"
                                primary
                                onClick={this.isLoginOpen}
                                style={{ backgroundColor: 'white' }}
                            >
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
