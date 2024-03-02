export interface changeStatusRequest {
    nrp: string
    diterima: boolean
}

export interface DisplayDetailResponse {
    id: number
    nama: string
    nrp: string
    alasan: string
    diterima: boolean
    pilihanPertama: string
    pilihanKedua: string
    pilihanDiterima?: string | null
    createdAt: Date
}

interface jawabPertanyaan {
    id: number
    divisiId: number
    pertanyaan: string
    jawaban: string
}

export interface StaffRecruitRequest {
    nama: string
    email: string
    nrp: string
    fakultasId: number
    asalDepartemen: string
    ketahui: string
    motivasi: string
    inovasi: string
    pilihanPertama: number
    pilihanKedua: number
    pilihanKetiga: number
    prioritas: string
    linkBuktiFollow: string
    linkCVKreatif: string
    linkKRSM: string
    pertanyaan: Array<jawabPertanyaan>
}