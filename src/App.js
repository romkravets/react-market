import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Dashboard from './components/dashboard/Dashboard';
import ProjectDeaitls from './components/projects/ProjectDetails';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import CreateProject from './components/projects/CreateProject';
import FavoriteProject from './components/projects/FavoriteProject';
import EditProfile from './components/user/EditProfile/EditProfile';

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
            <Route  path="/create" component={CreateProject} />
            <Route  path="/favorite" component={FavoriteProject} />
            <Route  path="/edit-profile" component={EditProfile} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
