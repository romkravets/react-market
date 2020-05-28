// import React, { useState } from 'react';
// import { connect } from 'react-redux';
// import { createProject } from '../../store/actions/projectActions';
// import {Redirect} from 'react-router-dom';
// import { storage } from '../../config/fb.config';

// const CreateProject = (props) => {

//    const [title, setfTitle] = useState('');
//    const [content, setlContent] = useState('');
//    const [image, setImage] = useState('');

//    const [selectedFile, setSelectedFile] = useState(null);
//    const [urlImage, setUrlImage] = useState('');

//    // const handleChange = (e) => {
//    //    setContent({[e.target.id]: e.target.value});
//    //       // [e.target.id]: e.target.value
//    // }

//    const handleChangeFile = (e) => {
//       if (e.target.files[0]) {
//          setImage(e.target.files[0].name);
//          setSelectedFile(e.target.files[0]);
//          // this.setState({
//          //    imageFile: e.target.files[0]
//          // })
//       };
//    }

//   const handleSubmit = (e) => {
//       e.preventDefault();
//       const project = {
//          title : title,
//          content : content,
//          image : image,
//          urlImage: urlImage,
//      }
//       const uploadTask = storage.ref(`images/${selectedFile.name}`).put(selectedFile);
//       uploadTask.on(
//          "state_changed",
//          snapshot => {
//          },
//          error => {
//             console.log(error);
//          },
//          () => {
//             storage
//             .ref("images")
//             .child(selectedFile.name)
//             .getDownloadURL()
//             .then(url => {
//                console.log(url);
//                setUrlImage(url);
//             });
//          }
//       );

//       props.createProject(project);
//       props.history.push('/');
//    }

//       const { auth } = props;
//       if (!auth.uid) return <Redirect to='/signin'/>

//       return (
//          <div className="container">
//             <form onSubmit={handleSubmit} className="white">
//                <h5 className="grey-text text-darcen-3">Create Product</h5>
//                <div className="input-field">
//                   <label htmlFor="title">Title</label>
//                   <input type="text" id="title" onChange={e => setfTitle(e.target.value)}/>
//                </div>
//                <div className="input-field">
//                   <label htmlFor="content">Description</label>
//                   <textarea name="" id="content" className="materialize-textarea" onChange={e => setlContent(e.target.value)}></textarea>
//                </div>
//                <div className="file-field input-field">
//                   <div className="btn">
//                      <span>Add image</span>
//                      <input type="file" id="image" onChange={handleChangeFile}></input>
//                   </div>
//                   <div className="file-path-wrapper">
//                      <input className="file-path validate" type="text"/>
//                   </div>
//                </div>
//                <div className="input-field">
//                   <button className="btn pink lighten-1 z-depth-0">Create</button>
//                </div>
//             </form>
//          </div>
//       )
// }

// const  mapStateToProps = (state) => {
//    return {
//       auth: state.firebase.auth
//    }
// }

// const mapDispatchToProps = (dispatch) => {
//    return {
//       createProject: (project) => dispatch(createProject(project))
//    }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(CreateProject);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createProject } from '../../store/actions/projectActions';
import {Redirect} from 'react-router-dom';
import { storage } from '../../config/fb.config';

export class CreateProject extends Component {
   state = {
         title: '',
         content: '',
         imgUrl: '',
         image: null,
         isLoaded: false,
   }
   handleChange = (e) => {
      this.setState({
         [e.target.id]: e.target.value
      })
   }

   handleChangeFile = (e) => {
      if (e.target.files[0]) {
         this.setState({
            image: e.target.files[0]
         })
         // setImage(e.target.files[0].name);
         // setSelectedFile(e.target.files[0]);
         // this.setState({
         //    imageFile: e.target.files[0]
         // })
      };
   }


   handleUpload = (e) => {
      e.preventDefault();
      const uploadTask = storage.ref(`images/${this.state.image.name}`).put(this.state.image);
      uploadTask.on(
         "state_changed",
         snapshot => {
         },
         error => {
            console.log(error);
         },
         () => {
            storage
            .ref("images")
            .child(this.state.image.name)
            .getDownloadURL()
            .then(url => {
               console.log(url);
               this.setState({
                  isLoaded: true,
                  imgUrl: url
               });
               const project = {
                  title : this.state.title,
                  content : this.state.content,
                  imgUrl: this.state.imgUrl,
              }
               this.props.createProject(project);
               this.props.history.push('/');
            });
         }
      );
   }

   // handleSubmit = (e) => {

   //    const project = {
   //       title : this.state.title,
   //       content : this.state.content,
   //       imgUrl: this.state.imgUrl,
   //   }
   //    e.preventDefault();
   //    this.handleUpload();
   //    this.props.createProject(project);
   //    // console.log(this.state, 'project');
   //    this.props.history.push('/');
   // }

   render() {
      const { auth } = this.props;
      if (!auth.uid) return <Redirect to='/signin'/>

      return (
         <div className="container">
            <form onSubmit={this.handleUpload} className="white">
               <h5 className="grey-text text-darcen-3">Create Product</h5>
               <div className="input-field">
                  <label htmlFor="title">Title</label>
                  <input type="text" id="title" onChange={this.handleChange}/>
               </div>
               <div className="input-field">
                  <label htmlFor="content">Description</label>
                  <textarea name="" id="content" className="materialize-textarea" onChange={this.handleChange}></textarea>
               </div>
               <div className="file-field input-field">
                   <div className="btn">
                      <span>Add image</span>
                      <input type="file" id="image" onChange={this.handleChangeFile}></input>
                   </div>
                  <div className="file-path-wrapper">
                      <input className="file-path validate" type="text"/>
                  </div>
                </div>
               <div className="input-field">
                  <button className="btn pink lighten-1 z-depth-0">Create</button>
               </div>
            </form>
         </div>
      )
   }
}

const  mapStateToProps = (state) => {
   return {
      auth: state.firebase.auth
   }
}

const mapDispatchToProps = (dispatch) => {
   return {
      createProject: (project) => dispatch(createProject(project))
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateProject);