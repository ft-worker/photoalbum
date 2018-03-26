import React, { Component } from 'react';
//import MyPosts from '../containers/MyPosts';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router';
import { AppBar } from 'material-ui'
import { login, logout, isLoggedIn } from '../AuthService'

const style = {
    marginTop: 5,
    width: 250,
    color1: '#ff69b4',
    color2: '#00ffff'
};

export default class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectall: true,
            selectmy: false
        }
    }
    handleClickAll() {
        if (!this.state.selectall) {
            this.setState({
                selectall: !this.state.selectall,
                selectmy: !this.state.selectmy
            })
        }
    }
    handleClickMy() {
        if (!this.state.selectmy) {
            this.setState({
                selectall: !this.state.selectall,
                selectmy: !this.state.selectmy
            })
        }
    }
    render() {
        return (
            <div>
                <AppBar
                    title={<span >Instagram</span>}
                    style={{ maxWidth: 500 }}
                    iconElementLeft={<div />}
                    iconElementRight={isLoggedIn() ?
                        (<RaisedButton label="Log Out" secondary onClick={() => logout()} />) :
                        (<RaisedButton label="Join" secondary onClick={() => login()} />)
                    }
                />
                <Link to="/posts">
                    <RaisedButton
                        label="All Photos"
                        backgroundColor={this.state.selectall ? style.color1 : style.color2}
                        style={style}
                        onClick={() => this.handleClickAll()}
                    />
                </Link>
                <Link to="/myposts">
                    <RaisedButton
                        label="My Photos"
                        backgroundColor={this.state.selectmy ? style.color1 : style.color2}
                        style={style}
                        onClick={() => this.handleClickMy()}
                    />
                </Link>
            </div>
        );
    }
}
