import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import moment from 'moment/moment.js';

export default class EditPost extends Component {
    constructor(props) {
        super(props)
        this.state = {
            post: this.props.post,
            isOpen: this.props.isOpen
        };
    }

    titleChange(title) {
        this.setState(prevState => {
            const post = { ...prevState.post, title }
            return { post }
        })
    }

    descriptionChange(description) {
        this.setState(prevState => {
            const post = { ...prevState.post, description }
            return { post }
        })
    }

    urlChange(url) {
        this.setState(prevState => {
            const date = moment().format()
            const post = { ...prevState.post, url, date }
            return { post }
        })
    }

    onSave = () => {
        console.log(this.state.post)
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
        const editActions = [
            <FlatButton label="Cancel" primary onClick={this.props.isClose} />,
            <FlatButton
                label="Submit"
                primary
                onClick={this.onSave}
            />,
        ]
        return (
            <Dialog
                title="Edit Photo Info"
                actions={editActions}
                modal={false}
                open={this.state.isOpen}
                onRequestClose={this.props.isClose}
                style={{ maxWidth: 500 }}
            >
                <TextField
                    hintText="Title"
                    value={this.state.post.title}
                    onChange={(event, title) => this.titleChange(title)}
                />
                <TextField
                    hintText="Description"
                    multiLine
                    value={this.state.post.description}
                    onChange={(event, description) => this.descriptionChange(description)}
                />
                <div>
                    {
                        this.props.name === 'edit' ? <div /> :
                            <TextField
                                hintText="URL"
                                onChange={(event, url) => this.urlChange(url)}
                            />
                    }
                </div>
            </Dialog>

        )
    }
}
