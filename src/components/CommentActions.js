import React, { Component } from 'react';
import TextField from 'material-ui/TextField';

export default class PostActions extends Component {
    constructor(props) {
        super(props)
        this.state = {
            comment: {
                post_id: this.props.post.post_id
            }
        };
    }
    commentChange = text => {
        this.setState(prevState => {
            const comment = { ...prevState.comment, text }
            return { comment }
        })
    }
    addComment = () => {
        this.props.addComment(this.state.comment)
        this.props.handleComments()
    }
    render() {
        return (
            <div style={{ paddingLeft: 18, paddingRight: 18 }} >
                <TextField
                    hintText="Add a comment"
                    multiLine
                    fullWidth
                    onChange={(event, text) => this.commentChange(text)}
                    onKeyPress={(ev) => {
                        if (ev.key === 'Enter') {
                            this.addComment()
                            ev.currentTarget.value = null
                            ev.preventDefault()
                        }
                    }}
                />
            </div>
        )
    }
}
