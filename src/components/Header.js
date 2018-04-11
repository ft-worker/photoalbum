import React, { Component } from 'react'
import Authorize from '.././Authorize'
import RaisedButton from 'material-ui/RaisedButton'
import { AppBar } from 'material-ui'
import NavBar from './NavBar'
import { browserHistory } from 'react-router'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import AccountCircle from 'material-ui/svg-icons/action/account-circle'
import FlatButton from 'material-ui/FlatButton'
// import EditProfile from './EditProfile'

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            isLoginOpen: false,
            loggedIn: false,
            user: {},
            loginFailed: '',
            isEditProfileOpen: false,
            isIconMenuOpen: false,
            name: ''
        }
    }

    componentWillMount() {
        this.setState({
            loggedIn: localStorage.getItem('user_id') ? true : false,
            name: localStorage.getItem('name')
        })
    }

    isOpen = () => (this.setState({ isOpen: true }))
    isClose = () => (this.setState({ isOpen: false, loginFailed: '' }))
    isLoginOpen = () => (this.setState({ isLoginOpen: true }))
    isLoginClose = () => (this.setState({ isLoginOpen: false }))

    isLoggedIn = () => (this.setState({ loggedIn: true }))
    isLoggedOut = () => {
        this.setState({ loggedIn: false })
        localStorage.removeItem('user_id')
        localStorage.removeItem('name')
        browserHistory.push('/posts')
    }

    setUser = (user) => (this.setState({ user: user, name: user.name }))
    // editProfileDialogOpen = () => { this.setState({ isEditProfileOpen: true }) }
    // editProfileDialogClose = () => { this.setState({ isEditProfileOpen: false, isIconMenuOpen: false }) }
    // iconMenuOpen = () => { this.setState({ isIconMenuOpen: true }) }
    // iconMenuClose = () => { this.setState({ isIconMenuOpen: false }) }`

    render() {
        return (
            <div>
                <div style={{
                    maxWidth: '100%',
                    maxHeight: 64,
                    position: 'fixed',
                    zIndex: 1400,
                    top: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: '#00BCD4'
                }}>
                    <AppBar
                        title={'Instagram'}
                        titleStyle={{ textAlign: 'left' }}
                        style={{
                            maxWidth: 700,
                            top: 0,
                            left: 0,
                            right: 0,
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            boxShadow: 0
                        }}
                        iconElementLeft={<div />}
                        iconElementRight={this.state.loggedIn ?
                            <IconMenu
                                iconButtonElement={<IconButton><AccountCircle /></IconButton>}
                                targetOrigin={{ horizontal: 'right', vertical: 'top' }}
                                anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
                                iconStyle={{ width: 25, height: 25, padding: 0 }}
                            >
                                <MenuItem
                                    style={{ color: 'black' }}
                                    disabled
                                >
                                    <strong>{this.state.name}</strong>
                                </MenuItem>
                                {/* <MenuItem
                                    primaryText="Edit Profile"
                                    onClick={this.editProfileDialogOpen}
                                >
                                    <EditProfile
                                        editProfileDialogClose={this.editProfileDialogClose}
                                        isEditProfileOpen={this.state.isEditProfileOpen}
                                        setUser={this.setUser}
                                    />
                                </MenuItem> */}
                                <MenuItem
                                    primaryText="Sign out"
                                    onClick={this.isLoggedOut}
                                />
                            </IconMenu>
                            :
                            <div style={{ paddingTop: 7 }}>
                                <FlatButton
                                    label="Sign Up"
                                    onClick={this.isOpen}
                                    labelStyle={{ color: 'white', fontWeight: 'bold' }}
                                >
                                    <Authorize
                                        isOpen={this.state.isOpen}
                                        isClose={this.isClose}
                                        isLoggedIn={this.isLoggedIn}
                                        setUser={this.setUser}
                                    />
                                </FlatButton>
                                <RaisedButton
                                    label="Log In"
                                    onClick={this.isLoginOpen}
                                    style={{ backgroundColor: 'white' }}
                                    labelStyle={{ color: '#00BCD4', fontWeight: 'bold' }}
                                >
                                    <Authorize
                                        name={'login'}
                                        isOpen={this.state.isLoginOpen}
                                        isClose={this.isLoginClose}
                                        isLoggedIn={this.isLoggedIn}
                                        setUser={this.setUser}
                                        loginFailed={this.state.loginFailed}
                                    />
                                </RaisedButton>
                            </div>
                        }
                    />
                </div>
                <NavBar loggedIn={this.state.loggedIn} />
            </div>
        )
    }
}
