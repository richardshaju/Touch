import React, {useState, useEffect} from "react";
import { useDispatch } from "react-redux";
import decode from 'jwt-decode'
import {
  AppBar,
  Avatar,
  Button,
  Toolbar,
  Typography,

} from "@material-ui/core";
import {Link} from "react-router-dom"
import makeStyles from "./styles";
import memories from "../../images/memories.png";
import { useHistory, useLocation } from "react-router-dom";

function Navbar() {
  const classes = makeStyles();
  const [user, setuser] = useState(JSON.parse(localStorage.getItem('profile')))
  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()
   useEffect(() => {
       const token = user?.token;
       if(token){
        const decodedToken = decode(token)
        if(decodedToken.exp * 1000 <new Date().getTime())
          logout()
       }

       setuser(JSON.parse(localStorage.getItem('profile')))
   },[location])
    const logout = () =>{
        dispatch({type:'LOGOUT'})
        history.push('/')
        setuser(null)
    }

    
  return (

    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Typography component={Link} to="/" className={classes.heading} variant="h3" align="center">
          Memories
        </Typography>
        <img className={classes.image} src={memories} alt="icon" />
      </div>
      <Toolbar className={classes.toolbar}>
            {user ? (
                <div className={classes.profile}>
                    <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl} >
                        {user.result.name.charAt(0)}
                    </Avatar>
                    <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                    <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                </div>
            ):(
                <Button component={Link} to="/auth" variant="contained" color="primary">Siginup</Button>
            )}
      </Toolbar>
    </AppBar>

  );
}

export default Navbar;
