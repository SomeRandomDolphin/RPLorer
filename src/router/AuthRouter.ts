import { Router } from "express"
import { loginAdmin, getAdminProfile } from "../controller/AuthController"
import { adminAuthMiddleware } from "../middleware/AuthMiddleware"

const authRouter = Router()

authRouter.post("/login", loginAdmin)
authRouter.get("/me", adminAuthMiddleware, getAdminProfile)

export default authRouter