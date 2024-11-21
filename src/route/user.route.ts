import { Router } from "express";
import * as userController from "../controller/user.controller";
import { asyncHandler } from "../lib/common";
import {isAuthenticated} from "../middleware/authenticated.middleware"

const userRoutes = Router()

userRoutes.post('/registration', asyncHandler(userController.userRegistration))
userRoutes.post('/login', asyncHandler(userController.userLogin))
userRoutes.post('/edit', isAuthenticated, asyncHandler(userController.edituserDetail))

export default userRoutes
