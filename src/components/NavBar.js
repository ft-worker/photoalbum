import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import { Link } from 'react-router'
//import { withRouter } from 'react-router-dom'


const style = {
    width: '50%',
    color1: '#00BCD4',
    color2: '#f48fb1',
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
            <div style={{
                position: 'relative',
                marginTop: 70,
                maxWidth: 700,
                marginLeft: 'auto',
                marginRight: 'auto',
            }}>
                <Link to="/posts">
                    <RaisedButton
                        label="All Photos"
                        labelStyle={{ color: 'white' }}
                        backgroundColor={this.state.selectall ? style.color1 : style.color2}
                        style={{ width: '50%' }}
                        onClick={() => this.handleClickAll()}
                    />
                </Link>
                {
                    !this.state.loggedIn ?
                        <RaisedButton
                            label="My Photos"
                            style={style}
                            disabled
                        /> :
                        <Link to="/myposts" >
                            <RaisedButton
                                label="My Photos"
                                labelStyle={{ color: 'white' }}
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
