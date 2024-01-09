import express  from "express";
import { getPostBySearch, getPost,getPosts,commentPost, createPost, updatePost, deletePost, likePost } from "../controllers/posts.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get('/posts', getPosts); 
router.get('/:id', getPost); 
router.get('/search', getPostBySearch);
router.post('/posts',auth, createPost);
router.patch('/:id',auth, updatePost)
router.delete('/posts/:id',auth, deletePost)
router.patch("/:id/likePost",auth, likePost)
router.post("/:id/commentPost", commentPost)

export default router;