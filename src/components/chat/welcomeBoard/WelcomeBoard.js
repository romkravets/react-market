import React from 'react';
import 'react-toastify/dist/ReactToastify.css'

const WelcomeBoard = (props) => {
   return (
      <div className="viewWelcomeBoard">
      <span className="textTitleWelcome">{`Welcome, ${props.currentUserNickname.firstName}`}</span>
         <div className="btn btn-floating pink lighten-1">
            { props.currentUserNickname.initials }
            </div>
              <span className="textDesciptionWelcome">
         Let's start talking. Great things might happen.
      </span>
   </div>
   )
}

export default WelcomeBoard;