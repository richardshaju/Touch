import React, { useState, useEffect, Profiler } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import makeStyles from "./styles";
import FileBase from "react-file-base64";
import { useDispatch } from "react-redux";
import { createPost, updatePost } from "../../actions/posts";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom"
function From({currentId, setCurrentId}) {
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });
  const post = useSelector((state) => currentId ? (state.posts.posts.find((p) => p._id == currentId)) : null);
  const classes = makeStyles();
  const dispatch = useDispatch();
  const history = useHistory()
  const user = JSON.parse(localStorage.getItem('profile'))
  useEffect(()=>{
      if(post) setPostData(post)
  }, [post])
  const handleSubmit = (e) => {
    e.preventDefault()

    if(currentId){
      dispatch(updatePost(currentId,{...postData,name:user?.result?.name}))
      
    }else{
      dispatch(createPost({...postData, name:user?.result?.name, history}))
     
    }
    clear()
  };
  const clear = () => {
    setCurrentId(null);
    setPostData({
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    })
  };

  if(!user?.result?.name){
    return(
      <Paper className={classes.paper}>
          <Typography variant="h6" align="center">
              Please Sign in to create Your own memories
          </Typography>
      </Paper>
    )
  }
  return (
    <Paper className={classes.paper} elevation={6}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.form} ${classes.root}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">{currentId ? 'Editing':'Creating'} a Memory</Typography>
       
        <TextField
          name="title"
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
          variant="outlined"
          label="Title"
          fullWidth
        />
        <TextField
          name="message"
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
          variant="outlined"
          label="Message"
          fullWidth
        />
        <TextField
          name="tags"
          value={postData.tags}
          onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })}
          variant="outlined"
          label="Tags"
          fullWidth
        />
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          clear
        </Button>
      </form>
    </Paper>
  );
}

export default From;
