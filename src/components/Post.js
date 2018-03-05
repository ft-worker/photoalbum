import React from 'react';
import { Card, CardHeader, CardActions, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import moment from 'moment/moment.js';
import FlatButton from 'material-ui/FlatButton';

export default function Post(props) {
    return (
        <Card>
            <CardHeader
                title={props.post.username}
                subtitle="South America"
                avatar={props.post.imageurl}
            />
            <CardMedia><img src={props.post.imageurl} alt="" /></CardMedia>
            <CardTitle
                title={props.post.title}
                subtitle={moment(props.post.date).fromNow()}
            />
            <CardText>{props.post.description}</CardText>
            <CardActions>
                <FlatButton label="Like" />
                <FlatButton label="Comment" />
            </CardActions>
            <CardText>{'View All Comments'}</CardText>
            <CardText>{'Liked By:'}</CardText>
        </Card>
    )
}
