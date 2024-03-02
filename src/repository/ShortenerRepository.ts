import db from "../config/connectDb"

export const setShortURL = async (originalURLInput: string, shortURLInput: string) => {
    return await db.shortenUrl.create({
        data: {
            originalURL: originalURLInput,
            shortURL: shortURLInput
        }
    })
}

export const queryFullURLbyShortURL = async (shortURLInput: string) => {
    return await db.shortenUrl.findUnique({
        where: {
            shortURL: shortURLInput
        }
    })
}

export const queryAllShortendUrls = async () => {
    return await db.shortenUrl.findMany()
}