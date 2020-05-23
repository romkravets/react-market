import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Dashboard from './components/dashboard/Dashboard';
import ProjectDeaitls from './components/projects/ProjectDetails';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import CreateProgect from './components/projects/CreateProject';



class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar/>
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route path="/project/:id" component={ProjectDeaitls} />
            <Route  path="/signin" component={SignIn} />
            <Route  path="/signup" component={SignUp} />
             <Route  path="/create" component={CreateProgect} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
