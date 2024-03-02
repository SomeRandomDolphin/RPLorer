import db from "../config/connectDb"
import { admins } from "./AdminSeed"
import { divisi } from "./DivisiSeed"
import { Fakultas } from "./FakultasSeed"
import { forms } from "./FormSeed"
import { pertanyaan } from "./PertanyaanSeed"
import { urls } from "./UrlSeed"

async function seedFakultas() {
    Fakultas.forEach(async Fakult => {
        await db.fakultas.upsert({
            where: {
                id: Fakult.id
            },
            update: {
                id: Fakult.id,
                namaFakultas: Fakult.namaFakultas
            },
            create: {
                id: Fakult.id,
                namaFakultas: Fakult.namaFakultas
            }
        })
    })
}

async function seedDivisi() {
    divisi.forEach(async (divisi) => {
        await db.divisi.upsert({
            where: {
                id: divisi.id
            },
            update: {
                id: divisi.id,
                divisiName: divisi.divisiName
            },
            create: {
                id: divisi.id,
                divisiName: divisi.divisiName
            }
        })
    })
}

async function seedAdmin() {
    admins.forEach(async (admin) => {
        await db.admin.upsert({
            where: {
                email: admin.email
            },
            update: {
                name: admin.name,
                email: admin.email,
                password: admin.password,
                ...(admin.divisiId && {divisiId: admin.divisiId}),
                ...(admin.permission && {permission: admin.permission})
            },
            create: {
                name: admin.name,
                email: admin.email,
                password: admin.password,
                ...(admin.divisiId && {divisiId: admin.divisiId}),
                ...(admin.permission && {permission: admin.permission})
            }
        })
    })
}

async function seedPertanyaan() {
    pertanyaan.forEach(async (p) => {
        await db.pertanyaanDivisi.upsert({
            where: {
                id: p.id
            }, create: {
                id: p.id,
                divisiId: p.divisiId,
                pertanyaan: p.pertanyaan
            }, update: {
                id: p.id,
                divisiId: p.divisiId,
                pertanyaan: p.pertanyaan
            }
        })   
    })
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function seedForm() {
    forms.forEach(async (form) => {
        await db.formRecruitment.upsert({
            where: {
                nrp: form.nrp
            },
            update: {
                nama: form.nama,
                email: form.email,
                nrp: form.nrp,
                fakultasId: form.fakultas_id,
                asalDepartemen: form.asal_departemen,
                ketahui: form.ketahui,
                motivasi: form.motivasi,
                inovasi: form.inovasi,
                pilihanPertama: form.pilihan_pertama,
                pilihanKedua: form.pilihan_kedua,
                pilihanKetiga: form.pilihan_ketiga,
                prioritas: form.prioritas,
                linkBuktiFollow: form.link_bukti_follow,
                linkCVKreatif: form.link_cv_kreatif,
                linkKRSM: form.link_krsm,
                pertanyaan: form.pertanyaan
            },
            create: {
                nama: form.nama,
                email: form.email,
                nrp: form.nrp,
                fakultasId: form.fakultas_id,
                asalDepartemen: form.asal_departemen,
                ketahui: form.ketahui,
                motivasi: form.motivasi,
                inovasi: form.inovasi,
                pilihanPertama: form.pilihan_pertama,
                pilihanKedua: form.pilihan_kedua,
                pilihanKetiga: form.pilihan_ketiga,
                prioritas: form.prioritas,
                linkBuktiFollow: form.link_bukti_follow,
                linkCVKreatif: form.link_cv_kreatif,
                linkKRSM: form.link_krsm,
                pertanyaan: form.pertanyaan
            }
        })
    })
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function seedUrl() {
    urls.forEach(async (url) => {
        await db.shortenUrl.upsert({
            where: {
                shortURL: url.shortURL
            },
            update: {
                originalURL: url.originalURL,
                shortURL: url.shortURL
            },
            create: {
                originalURL: url.originalURL,
                shortURL: url.shortURL
            }
        })
    })
}

async function main() {
    try{
        seedFakultas()        
        seedDivisi()
        seedAdmin()
        seedPertanyaan()
        // seedForm()
        // seedUrl()
    } catch(err) {
        console.log(err)
        process.exit(1)
    }
}

main()