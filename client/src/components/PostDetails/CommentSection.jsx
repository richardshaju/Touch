import React, { useState, useRef } from "react";
import { Typography, TextField, Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import useStyles from "./styles";
import {commentPost} from '../../actions/posts'
function CommentSection({ post }) {
  console.log(post);
  const classes = useStyles();
  const [comments, setComments] = useState([post?.comments]);
  const [comment, setComment] = useState("");
  const user = JSON.parse(localStorage.getItem('profile'))
  const dispatch = useDispatch()
  const commentsRef = useRef();
  const handleClick = () => {
    const finalComment = `${user.result.name}: ${comment}`

    const newComments = dispatch(commentPost(finalComment, post._id))
    setComments(newComments)
    setComment('')

    commentsRef.current.scrollIntoView({behavior: 'smooth'})
  }
  return (
    <div>
      <div className={classes.commentOuterContainer}>
        <div className={classes.commentInnerContainer}>
          <Typography gutterBottom variant="h6">
            Comments
          </Typography>
          {comments.map((c, i) => (
            <Typography key={i} gutterBottom variant="subtitle1">
              {c}
            </Typography>
          ))}
          <div ref={commentsRef}>
          </div>
        </div>
        {user?.result?.name && (
        <div style={{ width: "70%" }}>
          <Typography gutterBottom variant="h6">
            Write a Comment
          </Typography>
          <TextField
            fullWidth
            rows={4}
            variant="outlined"
            label="Comment"
            multiline
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button
          color="primary"
            style={{ margin: "10px" }}
            fullWidth
            disabled={!comment}
            variant="contained"
            onClick={handleClick}
          >Comment</Button>
        </div>
        )}
      </div>
    </div>
  );
}

export default CommentSection;
