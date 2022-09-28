import React,{useContext} from 'react';

import classes from './Navigation.module.css';
import AuthContext from '../../store/auth-context';
const Navigation = (props) => {

     const ctx= useContext(AuthContext)

  return (
    <nav className={classes.nav}>
      <ul>
        {ctx.isLoggedIn && (
          <li>
            <a href="/">Users</a>
          </li>
        )}
        {ctx.isLoggedIn && (
          <li>
            <a href="/">Admin</a>
          </li>
        )}
        {ctx.isLoggedIn && (
          <li>
            <button onClick={props.onLogout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;



//now we are using useContext hook, which is better then ".Consumer",
//Here we import useContext
//Then use below in function i.e   const ctx=   useContext(AuthContext)
//in it we pass context object name which we want to use here in component