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
            isOpen: this.props.isOpen,
            addPostFailed: this.props.addPostFailed
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

    onSave = () => {
        if (this.props.name === 'edit') {
            this.props.onEditPost(this.state.post);
            this.props.isClose()
        } else {
            if (this.state.post.title && this.state.post.imageurl) {
                if (this.state.post.imageurl.match(/\.(jpeg|jpg|gif|png)$/)) {
                    console.log('ok')
                    this.props.onAddPost(this.state.post);
                    this.setState({ addPostFailed: '' })
                    this.props.isClose()
                }
                else {
                    this.setState({
                        addPostFailed: 'Wrong url!'
                    })
                }
            } else {
                this.setState({
                    addPostFailed: 'Fill required field!'
                })
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ post: nextProps.post, isOpen: nextProps.isOpen, addPostFailed: nextProps.addPostFailed })
    }

    render() {
        const actions = [
            <FlatButton label="Cancel" primary labelStyle={{ fontWeight: 'bold' }} onClick={this.props.isClose} />,
            <FlatButton
                label="Submit"
                primary
                labelStyle={{ fontWeight: 'bold' }}
                onClick={this.onSave}
            />,
        ]
        return (
            <Dialog
                title={this.props.name === 'edit' ? 'Edit Photo Info' : 'Add a Photo'}
                titleStyle={{ color: '#00BCD4' }}
                actions={actions}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: -220
                }}
                modal={false}
                open={this.state.isOpen}
                onRequestClose={this.props.isClose}
                contentStyle={{
                    position: 'relative',
                    width: '90%',
                    maxWidth: 500
                }}

            >
                <div style={{ color: 'red', fontSize: 11 }}>
                    {
                        this.state.addPostFailed
                    }
                </div>
                <TextField
                    required
                    fullWidth
                    floatingLabelText="Title*"
                    value={this.state.post.title || ''}
                    onChange={(event, title) => this.titleChange(title)}
                />
                <TextField
                    required
                    fullWidth
                    floatingLabelText="Description"
                    multiLine
                    value={this.state.post.description || ''}
                    onChange={(event, description) => this.descriptionChange(description)}
                />
                <TextField
                    required
                    fullWidth
                    floatingLabelText="URL*"
                    multiLine
                    value={this.state.post.imageurl || ''}
                    onChange={(event, imageurl) => this.urlChange(imageurl)}
                />
            </Dialog>
        )
    }
}
