import db from "../config/connectDb"

export const queryApplicantDetailbyNRP = async (nrp: string) => {
    return await db.formRecruitment.findUnique({
        where: {
            nrp: nrp
        }
    })
}

export const updateApplicantStatusbyNRP = async (
    nrp: string, 
    updatedStatus: boolean, 
    divisiDiterima: number
    ) => {
    return await db.formRecruitment.update({
        where: {
            nrp: nrp
        }, data:{
            statusDiterima: updatedStatus,
            divisiDiterima
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

export const queryPaginatedApplicantListbyDivisiId = async (
    divisiId: number,
    page: number = 1,
    per_page: number = 20,
    filter: string = "",
    orderBy: object = {id: "asc"}
) => {
    const totalPendaftarPilihanSatu = await db.formRecruitment.count({
        where: {pilihanPertama: divisiId}
    })
    const totalPendaftarPilihanKedua = await db.formRecruitment.count({
        where: {pilihanKedua: divisiId}
    })
    const totalPendaftarPilihanKetiga = await db.formRecruitment.count({
        where: {pilihanKetiga: divisiId}
    })

    const totalDiterima = await db.formRecruitment.count({
        where: {
            AND: [
                {divisiDiterima: divisiId},
                {statusDiterima: true}
            ]
        }
    })
    
    const totalPendaftar = totalPendaftarPilihanSatu + totalPendaftarPilihanKedua + totalPendaftarPilihanKetiga
    const maxPage = Math.ceil(totalPendaftar/ per_page)

    if(page > maxPage) page = maxPage
    const curPage = (+page)

    const data = await db.formRecruitment.findMany({
        skip: (+per_page) * ((+page) - 1),
        take: (+per_page),
        where:{
            AND: [
                {OR: [
                    {pilihanPertama: divisiId},
                    {pilihanKedua: divisiId},
                    {pilihanKetiga: divisiId}
                ]},
                {OR: [
                    {nama: {contains: filter, mode: 'insensitive'}},
                    {nrp: {contains: filter, mode: 'insensitive'}}
                ]}
            ]
        },
        select: {
            id: true,
            nrp: true,
            nama: true,
            pilihanPertama: true,
            pilihanKedua: true,
            pilihanKetiga: true,
            fakultasId: true,
            asalDepartemen: true,
            statusDiterima: true,
            divisiDiterima: true,
        },
        orderBy
    })

    return {data, curPage, maxPage, totalPendaftar, totalPendaftarPilihanSatu, totalPendaftarPilihanKedua, totalPendaftarPilihanKetiga, totalDiterima}
}

export const queryAllPaginatedApplicantList = async (
    page: number = 1,
    per_page: number = 20,
    filter: string = "",
    orderBy: object = {id: "asc"}
) => {
    const totalPendaftar = await db.formRecruitment.count()
    const totalDiterima = await db.formRecruitment.count({
        where: {statusDiterima: true}
    })
    const maxPage = Math.ceil(totalPendaftar / per_page)

    if(page > maxPage) page = maxPage
    const curPage = (+page)

    const data = await db.formRecruitment.findMany({
        skip: (+per_page) * ((+page) - 1),
        take: (+per_page),
        where:{
            OR: [
                {nama: {contains: filter, mode: 'insensitive'}},
                {nrp: {contains: filter, mode: 'insensitive'}}
            ],
        },        
        select: {
            id: true,
            nrp: true,
            nama: true,
            pilihanPertama: true,
            pilihanKedua: true,
            pilihanKetiga: true,
            fakultasId: true,
            asalDepartemen: true,
            statusDiterima: true,
            divisiDiterima: true,
        },
        orderBy
    })

    return {data, curPage, maxPage, totalPendaftar, totalDiterima}
}