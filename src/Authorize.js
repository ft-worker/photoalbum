import React, { Component } from 'react'
import FlatButton from 'material-ui/FlatButton'
import fetch from 'cross-fetch'
import Dialog from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'
import { connect } from 'react-redux'

function appFetch(url, method, body) {
    let myHeaders = {
        'Content-Type': 'application/json'
    }
    let fullurl = `http://localhost:8081/api/users${url ? url : ''}`;
    let myInit = {
        method: method ? method : 'GET',
        headers: myHeaders,
        body: body ? JSON.stringify(body) : ''
    }
    return fetch(fullurl, myInit)
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLoginUser: login => {
            appFetch(`/${login}`)
                .then(response => response.json())
                .then(user => localStorage.setItem('user_id', user.id))
        },
        onAddUser: user => {
            appFetch('', 'POST', user)
                .then(response => response.json())
                .then(id => localStorage.setItem('user_id', id))
        }
    }
}

class AuthorizeForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: this.props.isOpen,
            user: {}
        }
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
        this.props.isLoggedIn()
        if (this.props.name === 'login') {
            this.props.onLoginUser(this.state.user.login)
            this.props.isClose()
        } else {
            this.props.onAddUser(this.state.user);
            this.props.isClose()
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ isOpen: nextProps.isOpen })
    }

    render() {
        const actions = [
            <FlatButton label="Cancel" primary onClick={this.props.isClose} />,
            <FlatButton
                label="Submit"
                secondary
                onClick={this.onSave}
            />,
        ]
        return (
            <Dialog
                title={this.props.name === 'login' ? 'Log In' : 'Create account'}
                actions={actions}
                modal={false}
                open={this.state.isOpen}
                onRequestClose={this.props.isClose}
                style={{ maxWidth: 500 }}
            >
                <div>
                    {
                        this.props.name === 'login' ? <div /> :
                            <TextField
                                floatingLabelText="Pick a username"
                                onChange={(event, username) => this.usernameChange(username)}
                            />
                    }
                </div>
                <TextField
                    floatingLabelText="Login"
                    value={this.state.user.login || ''}
                    onChange={(event, login) => this.loginChange(login)}
                />
                <TextField
                    floatingLabelText="Password"
                    type="password"
                    onChange={(event, password) => this.passwordChange(password)}
                />
            </Dialog>

        )
    }
}

const Authorize = connect(
    mapDispatchToProps,
)(AuthorizeForm)

export default Authorize;
