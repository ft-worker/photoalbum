// import React, { Component } from 'react';
// import FlatButton from 'material-ui/FlatButton';
// import TextField from 'material-ui/TextField';
// import Dialog from 'material-ui/Dialog';

// export default class AddPost extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             post: {
//                 id: this.props.id
//             },
//             isOpen: false
//         };
//     }

//     componentWillReceiveProps(nextProps) {
//         this.setState({ post: { id: nextProps.id } })
//     }

//     titleChange(title) {
//         this.setState(prevState => {
//             const post = { ...prevState.post, title }
//             return { post }
//         })
//     }

//     descriptionChange(description) {
//         this.setState(prevState => {
//             const post = { ...prevState.post, description }
//             return { post }
//         })
//     }

   

//     isAddOpen() { this.setState({ isOpen: true }) }
//     isAddClose() { this.setState({ isOpen: false }) }

//     render() {
        
//         return (
//             <div>
                
                    
//             </div>
//         )
//     }
// }
