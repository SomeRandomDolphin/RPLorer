import Joi from "joi"

export const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
})

export const changeStatusSchema = Joi.object({
    nrp: Joi.string().required(),
    statusDiterima: Joi.boolean().required()
})

export const shortenerSchema = Joi.object({
    originalURL: Joi.string().required(),
    shortURL: Joi.string().required()
})

export const staffRecruitSchema = Joi.object({
    nama: Joi.string().required(),
    email: Joi.string().email().required(),
    nrp: Joi.string().required(),
    fakultasId: Joi.number().integer().min(1).max(8).required(),
    asalDepartemen: Joi.string().required(),
    ketahui: Joi.string().required(),
    motivasi: Joi.string().required(),
    inovasi: Joi.string().required(),
    pilihanPertama: Joi.number().integer().min(1).max(18).required(),
    pilihanKedua: Joi.number().integer().min(1).max(18).required(),
    pilihanKetiga: Joi.number().integer().min(1).max(18).required(),
    prioritas: Joi.string().required(),
    linkBuktiFollow: Joi.string().required(),
    linkCVKreatif: Joi.string().required(),
    linkKRSM: Joi.string().required(),
    pertanyaan: Joi.array().items({     
        id: Joi.number().required(),
        divisiId: Joi.number().required(),
        pertanyaan: Joi.string().required(),
        jawaban: Joi.string().required()
    }).required()
})