import { StatusCodes } from "http-status-codes";
import { CustomError } from "../Utils/ErrorHandling";
import { PostRequest } from "../model/PostModel";
import {
  createPost,
  queryPostbyID,
  queryPostbyUserID,
  queryAllPost,
  updateLikeCount,
  editPost,
  removePost,
} from "../repository/PostRepository";
import {
  queryUserDetailbyID,
  queryUserDetailbyUsername,
} from "../repository/UserRepository";

export const registerPost = async (data: PostRequest, userUsername: string) => {
  const user = await queryUserDetailbyUsername(userUsername);
  if (!user) {
    throw new CustomError(StatusCodes.BAD_REQUEST, "Invalid User");
  }

  const post = await createPost(data.title, data.content, user.id);

  if (!post) {
    throw new CustomError(StatusCodes.BAD_REQUEST, "Invalid Post");
  }

  const postCombined = await queryPostbyID(post.id);
  if (!postCombined) {
    throw new CustomError(StatusCodes.BAD_REQUEST, "Invalid Post");
  }

  return postCombined;
};

export const retrievePost = async (data: number) => {
  const post = await queryPostbyID(data);
  if (!post) {
    throw new CustomError(StatusCodes.BAD_REQUEST, "Invalid ID");
  }

  return post;
};

export const retrieveAllPost = async () => {
  return await queryAllPost();
};

export const retrieveUserPost = async (data: number) => {
  const user = await queryUserDetailbyID(data);

  if (!user) {
    throw new CustomError(StatusCodes.NOT_FOUND, "User Not Found");
  }

  const post = await queryPostbyUserID(user.id);

  if (post.length === 0) {
    throw new CustomError(StatusCodes.NOT_FOUND, "Post Not Found");
  }

  return post;
};

export const likePost = async (userUsername: string, postId: number) => {
  const user = await queryUserDetailbyUsername(userUsername);

  if (!user) {
    throw new CustomError(StatusCodes.NOT_FOUND, "User Not Found");
  }

  const post = await updateLikeCount(user.id, postId);

  if (!post) {
    throw new CustomError(StatusCodes.NOT_FOUND, "Post Not Found");
  }

  return post;
};

export const updatePost = async (
  postId: number,
  data: PostRequest,
  userUsername: string,
) => {
  const user = await queryUserDetailbyUsername(userUsername);

  if (!user) {
    throw new CustomError(StatusCodes.NOT_FOUND, "User Not Found");
  }

  const isRegistered = await queryPostbyID(postId);

  if (!isRegistered) {
    throw new CustomError(StatusCodes.NOT_FOUND, "Post Not Found");
  }

  if (isRegistered.userId != user.id) {
    throw new CustomError(StatusCodes.NOT_FOUND, "User Mismatch");
  }

  const updatedPost = await editPost(postId, data);

  if (!updatedPost) {
    throw new CustomError(StatusCodes.BAD_REQUEST, "Invalid Data");
  }

  return updatedPost;
};

export const deletePost = async (postId: number, userUsername: string) => {
  const user = await queryUserDetailbyUsername(userUsername);

  if (!user) {
    throw new CustomError(StatusCodes.NOT_FOUND, "User Not Found");
  }

  const isRegistered = await queryPostbyID(postId);

  if (!isRegistered) {
    throw new CustomError(StatusCodes.NOT_FOUND, "Post Not Found");
  }

  if (isRegistered.userId != user.id) {
    throw new CustomError(StatusCodes.NOT_FOUND, "User Mismatch");
  }

  const updatedPost = await removePost(postId);

  if (!updatedPost) {
    throw new CustomError(StatusCodes.NOT_FOUND, "Post Not Found");
  }

  return updatedPost;
};
