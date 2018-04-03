import React, { Component } from 'react'
import { CardText } from 'material-ui/Card'
import DeleteIcon from 'material-ui/svg-icons/action/delete'
import Editicon from 'material-ui/svg-icons/content/create'

export default class Comment extends Component {
    constructor(props) {
        super(props)
        this.state = {
            comment: this.props.comment
        }
    }
    render() {
        return (
            <CardText style={{ paddingTop: 1, paddingBottom: 1, margin: 0 }}>
                <div style={{ fontWeight: 'bold', maxWidth: '50%', float: 'left' }}>{this.state.comment.name}</div>
                <div style={{ maxWidth: '100%' }}>
                    &nbsp;  {this.state.comment.text}
                    <DeleteIcon
                        style={{
                            display: 'inline-flex',
                            position: 'relative',
                            alignSelf: 'center',
                            width: 14,
                            height: 14,
                            padding: 0,
                            float: 'right'
                        }}
                        //onClick={this.props.onDeleteComment(this.state.comment)}
                    />
                    <Editicon
                        style={{
                            display: 'inline-flex',
                            position: 'relative',
                            alignSelf: 'center',
                            width: 14,
                            height: 14,
                            padding: 0,
                            float: 'right'
                        }}
                        //onClick={this.props.editComment}
                    />
                </div>
            </CardText>
        )
    }
}
