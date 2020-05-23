import React, {Component} from 'react';

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
      console.log(this.state);
   }

   render() {
      return (
         <div className="container">
            <form onSubmit={this.handleSubmit} className="white">
               <h5 className="grey-text text-darcen-3">Sign In</h5>
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
               </div>
            </form>
         </div>
      )
   }
}

export default SignUp;