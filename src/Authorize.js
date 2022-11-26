import React, { Component } from 'react'
import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'
import { connect } from 'react-redux'
import appFetch from './components/AppFetch'
import { addUser } from './actions.js'

const mapStateToProps = (state, ownProps) => {
    return {
        user: state.User
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loginUser: user => {
            dispatch(addUser(user))
        },
        addUser: user => {
            dispatch(addUser(user))
        }
    }
}

class AuthorizeForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: this.props.isOpen,
            user: this.props.user,
            loginFailed: this.props.loginFailed
        }
    }

    onLoginUser = (login, body) => {
        appFetch(`users/${login}`, 'POST', body)
            .then(response => {
                if (response.status === 200) {
                    return response.json()
                }
            })
            .then(user => {
                if (user !== {}) {
                    this.setState({ loginFailed: '' })
                    localStorage.setItem('user_id', user.user_id);
                    localStorage.setItem('name', user.name)
                    this.props.setUser(user)
                    this.props.loginUser(user)
                    this.props.isLoggedIn()
                    this.props.isClose()
                }
            })
            .catch(err => this.setState({
                loginFailed: 'Login and password didn\'t match'
            }))
    }

    onAddUser = user => {
        appFetch('users', 'PUT', user)
            .then(response => {
                if (response.status === 200) {
                    return response.json()
                }
            })
            .then(user => {
                if (user !== {}) {
                    this.setState({ loginFailed: '' })
                    localStorage.setItem('user_id', user.user_id);
                    localStorage.setItem('name', user.name)
                    this.props.setUser(user)
                    this.props.addUser(user)
                    this.props.isLoggedIn()
                    this.props.isClose()
                }
            })
            .catch(err => this.setState({
                loginFailed: 'Login already in use'
            }))
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ isOpen: nextProps.isOpen, loginFailed: nextProps.loginFailed })
    }

    passwordChange(password) {
        this.setState(prevState => {
            const user = { ...prevState.user, password }
            return { user }
        })
    }

    loginChange(login) {
        this.setState(prevState => {
            const user = { ...prevState.user, login }
            return { user }
        })
    }

    usernameChange(name) {
        this.setState(prevState => {
            const user = { ...prevState.user, name }
            return { user }
        })
    }

    onSave = () => {
        if (this.props.name === 'login') {
            this.onLoginUser(this.state.user.login, this.state.user)
        } else {
            if (this.state.user.name && this.state.user.login && this.state.user.password) {
                this.onAddUser(this.state.user)
            } else {
                this.setState({
                    loginFailed: 'Fill required fields'
                })
            }
        }
    }

    render() {
        const actions = [
            <FlatButton
                label={this.props.name === 'login' ? 'Login' : 'Sign Up'}
                onClick={this.onSave}
                style={{
                    backgroundColor: '#00BCD4',
                    color: 'white',
                    fontWeight: 'bold'
                }}
            />,
        ]

        console.log('testing...')

        return (
            <div>
                <Dialog
                    title={this.props.name === 'login' ? 'Log In' : 'Create an account'}
                    actions={actions}
                    modal={false}
                    open={this.state.isOpen}
                    onRequestClose={this.props.isClose}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: -220
                    }}
                    titleStyle={{ color: '#00BCD4' }}
                    actionsContainerStyle={{ textAlign: 'center', marginLeft: 'auto', marginRight: 'auto' }}
                >
                    <div style={{ color: 'red', fontSize: 11 }}>
                        {
                            this.state.loginFailed
                        }
                    </div>
                    <div>
                        {
                            this.props.name === 'login' ? <div /> :
                                <TextField
                                    fullWidth
                                    floatingLabelText="Name*"
                                    required
                                    onChange={(event, username) => this.usernameChange(username)}
                                />
                        }
                    </div>
                    <TextField
                        floatingLabelText="Login*"
                        required
                        fullWidth
                        onChange={(event, login) => this.loginChange(login)}
                    />
                    <TextField
                        floatingLabelText="Password*"
                        required
                        fullWidth
                        type="password"
                        onChange={(event, password) => this.passwordChange(password)}
                    />
                </Dialog>
            </div>
        )
    }
}

const Authorize = connect(
    mapStateToProps,
    mapDispatchToProps
)(AuthorizeForm)

export default Authorize;
