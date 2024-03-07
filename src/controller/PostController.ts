import { Request, Response } from "express";
import { postSchema } from "../Utils/Validation";
import Joi from "joi";
import { PostRequest } from "../model/PostModel";
import { responseData, responseError } from "../Utils/API-Response";
import { StatusCodes } from "http-status-codes";
import * as PostService from "../service/PostService";
import { UserToken } from "../middleware/AuthMiddleware";

export const createPost = async (req: Request, res: Response) => {
  const {
    error,
    value,
  }: {
    error: Joi.ValidationError;
    value: PostRequest;
  } = postSchema.validate(req.body, { abortEarly: false });

  if (error) {
    responseError(res, error);
    return;
  }

  try {
    const { username } = (req as UserToken).user;
    const post = await PostService.registerPost(value, username);
    responseData(res, StatusCodes.OK, "Post Created", post);
  } catch (err) {
    responseError(res, err);
  }
};

export const retrievePost = async (req: Request, res: Response) => {
  try {
    const value = Number(req.params.post_id);
    const url = await PostService.retrievePost(value);
    responseData(res, StatusCodes.OK, "Post Retrieved", url);
  } catch (err) {
    responseError(res, err);
  }
};

export const retrieveAllPost = async (req: Request, res: Response) => {
  try {
    const urls = await PostService.retrieveAllPost();
    responseData(res, StatusCodes.OK, "All Post Retrieved", urls);
  } catch (err) {
    responseError(res, err);
  }
};

export const retrieveUserPost = async (req: Request, res: Response) => {
  try {
    const value = Number(req.params.user_id);
    const data = await PostService.retrieveUserPost(value);
    responseData(res, StatusCodes.OK, "User Post Retrieved", data);
  } catch (err) {
    responseError(res, err);
  }
};

export const likePost = async (req: Request, res: Response) => {
  try {
    const { username } = (req as UserToken).user;
    const postId = Number(req.params.post_id);
    const data = await PostService.likePost(username, postId);
    responseData(res, StatusCodes.OK, "Post Liked/Disliked", data);
  } catch (err) {
    responseError(res, err);
  }
};

export const updatePost = async (req: Request, res: Response) => {
  const {
    error,
    value,
  }: {
    error: Joi.ValidationError;
    value: PostRequest;
  } = postSchema.validate(req.body, { abortEarly: false });

  if (error) {
    responseError(res, error);
    return;
  }

  try {
    const { username } = (req as UserToken).user;
    const postId = Number(req.params.post_id);
    const updatedPost = await PostService.updatePost(postId, value, username);
    responseData(res, StatusCodes.OK, "Post Updated", updatedPost);
  } catch (err) {
    responseError(res, err);
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    const { username } = (req as UserToken).user;
    const postId = Number(req.params.post_id);
    const url = await PostService.deletePost(postId, username);
    responseData(res, StatusCodes.OK, "Post Deleted", url);
  } catch (err) {
    responseError(res, err);
  }
};
