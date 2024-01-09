import {
  Container,
  Paper,
  AppBar,
  Typography,
  Grow,
  TextField,
  Button,
  Grid,
} from "@material-ui/core";
import { useHistory, useLocation } from "react-router-dom";
import ChipInput from "material-ui-chip-input";
import React, { useState, useEffect } from "react";
import Posts from "../Posts/Posts";
import Form from "../Form/From";
import { useDispatch } from "react-redux";
import { getPosts,getPostsBySearch } from "../../actions/posts.js";
import App from "../../app";
import useStyles from "./styles";
import Profile from "../Profile/Profile.jsx";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
function Home() {
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();
  const classes = useStyles();
  const query = useQuery();
  const history = useHistory();
  const searchQuery = query.get("searchQuery");
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);


  const searchPost = () => {
    if (search.trim() || tags) {
      // Note the '&' character added between searchQuery and tags
      dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
      history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
    } else {
      history.push("/");
    }
  };
  
  const handleKeyPress = (e) => {
    if (e.keyCode == 13) {
      searchPost();
    }
  };

  const handleAdd = (tag) => setTags([...tags, tag]);
  const handleDelete = (tagToDelete) =>
    setTags(tags.filter((tag) => tag != tagToDelete));
  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          container
          alignItems="stretch"
    
          className={classes.gridContainer}
          >
          <Grid item>
          <Profile/>
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={6}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item >
            <AppBar
              className={classes.appBarSearch}
              position="static"
              color="inherit"
            >
              <TextField
                name="search"
                variant="outlined"
                label="Search Menories"
                fullWidth
                onKeyPress={handleKeyPress}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <ChipInput
                style={{ margin: "10px 0" }}
                value={tags}
                onDelete={handleDelete}
                onAdd={handleAdd}
                label="Search Tags"
                variant="outlined"
              />
              <Button
                variant="contained"
                onClick={searchPost}
                className={classes.searchButton}
                color="primary"
              >
                Search
              </Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
}

export default Home;
