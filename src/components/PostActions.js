import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import moment from 'moment/moment.js';

export default class PostActions extends Component {
    constructor(props) {
        super(props)
        this.state = {
            post: this.props.post,
            isOpen: this.props.isOpen
        };
    }

    titleChange(title) {
        this.setState(prevState => {
            const updated = moment().format('YYYY-MM-DD HH:mm:ss')
            const post = { ...prevState.post, title, updated }
            return { post }
        })
    }

    descriptionChange(description) {
        this.setState(prevState => {
            const updated = moment().format('YYYY-MM-DD HH:mm:ss')
            const post = { ...prevState.post, description, updated }
            return { post }
        })
    }

    urlChange(imageurl) {
        this.setState(prevState => {
            const post = { ...prevState.post, imageurl }
            return { post }
        })
    }

    usernameChange(username) {
        this.setState(prevState => {
            const post = { ...prevState.post, username }
            return { post }
        })
    }

    onSave = () => {
        if (this.props.name === 'edit') {
            this.props.onEditPost(this.state.post);
            this.props.isClose()
        } else {
            this.props.onAddPost(this.state.post);
            this.props.isClose()
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ post: nextProps.post, isOpen: nextProps.isOpen })
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
                title={this.props.name === 'edit' ? 'Edit Photo Info' : 'Add Photo'}
                actions={actions}
                modal={false}
                open={this.state.isOpen}
                onRequestClose={this.props.isClose}
                style={{ maxWidth: 500 }}
            >
                <div>
                    {
                        this.props.name === 'edit' ? <div /> :
                            <TextField
                                floatingLabelText="Pick a username"
                                onChange={(event, username) => this.usernameChange(username)}
                            />
                    }
                </div>
                <TextField
                    floatingLabelText="Title"
                    value={this.state.post.title || ''}
                    onChange={(event, title) => this.titleChange(title)}
                />
                <TextField
                    floatingLabelText="Description"
                    multiLine
                    value={this.state.post.description || ''}
                    onChange={(event, description) => this.descriptionChange(description)}
                />
                <div>
                    {
                        this.props.name === 'edit' ? <div /> :
                            <TextField
                                floatingLabelText="URL"
                                onChange={(event, imageurl) => this.urlChange(imageurl)}
                            />
                    }
                </div>
            </Dialog>

        )
    }
}
