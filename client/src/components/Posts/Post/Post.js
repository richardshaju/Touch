import React,{useState} from "react";
import moment from "moment";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  Card,
  ButtonBase,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@material-ui/core";
import makeStyles from "./style";
import ThumbUpAltIcon from "@material-ui/icons/ThumbDownAlt";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { deletePost, likePost } from "../../../actions/posts";
import ThumbDownAlt from "@material-ui/icons/ThumbDownAlt";
function Post({ post, setCurrentId }) {
  const classes = makeStyles();
  const dispatch = useDispatch();
  const history = useHistory()
  const [likes, setLikes] = useState(post?.likes)
  const user = JSON.parse(localStorage.getItem("profile"));
  const hasLikedPost = likes.find((like) => like == (user?.results?.googleId || user?.result?._id))

  const Likes = () => {
    if (likes.length > 0) {
      return likes.find(
        (like) => like == (user?.results?.googleId || user?.result?._id)
      ) ? (
        <>
          <ThumbUpAltIcon fontSize="small" /> &nbsp;{" "}
          {likes.length > 2
            ? `You and ${likes.length - 1} others`
            : `${likes.length} like${likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <ThumbDownAlt fontSize="small" /> &nbsp; {likes.length}{" "}
          {likes.length == 1 ? "Like" : "Likes"}
        </>
      );
    }

    return (
      <>
        <ThumbUpAltIcon fontSize="small" />
        &nbsp;Like{" "}
      </>
    );
  };
  const handleClick = async () => {
    dispatch(likePost(post._id))

    if(hasLikedPost){
      setLikes(likes.filter((id) => id != (user?.result.googleId || user?.result?._id)))
      }else{
        setLikes([...likes, (user?.result.googleId || user?.result?._id)])
      }
  }
  const openPost = () =>{
    history.push(`/posts/${post._id}`)
  }
  return (
    <Card className={classes.card} raised elevation={6}>
      <ButtonBase className={classes.base} onClick={openPost}>
        <CardMedia
          image={post.selectedFile}
          className={classes.media}
          title={post.title}
        />
        <div className={classes.overlay}>
          <Typography variant="h6">{post.name}</Typography>
          <Typography variant="body2">
            {moment(post.createAt).fromNow()}
          </Typography>
        </div>
        {(user?.result?.googleId == post?.creator ||
          user?.result?._id == post?.creator) && (
          <div className={classes.overlay2}>
            <Button
              style={{ color: "white" }}
              size="small"
              onClick={() => {
                setCurrentId(post._id);
              }}
            >
              <MoreHorizIcon fontSize="default" />
            </Button>
          </div>
        )}
        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary">
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
        </div>
        <Typography className={classes.title} variant="h6" gutterBottom>
          {post.title}
        </Typography>
        <CardContent>
          <Typography variant="body2" gutterBottom>
            {post.message}
          </Typography>
        </CardContent>
      </ButtonBase>
      <CardActions className={classes.cardActions}>
        <Button
          size="small"
          color="primary"
          disabled={!user?.result}
          onClick={handleClick}
        >
          <Likes />
        </Button>
        {(user?.result?.googleId == post?.creator ||
          user?.result?._id == post?.creator) && (
          <Button
            size="small"
            color="primary"
            onClick={() => dispatch(deletePost(post._id))}
          >
            <DeleteIcon fontSize="small" />
            Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
}

export default Post;
