import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createProject } from '../../store/actions/projectActions';
import { Redirect } from 'react-router-dom';
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
      };
   }


   handleUpload = (e) => {
      e.preventDefault();
      if (this.state.image) {
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
      } else {
         console.log('Add image pleace');
      }
   }

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
                  <button className="btn waves-effect lighten-1 z-depth-0 waves-light btn-large">Submit</button>
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