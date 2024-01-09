import React from 'react'
import {
    Avatar,
    Button,
    Paper,
    Grid,
    Typography,
    Container,
  
  } from "@material-ui/core";
import makeStyles from "./styles";
function Profile() {
const classes = makeStyles()
  return (
    <div className={classes.profile}>
        <Paper elevation={3} className={classes.card}>
            <Avatar className={classes.avatar} />
            <h4>Richard Shaju</h4>
            <Typography>Engineer</Typography>
           
        </Paper>
    </div>
  )
}

export default Profile