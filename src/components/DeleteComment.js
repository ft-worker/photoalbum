import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

export default class DeleteComment extends Component {
    onDelete = () => {
        this.props.deleteComment(this.props.comment);
        this.props.isClose();
    }
    render() {
        const deleteActions = [
            <FlatButton label="Cancel" primary labelStyle={{ fontWeight: 'bold'}} onClick={this.props.isClose} />,
            <FlatButton label="Delete" primary labelStyle={{ fontWeight: 'bold'}} onClick={this.onDelete} />
        ];
        return (
            <Dialog
                contentStyle={{
                    position: 'relative',
                    width: '90%',
                    maxWidth: 500
                }}
                actions={deleteActions}
                open={this.props.open}
                onRequestClose={() => this.props.isDeleteClose()}
            >
                Do you want to delete this post?
            </Dialog>
        )
    }
}
