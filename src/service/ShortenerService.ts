import { StatusCodes } from "http-status-codes";
import { CustomError } from "../Utils/ErrorHandling";
import { ShortenerRequest } from "../model/ShortenerModel";
import { setShortURL, queryFullURLbyShortURL, queryAllShortendUrls } from "../repository/ShortenerRepository";

export const createShortURL = async (data: ShortenerRequest) => {    
    const url = await setShortURL(data.originalURL, data.shortURL)
    if(!url){
        throw new CustomError(StatusCodes.BAD_REQUEST, "Invalid Url")
    }

    return url
}

export const retrieveShortURL = async (data: string) => {    
    const url = await queryFullURLbyShortURL(data)
    if(!url){
        throw new CustomError(StatusCodes.BAD_REQUEST, "Invalid Url")
    }

    return url
}

export const listAllShortenedUrls = async () => {
    return await queryAllShortendUrls()
}