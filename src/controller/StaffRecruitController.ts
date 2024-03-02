import { Request, Response } from "express";
import { staffRecruitSchema } from "../Utils/Validation";
import Joi from "joi"
import { StaffRecruitRequest } from "../model/StaffRecruitModel";
import { responseData, responseError } from "../Utils/API-Response";
import { StatusCodes } from "http-status-codes";
import * as StaffRecruitService from "../service/StaffRecruitService"
import { CustomError } from "../Utils/ErrorHandling";

export const registerApplicant = async (req: Request, res: Response) => {    
    const { 
        error,
        value
    } : {
        error: Joi.ValidationError,
        value: StaffRecruitRequest
    } = staffRecruitSchema.validate(req.body, {abortEarly: false})

    if(error){
        responseError(res, error)
        return
    }

    try{
        const deadline = new Date(2023, 8, 6)
        const date = new Date(Date.now())
        if(date > deadline){
            throw new CustomError(StatusCodes.OK, 'Deadline has passed!')
        }
        
        const staff = await StaffRecruitService.registerApplicant(value)
        responseData(res, StatusCodes.OK, "Staff Registration Successful", staff)
    } catch(err){
        responseError(res, err)
    }
}

export const retrieveQuestion = async (req: Request, res: Response) => {    
    try{
        const value = Number(req.params.id)
        const url = await StaffRecruitService.retrieveQuestion(value)
        responseData(res, StatusCodes.OK, "Question Retrieved", url)
    } catch(err){
        responseError(res, err)
    }
}

export const getApplicantStatus = async (req: Request, res: Response) => {
    const nrp = req.params.nrp
    try{
        const data = await StaffRecruitService.acceptanceCheck(nrp)
        responseData(res, StatusCodes.OK, "status berhasil di dapatkan", data)
    } catch(err) {
        responseError(res, err)
    }
}
