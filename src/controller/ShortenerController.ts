import { Request, Response } from "express";
import { shortenerSchema } from "../Utils/Validation";
import Joi from "joi"
import { ShortenerRequest } from "../model/ShortenerModel";
import { responseData, responseError } from "../Utils/API-Response";
import { StatusCodes } from "http-status-codes";
import * as ShortenerService from "../service/ShortenerService" 

export const createShortURL = async (req: Request, res: Response) => {    
    const { 
        error,
        value
    } : {
        error: Joi.ValidationError,
        value: ShortenerRequest
    } = shortenerSchema.validate(req.body, {abortEarly: false})

    if(error){
        responseError(res, error)
        return
    }

    try{
        const url = await ShortenerService.createShortURL(value)
        responseData(res, StatusCodes.OK, "Short URL Created", url)
    } catch(err){
        responseError(res, err)
    }
}

export const retrieveShortURL = async (req: Request, res: Response) => {    
    try{
        const value = req.params.shortenedURL
        const url = await ShortenerService.retrieveShortURL(value)
        responseData(res, StatusCodes.OK, "Short URL Retrieved", url)
    } catch(err){
        responseError(res, err)
    }
}

export const getAllShortenedUrl = async (req: Request, res: Response) => {
    try{
        const urls = await ShortenerService.listAllShortenedUrls()
        responseData(res, StatusCodes.OK, "retrieved all shortened urls", urls)
    } catch(err){
        responseError(res, err)
    }
}