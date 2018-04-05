import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

export default class CommentActions extends Component {
    constructor(props) {
        super(props)
        this.state = {
            comment: this.props.comment,
            open: this.props.open
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ comment: nextProps.comment, open: nextProps.open })
    }

    textChange(text) {
        this.setState(prevState => {
            const comment = { ...prevState.comment, text }
            return { comment }
        })
    }

    onSave = () => {
        this.props.editComment(this.state.comment)
        this.props.isClose()
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
                title={'Edit Comment'}
                actions={actions}
                modal={false}
                open={this.state.open}
                onRequestClose={this.props.isClose}
                style={{ maxWidth: 500 }}
            >
                <TextField
                    floatingLabelText="Comment"
                    value={this.state.comment.text || ''}
                    onChange={(event, text) => this.textChange(text)}
                />
            </Dialog>
        )
    }
}
