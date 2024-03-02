import { StatusCodes } from "http-status-codes";
import { CustomError } from "../Utils/ErrorHandling";
import { StaffRecruitRequest } from "../model/StaffRecruitModel";
import { createApplicant, queryApplicantAcceptance, queryApplicantDetailbyNRP, queryQuestionbyDivisiId } from "../repository/StaffRecruitRepository";

export const registerApplicant = async (data: StaffRecruitRequest) => {    
    const isRegisted = await queryApplicantDetailbyNRP(data.nrp)

    if(isRegisted){
        throw new CustomError(StatusCodes.BAD_REQUEST, "NRP telah terdaftar")
    }

    const url = await createApplicant(
        data.nama, 
        data.email, 
        data.nrp, 
        data.fakultasId, 
        data.asalDepartemen, 
        data.ketahui, 
        data.motivasi, 
        data.inovasi, 
        data.pilihanPertama, 
        data.pilihanKedua, 
        data.pilihanKetiga, 
        data.prioritas,
        data.linkBuktiFollow, 
        data.linkCVKreatif, 
        data.linkKRSM,
        data.pertanyaan
    )

    if(!url){
        throw new CustomError(StatusCodes.BAD_REQUEST, "Invalid Data")
    }

    return url
}

export const retrieveQuestion = async (data: number) => {    
    const questions = await queryQuestionbyDivisiId(data)

    if(questions.length == 0){
        throw new CustomError(StatusCodes.BAD_REQUEST, "Invalid ID")
    }

    return questions
}

export const acceptanceCheck = async (nrp: string) => {
    const data = await queryApplicantAcceptance(nrp)

    if(!data){
        throw new CustomError(StatusCodes.NOT_FOUND, "NRP not found")
    }

    return data
}