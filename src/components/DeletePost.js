import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

export default class MyPost extends Component {

    onDelete = () => {
        this.props.onDeletePost(this.props.post);
        this.props.isDeleteClose();
    }

    render() {
        const deleteActions = [
            <FlatButton label="Cancel" onClick={this.props.isDeleteClose} />,
            <FlatButton label="Delete" onClick={this.onDelete} />
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
