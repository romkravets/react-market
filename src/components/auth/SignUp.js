import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';
import { signUp } from '../../store/actions/authActions'

export class SignUp extends Component {
   state = {
      email: '',
      password: '',
      firstName: '',
      lastName: ''
   }
   handleChange = (e) => {
      this.setState({
         [e.target.id]: e.target.value
      })
   }
   handleSubmit = (e) => {
      e.preventDefault();
      this.props.signUp(this.state);
   }

   render() {
      const { auth, authError } = this.props;
      let authRedirect = null;
      if (auth.uid) {
         authRedirect = <Redirect to='/'/>
      } else {
         authRedirect = (
            <div className="container">
            <form onSubmit={this.handleSubmit} className="white">
               <h5 className="grey-text text-darcen-3">Sign Up</h5>
               <div className="input-field">
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" onChange={this.handleChange}/>
               </div>
               <div className="input-field">
                  <label htmlFor="password">Password</label>
                  <input type="password" id="password" onChange={this.handleChange}/>
               </div>
               <div className="input-field">
                  <label htmlFor="firstName">First Name</label>
                  <input type="text" id="firstName" onChange={this.handleChange}/>
               </div>
               <div className="input-field">
                  <label htmlFor="lastName">Last Name</label>
                  <input type="text" id="lastName" onChange={this.handleChange}/>
               </div>
               <div className="input-field">
                  <button className="btn pink lighten-1 z-depth-0">Login</button>
                  <div className="red-text center">
                        { authError ? <p>{ authError }</p>: null }
                  </div>
               </div>
            </form>
         </div>
         )
      }
      return authRedirect;
   }
}

const mapStateToProps = (state) => {
   return {
      auth: state.firebase.auth,
      authError: state.auth.authError
   }
}

const mapDispatchToProps = (dispatch) => {
   return {
      signUp: (newUser) => dispatch(signUp(newUser))
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);