import React, { useState, useEffect, useReducer, useContext } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../store/auth-context';

const emailReducer=(state,action)=>
{
  if(action.type==='USER_INPUT')       // where usereducer will evoked with wuth action.type==='USER_INPUT', this statement will process
  {
    return {value:action.val,isValid:action.val.includes('@')}
  }
  if(action.type==='INPUT_BLUR')       // where usereducer will evoked with wuth action.type==='INPUT_BLUR', this statement will process
  {
    return {value:state.value,isValid:state.value.includes('@')}
  }
  return {value:'',isValid:false}       // if condition will not true
}

const passwordReducer=(state,action)=>
{

  console.log(state,action)
  if(action.type==='PASS_INPUT')
  {
    return {value:action.val,isValid:action.val.trim().length>6}
  }
  if(action.type==='PASS_BLUR')
  {
  
    return {value:state.value,isValid:state.value.trim().length>6}
  }
  return {value:"",isValid:false}
}

//here state is basically , state which we are passing below i.e {value:'',isValid:null}, and it will chnage on every reducer function return

//here we are using useReducer for combining two states in one i.e enteredEmail , emailIsValid and same for enteredPassword and passwordIsValid



const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailstate,dispatchEmail]=useReducer(emailReducer,{value:'',isValid:null})


//emailstate , is initial state 
//dispatchEmail , is action whic will trigger emailReducer
//{value:'',isValid:null} are emailstate initial values


  const[passwordState,dispatchPassword]=useReducer(passwordReducer,{value:'',isValid:null})

  const authCtx=useContext(AuthContext)
  
  useEffect(() => {
    console.log('EFFECT RUNNING');

    return () => {
      console.log('EFFECT CLEANUP');
    };
  }, []);

//previously, useEffect was changed for every input value, nut we want to chaange it only if inputs are invalid, therefor now it will depend upon inValid and not value  
// for this we are using destructors , destructing isValid from both states
// here emailIsValid and passwordIsValid are alias , i.e variables which will store value of isValid, these are used in place of isValid
const{isValid :emailIsValid}=emailstate
const{isValid:passwordIsValid}=passwordState

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log('Checking form validity!');
      setFormIsValid(
        // emailstate.value && passwordState.value
        emailIsValid && passwordIsValid
      );
    }, 500);

    return () => {
      console.log('CLEANUP');
      clearTimeout(identifier);
    };
  },
  // [emailstate.value , passwordState.value]
 
   [emailIsValid, passwordIsValid]);

  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);
    dispatchEmail({type:'USER_INPUT',val:event.target.value})  // evoking useReducer with action ,{type:'USER_INPUT'}

    // setFormIsValid(
    //   // event.target.value.includes('@') && enteredPassword.trim().length > 6

    //   emailstate.isValid && passwordState.isValid
    // );
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    dispatchPassword({type:'PASS_INPUT',val:event.target.value})    //// evoking useReducer with action ,{type:'PASS_INPUT'}

    // setFormIsValid(
    //   // enteredEmail.includes('@') && event.target.value.trim().length > 6
    //   emailstate.isValid && passwordState.isValid
    // );
  };

  const validateEmailHandler = () => {
    // setEmailIsValid(enteredEmail.includes('@'));
    // setEmailIsValid(emailstate.isValid);
    dispatchEmail({type:'INPUT_BLUR'})
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);
    dispatchPassword({type:'PASS_BLUR'})
  };

  const submitHandler = (event) => {
    event.preventDefault();
    // props.onLogin(enteredEmail, enteredPassword);
    authCtx.onLogin(emailstate.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailstate.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailstate.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
