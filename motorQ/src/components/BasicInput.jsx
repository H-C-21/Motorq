import { Container, TextField} from "@mui/material";
import { useState,useEffect, Fragment} from "react";

import classes from './BasicInput.module.css';


function BasicInput({validation,type,label,name,err,valid,status}){

  const [enteredName, setEnteredName] = useState('');
  const [enteredNameTouched, setEnteredNameTouched] = useState(false);
  const [error,setError] = useState(false)

  const nameInputIsInvalid = !status && enteredNameTouched;


  const nameInputChangeHandler = (event) => {

    setEnteredName(event.currentTarget.value);
    
    if(validation(event.currentTarget.value)){
      valid(true)
    }else{
      valid(false)
    }
  }

  const nameInputBlurHandler = () => {
    setEnteredNameTouched(true);
  };

  // useEffect(()=>{

  // },[enteredNameIsValid])
  

  let nameInputClasses = enteredNameTouched ? nameInputIsInvalid
    ? { backgroundColor: '#fddddd'}
    : {
        backgroundColor: '#ddfde2'
    } : {}

  

    return(  
        <Fragment>    
        <TextField
            margin="normal"
            required
            fullWidth
            type={type}
            label={label}
            name={name}
            autoComplete="email"
            onChange={nameInputChangeHandler}
            onBlur={nameInputBlurHandler}
            value={enteredName}
            sx={nameInputClasses}
        />
      {nameInputIsInvalid && (
        <Container className={classes.errorContainer}>
        <div className={classes.errorText} style={{textAlign: 'initial'}}>{err}</div></Container>
      )}</Fragment>

      )
}

export default BasicInput;