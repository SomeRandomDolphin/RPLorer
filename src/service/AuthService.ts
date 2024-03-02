import { StatusCodes } from "http-status-codes";
import { CustomError } from "../Utils/ErrorHandling";
import { LoginRequest } from "../model/AuthModel";
import { queryAdminbyDivisiId, queryAdminbyEmail } from "../repository/AuthRepository";
import { generateAccessToken } from "../Utils/JWT-Token";
import bcrypt from "bcrypt"

export const loginAdmin = async (data: LoginRequest) => {
    const admin = await queryAdminbyEmail(data.email)
    if(!admin){
        throw new CustomError(StatusCodes.BAD_REQUEST, "Invalid Credential")
    }

    const isPasswordMatch = bcrypt.compareSync(data.password, admin.password)
    if(!isPasswordMatch){
        throw new CustomError(StatusCodes.BAD_REQUEST, "Invalid Credential")
    }

    const payload = {
        name: admin.name,
        permissions: admin.permission,
        divisiId: admin.divisiId
    }

    const accessToken =  generateAccessToken(payload)

    return {accessToken}
}

export const adminProfile = async (adminDivisiId: number) => {
    const admin = await queryAdminbyDivisiId(adminDivisiId)

    if(!admin){
        throw new CustomError(StatusCodes.NOT_FOUND, "Admin not found")
    }

    delete admin.password

    return admin
}