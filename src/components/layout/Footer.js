import React from 'react';
import {Link} from 'react-router-dom';

const Footer = () => {
   return (
      <footer class="page-footer">
         <div class="container">
               <div class="row">
                  <div className="col s12">
                  <ul>
                     <li>Copytight 2020 </li>
                     <li><Link class="text-lighten-3" href="#!">Privacy Policy</Link></li>
                  </ul>
                  </div>
               </div>
         </div>
      </footer>
   )
}

export default Footer;