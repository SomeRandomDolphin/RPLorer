import db from "../config/connectDb"

export const createApplicant = async (
    namaInput: string, 
    emailInput: string, 
    nrpInput: string,
    fakultasIdInput: number, 
    asalDepartemenInput: string, 
    ketahuiInput: string, 
    motivasiInput: string, 
    inovasiInput: string, 
    pilihanPertamaInput: number, 
    pilihanKeduaInput: number,
    pilihanKetigaInput: number,
    prioritasInput: string,
    linkBuktiFollowInput: string, 
    linkCVKreatifInput: string, 
    linkKRSMInput: string,
    pertanyaanInput: Array<object>
) => {
    return await db.formRecruitment.create({
        data: {
            nama: namaInput,
            email: emailInput,
            nrp: nrpInput,
            fakultasId: fakultasIdInput,
            asalDepartemen: asalDepartemenInput,
            ketahui: ketahuiInput,
            motivasi: motivasiInput,
            inovasi: inovasiInput,
            pilihanPertama: pilihanPertamaInput,
            pilihanKedua: pilihanKeduaInput,
            pilihanKetiga: pilihanKetigaInput,
            prioritas: prioritasInput,
            linkBuktiFollow: linkBuktiFollowInput,
            linkCVKreatif: linkCVKreatifInput,
            linkKRSM: linkKRSMInput,
            pertanyaan: pertanyaanInput
        }
    })
}

export const queryApplicantDetailbyNRP = async (nrp: string) => {
    const data =  await db.formRecruitment.findUnique({
        where: {
            nrp: nrp
        }
    })

    return data
}

export const updateApplicantStatusbyNRP = async (nrp: string, updatedStatus: boolean, divisiDiterima: number) => {
    return await db.formRecruitment.update({
        where: {
            nrp: nrp
        }, data:{
            statusDiterima: updatedStatus,
            divisiDiterima: divisiDiterima
        }
    })
}

export const queryDivisiNamebyId = async (divisiId: number) => {
    if(!divisiId){
        return null
    }

    const { divisiName } = await db.divisi.findUnique({
        where: {
            id: divisiId
        }
    })

    return divisiName
}

export const queryQuestionbyDivisiId = async (divisiIdInput: number) => {
    if(!divisiIdInput){
        return null
    }

    return await db.pertanyaanDivisi.findMany({
        where: {
            divisiId: divisiIdInput
        }
    })
}

export const queryApplicantAcceptance = async (nrp: string) => {
    return await db.formRecruitment.findFirst({
        where: {
            nrp: nrp
        },
        select: {
            nrp: true,
            nama: true,
            asalDepartemen: true,
            statusDiterima: true,
            divisiDiterima: true,
        }
    })
}