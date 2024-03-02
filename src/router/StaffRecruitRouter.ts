import { Router } from "express"
import { getApplicantStatus, registerApplicant, retrieveQuestion } from "../controller/StaffRecruitController"

const staffRecruitRouter = Router()

staffRecruitRouter.post("/register", registerApplicant)
staffRecruitRouter.get("/pertanyaan/:id", retrieveQuestion)
staffRecruitRouter.get("/status/:nrp", getApplicantStatus)

export default staffRecruitRouter