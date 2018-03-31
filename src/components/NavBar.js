import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import { Link } from 'react-router'

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
            loggedIn: this.props.loggedIn
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ loggedIn: nextProps.loggedIn })
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
                <Link to="/posts">
                    <RaisedButton
                        label="All Photos"
                        backgroundColor={this.state.selectall ? style.color1 : style.color2}
                        style={style}
                        onClick={() => this.handleClickAll()}
                    />
                </Link>
                {
                    !this.state.loggedIn ? 
                    <RaisedButton
                            label="My Photos"
                            backgroundColor={this.state.selectmy ? style.color1 : style.color2}
                            style={style}
                            disabled
                        /> : 
                    <Link to="/myposts" >
                        <RaisedButton
                            label="My Photos"
                            backgroundColor={this.state.selectmy ? style.color1 : style.color2}
                            style={style}
                            disabled={!this.state.loggedIn}
                            onClick={() => this.handleClickMy()}
                        />
                    </Link >
                }
            </div>
        );
    }
}
