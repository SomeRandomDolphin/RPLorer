import { Router } from "express";
import {
  createPost,
  retrievePost,
  retrieveAllPost,
  retrieveUserPost,
  likePost,
  updatePost,
  deletePost,
} from "../controller/PostController";
import { userAuthMiddleware } from "../middleware/AuthMiddleware";

const postRouter = Router();

postRouter.post("/create", userAuthMiddleware, createPost);
postRouter.get("", retrieveAllPost);
postRouter.get("/user/:user_id", retrieveUserPost);
postRouter.patch("/like/:post_id", userAuthMiddleware, likePost);
postRouter.put("/update/:post_id", userAuthMiddleware, updatePost);
postRouter.delete("/delete/:post_id", userAuthMiddleware, deletePost);
postRouter.get("/:post_id", retrievePost);

export default postRouter;
