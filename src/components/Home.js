import React, { Component } from 'react';
import { Card, CardMedia, CardText } from 'material-ui/Card'
import { AppBar } from 'material-ui'
// import { Link } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton'
import { login, logout, isLoggedIn } from '../AuthService';

class Home extends Component {

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
                <Card style={{ maxWidth: 500 }}>
                    <CardMedia
                        overlay={
                            <CardText >
                                <div style={{ fontWeight: 'bold', fontSize: 20, float: 'left', paddingBottom: '10%' }}>
                                    "This is the simple web page where you can add your photos, write your thoughts and see others'.
                                    It's very easy to use. Just Sign Up or Log In and start to share your world."
                                 </div>
                            </CardText>
                        }
                    >
                        <img src="https://ultraimg.com/images/Ho6hQWs.jpg" style={{}} alt="" />
                    </CardMedia>
                </Card>
            </div>
        );
    }
}

export default Home;
