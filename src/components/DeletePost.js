import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

export default class MyPost extends Component {
    render() {
        const deleteActions = [
            <FlatButton label="Cancel" onClick={this.props.isDeleteClose} />,
            <FlatButton label="Delete" onClick={() => {
                this.props.onDeletePost(this.props.post.id);
                this.props.isDeleteClose();
            }} />
        ];
        return (
            <Dialog
                style={{ maxWidth: 500 }}
                actions={deleteActions}
                open={this.props.isDeleteOpen}
                onRequestClose={() => this.props.isDeleteClose()}
            >
                Are you want to delete this post?
            </Dialog>
        )
    }
}
