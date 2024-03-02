import { StatusCodes } from "http-status-codes"
import { CustomError } from "../Utils/ErrorHandling"
import { queryAllPaginatedApplicantList, queryApplicantDetailbyNRP, queryPaginatedApplicantListbyDivisiId, updateApplicantStatusbyNRP } from "../repository/AdminDashboardRepository"
import { AdminPermission, Prisma } from "@prisma/client";

export const applicantDetail = async (applicantNRP: string) => {
    const data = await queryApplicantDetailbyNRP(applicantNRP)
    
    if(!data){
        throw new CustomError(StatusCodes.BAD_REQUEST, "Calon staff tidak ditemukan")
    }

    return data
}

export const applicantLists = async (
    adminDivisiId: number, 
    permissions: AdminPermission,
    urlQuery?
    ) => {
    const {page, per_page, filter, sortby, type} = urlQuery || {}
    
    // not really the correct error object, but it'll do the trick (chose this because its easy to constructed and it has to be prisma)
    if(per_page < 1) throw new Prisma.PrismaClientInitializationError("", "")

    const orderBy = { 
        [ sortby ?? "id" ]: type ?? "asc" 
    } as const

    let data, curPage, maxPage, totalPendaftar, totalDiterima, totalPendaftarPilihanSatu, totalPendaftarPilihanKedua, totalPendaftarPilihanKetiga

    if(permissions == "SUPERADMIN"){
        // eslint-disable-next-line no-var
        const result = await queryAllPaginatedApplicantList(
            page ?? page,
            per_page ?? per_page,
            filter ?? filter,
            orderBy ?? orderBy
        )

        ;({ data, curPage, maxPage, totalPendaftar, totalDiterima } = result)

        return {
            totalPendaftar: totalPendaftar,
            totalDiterima: totalDiterima,
            ...(data && {content: data}),
            metadata: {
                page: curPage,
                maxPage: maxPage
            }
        }
    } else {
        // eslint-disable-next-line no-var
        const result = await  queryPaginatedApplicantListbyDivisiId(
            adminDivisiId,
            page ?? page,
            per_page ?? per_page,
            filter ?? filter,
            orderBy ?? orderBy
        )

        ;({ data, curPage, maxPage, totalPendaftar, totalDiterima, totalPendaftarPilihanSatu, 
            totalPendaftarPilihanKedua, totalPendaftarPilihanKetiga } = result)

        return {
            totalPendaftar: totalPendaftar,
            totalDiterima: totalDiterima,
            totalPendaftarPilihanSatu: totalPendaftarPilihanSatu ?? 0,
            totalPendaftarPilihanKedua: totalPendaftarPilihanKedua ?? 0,
            totalPendaftarPilihanKetiga: totalPendaftarPilihanKetiga ?? 0,
            ...(data && {content: data}),
            metadata: {
                page: curPage,
                maxPage: maxPage
            }
        }
    }
}

export const changeApplicantStatus = async (
    adminDivisiId: number, 
    applicantNRP: string,  
    updatedStatus: boolean
    ) => {
    const { 
        pilihanPertama, 
        pilihanKedua, 
        pilihanKetiga,
        statusDiterima, 
        divisiDiterima 
    } = await queryApplicantDetailbyNRP(applicantNRP)

    // checks if the applicant is applying for the admin's division
    if(pilihanPertama != adminDivisiId && pilihanKedua != adminDivisiId && pilihanKetiga != adminDivisiId){
        throw new CustomError(StatusCodes.FORBIDDEN, "Calon staff tidak mendaftar di divisi anda")
    } // checks if the applicant is already accepted and other admin is trying to change its status 
    else if (statusDiterima && divisiDiterima != adminDivisiId){
        throw new CustomError(StatusCodes.FORBIDDEN, "Calon staff telah diterima di divisi lain")
    } // checks if the applicant is already accepted and the same admin is trying to accept it again (reduce query)
    else if(updatedStatus && divisiDiterima == adminDivisiId){
        return 0
    } // checks if the admin's who accepting the applicant is trying to revert its status  
    else if(!updatedStatus){
        adminDivisiId = null
    }

    await updateApplicantStatusbyNRP(applicantNRP, updatedStatus, adminDivisiId)

    return 0
}