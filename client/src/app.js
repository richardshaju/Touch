import React from "react";
import { Container } from "@material-ui/core";
import {
  BrowserRouter,
  Switch,
  HashRouter,
  Route,
  Redirect
} from "react-router-dom/cjs/react-router-dom.min";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import PostDetails from "./components/PostDetails/PostDetails";
import Auth from "./components/Auth/Auth";
import makeStyles from "./styles";
const App = () => {
  const classes = makeStyles();
  const user = JSON.parse(localStorage.getItem('profile'))
  return (
    <BrowserRouter>
      <Container maxWidth="xl">
    
        <Switch>
          <Route path="/" exact component={() => <Redirect to="/posts"/>}/>
          <Route path="/posts" exact component={Home}/>
          <Route path="/posts/search" exact component={Home}/>
          <Route path="/posts/:id" exact component={PostDetails}/>
          <Route path="/auth" exact component={() => (!user ? <Auth/> : <Redirect to="/posts"/>)}/>
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default App;
