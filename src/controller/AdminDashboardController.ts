import { Request, Response } from "express";
import { responseData, responseError, responseOK } from "../Utils/API-Response";
import Joi from "joi"
import { changeStatusRequest } from "../model/AdminDashboardModel";
import { changeStatusSchema } from "../Utils/Validation";
import { AdminToken } from "../middleware/AuthMiddleware";
import { applicantDetail, applicantLists, changeApplicantStatus } from "../service/AdminDashboardService";
import { StatusCodes } from "http-status-codes";
import { PrismaErrorTypes } from "../Utils/ErrorHandling";

export const getApplicantDetail = async (req: Request, res: Response) => {   
    try {
        const applicant = await applicantDetail(req.params.nrp)
        responseData(res, StatusCodes.OK, "success", applicant)
    } catch(err) {
        responseError(res, err)
    }
}

export const getApplicantLists = async (req: Request, res: Response) => {  
    const {divisiId, permissions} = (req as AdminToken).user
    const urlQuery = req.query

    try{
        const lists = await applicantLists(divisiId, permissions, urlQuery)
        responseData(res, StatusCodes.OK, "success", lists)
    } catch(err){
        const isErrorInPrismaErrorTypes = PrismaErrorTypes.some(errorType => err instanceof errorType);

        if(isErrorInPrismaErrorTypes){
            const lists = await applicantLists(divisiId, permissions)
            responseData(res, StatusCodes.OK, "Query error", lists)
        } else {
            responseError(res, err)
        }
    }

}
export const patchApplicantStatus = async (req: Request, res: Response) => {    
    const {
        error,
        value
    } : {
        error: Joi.ValidationError,
        value: changeStatusRequest
    } = changeStatusSchema.validate(req.body, {abortEarly: false})

    if(error){
        responseError(res, error)
        return
    }

    try{
        const { divisiId } = (req as AdminToken).user
        await changeApplicantStatus(divisiId, value.nrp, value.statusDiterima)
        responseOK(res, StatusCodes.OK, "Berhasil mengubah status calon staff")
    } catch(err){
        responseError(res, err)
    }
}