import React, { Component } from 'react';
import Authorize from '.././Authorize';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router';
import { AppBar } from 'material-ui'

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
            selectmy: false,
            isOpen: false,
            isLoginOpen: false
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

    isOpen = () => (this.setState({ isOpen: true }))
    isClose = () => (this.setState({ isOpen: false }))
    isLoginOpen = () => (this.setState({ isLoginOpen: true }))
    isLoginClose = () => (this.setState({ isLoginOpen: false }))

    render() {
        return (
            <div>
                <AppBar
                    title={<span >Instagram</span>}
                    style={{ maxWidth: 500 }}
                    iconElementLeft={<div />}
                    iconElementRight={
                        <div>
                            <RaisedButton label="Sign Up" secondary onClick={this.isOpen} >
                                <Authorize isOpen={this.state.isOpen} isClose={this.isClose} />
                            </RaisedButton>
                            <RaisedButton label="Log In" secondary  onClick={this.isLoginOpen} >
                                <Authorize name={'login'} isOpen={this.state.isLoginOpen} isClose={this.isLoginClose} />
                            </RaisedButton>
                        </div>
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
