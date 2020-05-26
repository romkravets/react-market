import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createProject } from '../../store/actions/projectActions';
import {Redirect} from 'react-router-dom';

export class CreateProject extends Component {
   state = {
      title: '',
      content: '',
   }
   handleChange = (e) => {
      this.setState({
         [e.target.id]: e.target.value
      })
   }
   handleSubmit = (e) => {
      e.preventDefault();
      this.props.createProject(this.state);
   }

   render() {
      const { auth } = this.props;
      if (!auth.uid) return <Redirect to='/signin'/>

      return (
         <div className="container">
            <form onSubmit={this.handleSubmit} className="white">
               <h5 className="grey-text text-darcen-3">Create Product</h5>
               <div className="input-field">
                  <label htmlFor="title">Title</label>
                  <input type="text" id="title" onChange={this.handleChange}/>
               </div>
               <div className="input-field">
                  <label htmlFor="content">Description</label>
                  <textarea name="" id="content" className="materialize-textarea" onChange={this.handleChange}></textarea>
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