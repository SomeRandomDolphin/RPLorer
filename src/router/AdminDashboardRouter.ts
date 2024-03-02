import { Router } from "express"
import { getApplicantDetail, getApplicantLists, patchApplicantStatus } from "../controller/AdminDashboardController"
import { adminAuthMiddleware } from "../middleware/AuthMiddleware"

const adminDashboard = Router()

adminDashboard.get("/list", adminAuthMiddleware, getApplicantLists)
adminDashboard.get("/:nrp", adminAuthMiddleware, getApplicantDetail)
adminDashboard.patch("/change-status", adminAuthMiddleware, patchApplicantStatus)

export default adminDashboard