
import { Box, Button, Container, Grid,Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
// import { useDispatch } from "react-redux";
// import { authActions } from "../store/auth";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

import BasicInput from "../components/BasicInput";

import { toast } from "react-toastify";
import axios from "axios";


function ValidateEmail(inp){
  const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (inp.match(validRegex)) {
      return true
  } else{
    return false
  }  
}

function validatePassword(password) {
  const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/;
  return pattern.test(password);
}

function LoginPage(){

    const [isEmailValid,setIsEmailValid] = useState(false)
    const [isPasswordValid,setIsPasswordValid] = useState(false)
    const [loading,setLoading] = useState(false);
    const [searchParams] = useSearchParams();

    
    useEffect(()=>{     
      if(searchParams.get('verified') == 1){
      toast.success('Account Already Verified')
      } else if(searchParams.get('verified') == 2){
        toast.error('Email Verified Please Login!')
      }
    },[])
    
    const navigate = useNavigate();
    // const dispatch = useDispatch();
    const location = useLocation();

    let { error } = location.state || false;
    
    function submitHandler(event){

        event.preventDefault(); 
      
        // if(isEmailValid && isPasswordValid){
          const data = new FormData(event.target);
          const formdata = {
            email: data.get('email'),
            password: data.get('pass')
          }
          setLoading(true);
          axios.post(`http://localhost:8000/login`, {
              headers: {
                'Accept': "application/json",
                "Access-Control-Allow-Origin": "http://localhost:5173",
                "Access-Control-Allow-Headers": "X-Requested-With",
                "X-Requested-With": "XMLHttpRequest",
                'credentials': 'include'
              },
              ...formdata,
            })
            .then((response) => {
              setLoading(false);
              if (response.status === 200) {
                console.log(response);

                // const accessToken = response.data.auth_token;
                // const user = 'user';
                // toast.success('Login Successful, Redirecting to HomePage!',{ autoClose: 2000 })
                setTimeout(() => {            
                  navigate("/userpage");
                }, 2000);
                
              }
            })
            .catch((error) => {
              console.log(error.response)
              setLoading(false);
              toast.error(error.response.data.message)
              // console.log(error.response);
            });      
        }
  
          return (
            <Container component="main" maxWidth="sm" sx={{minWidth: '160px', marginTop: '6vh', marginBottom: '6vh'}}>
              {error && <Typography component="h1" variant="h4" sx={{ color: 'red'}}>Please Login</Typography>}
            <Box
              sx={{
                boxShadow: 3,
                borderRadius: 2,
                // backgroundColor: '#0F1111',
                px: 4,
                py: 2,
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography component="h1" variant="h4" sx={{ color: 'black'}}>
                Sign In
              </Typography>

          <Box noValidate sx={{ mt: 1, width: '100%' }} onSubmit={submitHandler}>
              <form onSubmit={submitHandler}>
              <BasicInput name='email' key = 'email' type = 'email' label = 'E-mail' err= 'Please Enter a Valid Email' validation={ValidateEmail} valid={setIsEmailValid} status={isEmailValid} > </ BasicInput>  
              
              <BasicInput name = 'pass' key = 'pass' type = 'password' label = 'Password' err= 'Invalid Password' validation={validatePassword} valid={setIsPasswordValid} status={isPasswordValid}> </BasicInput> 
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 4, mb: 3, minWidth: '50px', fontSize: '1.2rem'}}
                >
                  {!loading && <div>Sign In</div>}
                  {loading && <div>Loading...</div>}
                </Button>
                </form>
                <Grid container justifyContent={'flex-end'}>
                  <Grid item><Link to ="/signup">New Here? Register!</Link></Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
    );
}

export default LoginPage;