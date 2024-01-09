import React,{useEffect} from 'react';
import { Grid, CircularProgress } from "@material-ui/core";
import Post from "./Post/Post";
import makeStyles from "./style";
import { useSelector, useDispatch } from "react-redux";
import { getPosts } from './../../actions/posts';
import Navbar from '../Navbar/Navbar';

function Posts({setCurrentId}) {
  const dispatch = useDispatch();
  const {posts, isLoading}  = useSelector((state) => state.posts);
  const classes = makeStyles();
  if(!posts.length && !isLoading) return 'No Posts'
  console.log(posts);
  useEffect(() => {
        dispatch(getPosts());
  }, [dispatch]);
  return isLoading ? (
    <CircularProgress />
  ) : (
    <div className={classes.parent}>
    <Navbar/>
    <Grid
     className={classes.posts}
      alignItems="stretch"

    >
   
      {posts.map((post) => (
        <Grid key={post._id} className={classes.post} item xs={12} md={12} sm={12} lg={12}>
            <Post post={post} setCurrentId={setCurrentId}/>
        </Grid>
      ))}
    </Grid>
    </div>
  );
}

export default Posts;
