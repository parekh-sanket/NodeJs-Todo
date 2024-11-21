import { Router } from "express";
import userRoutes from "../route/user.route";
import todoRoutes from "../route/todo.route";

const routes = Router()

routes.use('/user', userRoutes)
routes.use('/todo', todoRoutes)

export default routes
