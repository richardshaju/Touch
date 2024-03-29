import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import makeStyles from "./styles";
import { useHistory } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import LockOutlinedIcon from "@material-ui/icons/LockOpenOutlined";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,

} from "@material-ui/core";
import Input from "./input";
import Icon from './icon'
import {gapi} from 'gapi-script'
import {signin, signup} from '../../actions/auth'
const initialState = {firstName:'', lastName:'', email:'', password:'', confirmPassword:''}

function Auth() { 
 const history = useHistory()
  const dispatch = useDispatch()
  const classes = makeStyles();
  const [isSignup, setSignup] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(initialState);

  const handleSubmit = (e) => {
    e.preventDefault()
    if(isSignup){
      dispatch(signup(formData, history))
    }else{
      dispatch(signin(formData, history))
    }
  };
  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]:e.target.value})
  };

  const switchMode = () => {
    setSignup((value) => !value);
    setShowPassword(false)
  };
  const handleShowPassword = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword);
  
  useEffect(() =>{
    function start(){
        gapi.client.init({
            clientId: "533154106202-3q6ug3pgpcv2b07lufot2idqn6qc3ukr.apps.googleusercontent.com"
            ,scope: ""
        })
    }
    gapi.load('client:auth2', start)
  })


const googleSuccess = async(res) =>{
       const result = res?.profileObj;
       const token = res?.tokenId;

       try {
            dispatch({type:'AUTH', data:{result, token}})
            history.push('/')
       } catch (error) {
        console.log(error);
       }
  }
const googleFailure =  (error) =>{
    console.log(error);
    console.log("Google failed");
  }
 
 
    return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignup ? "Signup" : "Sign In"}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignup ? "Sign Up" : "Sign In"}
          </Button>
          <GoogleLogin
            clientId="533154106202-3q6ug3pgpcv2b07lufot2idqn6qc3ukr.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button
                className={classes.googleButton}
                color="primary"
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon />}
                variant="contained"
              >Google Sign In</Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy='single_host_origin'
          />
         
          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup
                  ? "Already have an account? Sign In"
                  : "Don't have an account Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}

export default Auth;
