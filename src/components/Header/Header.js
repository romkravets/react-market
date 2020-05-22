import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import {
   Link
 } from "react-router-dom";



const NavBar = () => {

   return(
       <div>
       <AppBar position="fixed">
           <Toolbar>
               <Typography variant="title" color="inherit">
               React
               </Typography>

               <Typography>
                  <Link to="/">Home</Link>
                  <Link to="/about">About</Link>
                  <Link to="/contact">Contact</Link>
               </Typography>
           </Toolbar>
       </AppBar>
       </div>
   )
}
export default NavBar;