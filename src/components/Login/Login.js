import React, { useEffect, useState,useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const emailReducer=(state,action)=>{
  if(action.type==='USER_INPUT'){
    return {value:action.val, isValid:action.val.includes('@')}
  }
  if(action.type==='INPUT_BLUR'){
    return {value:state.value, isValid:state.value.includes('@')}
  }
return {value:'', isValid:false}
}

const passwordReducer=(state,action)=>{
  if(action.type==='USER_INPUT'){
    return {value:action.val, isValid:action.val}
  }
  if(action.type==='INPUT_BLUR'){
    return {value:state.value, isValid:state.value}
  }
return {value:'', isValid:false}
}

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [enteredCollege, setEnteredCollege] = useState('')
  const [collegeIsValid, setCollegeIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState,dispatchEmail]= useReducer(emailReducer,{
    value:'',
    isValid:null,
  })

  const [passwordState,dispatchPassword]= useReducer(passwordReducer,{
    value:'',
    isValid:null,
  })

//   useEffect(()=>{ 
//     const identifier=setTimeout(()=>{
//       console.log('checking for validity')
//       setFormIsValid(
//         emailState.value.includes('@') && enteredPassword.trim().length > 6 && enteredCollege.trim().length > 0
//       );
//     },500)

//     return ()=>{
//       console.log('cleanup')
//       clearTimeout(identifier)
//     }
   
// },[enteredEmail,enteredPassword])
  const emailChangeHandler = (event) => {
    dispatchEmail({type:'USER_INPUT', val:event.target.value})

    setFormIsValid(
      emailState.isValid && event.target.value.trim().length > 6 
    );
  
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({type:'USER_INPUT', val:event.target.value})

    setFormIsValid(
      passwordState.isValid && event.target.value.trim().length > 6
    );
   
  };
 
  const validateEmailHandler = () => {
   dispatchEmail({type:"INPUT_BLUR"})
  };

  const validatePasswordHandler = () => {
    dispatchEmail({type:"INPUT_BLUR"});
  };


  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
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
