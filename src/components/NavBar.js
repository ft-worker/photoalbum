import React, { Component } from 'react';
import Posts from '../containers/Posts';
import MyPosts from '../containers/MyPosts';
import RaisedButton from 'material-ui/RaisedButton';
import { Route, Link } from 'react-router-dom';

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
                <Link to="/">
                    <RaisedButton
                        label="All Photos"
                        backgroundColor={this.state.selectall ? style.color1 : style.color2}
                        style={style}
                        onClick={() => this.handleClickAll()}
                    />
                </Link>
                <Link to="/MyPosts">
                    <RaisedButton
                        label="My Photos"
                        backgroundColor={this.state.selectmy ? style.color1 : style.color2}
                        style={style}
                        onClick={() => this.handleClickMy()}
                    />
                </Link>
                <Route exact path="/" component={Posts} />
                <Route path="/MyPosts" component={MyPosts} />
            </div>
        );
    }
}
