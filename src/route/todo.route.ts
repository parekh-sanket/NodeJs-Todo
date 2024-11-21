import { Router } from "express";
import * as todoController from "../controller/todo.controller";
import { asyncHandler } from "../lib/common";
import {isAuthenticated} from "../middleware/authenticated.middleware"

const todoRoutes = Router()

todoRoutes.post('/add', isAuthenticated, asyncHandler(todoController.addTodo))
todoRoutes.patch('/edit/:todoId', isAuthenticated, asyncHandler(todoController.editTodo))
todoRoutes.delete('/:todoId', isAuthenticated, asyncHandler(todoController.deleteTodo))
todoRoutes.post('/mark/:todoId', isAuthenticated, asyncHandler(todoController.markedTask))
todoRoutes.post('/unmark/:todoId', isAuthenticated, asyncHandler(todoController.unMarkedTask))
todoRoutes.get('/get-todo', isAuthenticated, asyncHandler(todoController.getTodoList))

export default todoRoutes
