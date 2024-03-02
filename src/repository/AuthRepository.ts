import db from "../config/connectDb"

export const queryAdminbyDivisiId = async (adminDivisiId: number) => {
    return await db.admin.findFirst({
        where: {
            divisiId: adminDivisiId
        }
    })
}

export const queryAdminbyEmail = async (adminEmail: string) => {
    return await db.admin.findUnique({
        where: {
            email: adminEmail
        }
    })
}
