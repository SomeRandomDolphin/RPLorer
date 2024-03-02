import { Router } from "express"
import { createShortURL, getAllShortenedUrl, retrieveShortURL } from "../controller/ShortenerController"

const shortenerRouter = Router()

shortenerRouter.post("/create", createShortURL)
shortenerRouter.get("/:shortenedURL", retrieveShortURL)
shortenerRouter.get("", getAllShortenedUrl)

export default shortenerRouter