import express  from "express";
import { getPosts,createPost, updatePost, deletePost, likePost } from "../controllers/posts.js";
import { signin,signup } from "../controllers/user.js";
const router = express.Router();

router.post('/signin', signin)
router.post('/signup', signup)

export default router;