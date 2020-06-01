import React from 'react';

const CloseBtn = (props) => {
   return (
      <a click={props.disabled} onClick={props.clicked}>
         <span class="material-icons">clear</span>
      </a>
   )
}

export default CloseBtn;