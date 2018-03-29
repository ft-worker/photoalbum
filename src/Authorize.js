import React, { Component } from 'react'
import FlatButton from 'material-ui/FlatButton'
//import fetch from 'cross-fetch'
import Dialog from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'

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
    console.log(fullurl)
    return fetch(fullurl, myInit)
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLoginUser: () => {
            appFetch('/:id')
                .then(response => response.json())
        },
        onAddUser: user => {
            appFetch('', 'POST', user)
                .then(response => response.json())
        }
    }
}

export default class Authorize extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: this.props.isOpen,
            isClose: true,
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

    usernameChange(username) {
        this.setState(prevState => {
            const user = { ...prevState.user, username }
            return { user }
        })
    }

    onSave = () => {
        if (this.props.name === 'login') {
            this.props.onLoginUser();
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



