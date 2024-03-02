import { Request, Response } from "express";
import { loginSchema } from "../Utils/Validation";
import Joi from "joi"
import { LoginRequest } from "../model/AuthModel";
import { responseData, responseError } from "../Utils/API-Response";
import { StatusCodes } from "http-status-codes";
import * as AuthService from "../service/AuthService" 
import { AdminToken } from "../middleware/AuthMiddleware";

export const loginAdmin = async (req: Request, res: Response) => {
    const { 
        error,
        value
    } : {
        error: Joi.ValidationError,
        value: LoginRequest
    } = loginSchema.validate(req.body, {abortEarly: false})

    if(error){
        responseError(res, error)
        return
    }

    try{
        const tokens = await AuthService.loginAdmin(value)
        responseData(res, StatusCodes.OK, "Login Successful", tokens)
    } catch(err){
        responseError(res, err)
    }
}

export const getAdminProfile = async (req: Request, res: Response) => {
    const {divisiId} = (req as AdminToken).user

    try{
        const data = await AuthService.adminProfile(divisiId)
        responseData(res, StatusCodes.OK, "success", data)
    }catch(err){
        responseError(res, err)
    }
}