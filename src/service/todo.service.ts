import Todo from "../database/models/Todo.model"
import {addTodoResponse, editTodoResponse, deleteTodoResponse, markedTaskResponse, unMarkedTaskResponse} from "../types/todo.type"
import cron from "node-cron";
import * as common from  "../lib/common"

export async function addTodo({
    title,
    description,
    dueDate,
    user,
}: {
    title: string
    description: string
    dueDate: NativeDate
    user: {username: string; _id: string}
}): Promise<addTodoResponse> {
    try {
        let todo = await Todo.create({
            title,
            description,
            dueDate,
            userId: user._id,
        })

        let response: addTodoResponse = {
            userId: todo.userId.toString(),
            title: todo.title,
            description: todo.description,
            dueDate: todo.dueDate,
            createdAt: todo.createdAt,
            updatedAt: todo.updatedAt,
            _id: todo._id.toString(),
        }

        return response
    } catch (err) {
        console.log("Error in service -> user -> function {addTodo} >>> error: ", err)
        throw err
    }
}

export async function editTodo({
    title,
    description,
    dueDate,
    user,
    todoId,
    reminderTime
}: {
    title: string | undefined | null
    description: string | undefined | null
    dueDate: NativeDate | undefined | null,
    reminderTime: NativeDate | undefined | null,
    user: {username: string; _id: string}
    todoId: string
}): Promise<editTodoResponse> {
    try {
        let todo = await Todo.findById(todoId)
        if (!todo) {
            return {
                error: {
                    status: 404,
                    message: "todo not found",
                },
            }
        }

        if (todo.userId.toString() !== user._id) {
            return {
                error: {
                    status: 401,
                    message: "unauthorized operation",
                },
            }
        }

        let todayDate = new Date(new Date().setHours(0, 0, 0, 0))

        if(todo.createdAt && new Date(new Date(todo.createdAt).setHours(0, 0, 0, 0)) < todayDate) {
            return {
                error: {
                    status: 412,
                    message: "you can edit only today's todo",
                },
            }
        }
        
        if(reminderTime && todo.createdAt && new Date(reminderTime) < new Date(todo.createdAt)){
            return {
                error: {
                    status: 412,
                    message: "reminder time should be greater than todo creation time",
                },
            }
        }

        await Todo.findByIdAndUpdate(todoId, {
            title,
            description,
            dueDate,
            reminderTime
        })

        return {
            data: {
                message: "todo successfully updated",
            },
        }
    } catch (err) {
        console.log("Error in service -> user -> function {editTodo} >>> error: ", err)
        throw err
    }
}

export async function deleteTodo({
    user,
    todoId,
}: {
    user: {username: string; _id: string}
    todoId: string
}): Promise<deleteTodoResponse> {
    try {
        let todo = await Todo.findById(todoId)
        if (!todo) {
            return {
                error: {
                    status: 404,
                    message: "todo not found",
                },
            }
        }

        if (todo.userId.toString() !== user._id) {
            return {
                error: {
                    status: 401,
                    message: "unauthorized operation",
                },
            }
        }

        let todayDate = new Date(new Date().setHours(0, 0, 0, 0))

        if(todo.dueDate && new Date(new Date(todo.createdAt).setHours(0, 0, 0, 0)) < todayDate) {
            return {
                error: {
                    status: 412,
                    message: "you can delete only today's todo",
                },
            }
        }

        await Todo.findByIdAndDelete(todoId)

        return {
            data: {
                message: "todo deleted successfully"
            }
        }
    } catch (err) {
        console.log("Error in service -> user -> function {deleteTodo} >>> error: ", err)
        throw err
    }
}

export async function markedTask({
    user,
    todoId,
}: {
    user: {username: string; _id: string}
    todoId: string
}): Promise<markedTaskResponse> {
    try {
        let todo = await Todo.findById(todoId)
        if (!todo) {
            return {
                error: {
                    status: 404,
                    message: "todo not found",
                },
            }
        }

        if (todo.userId.toString() !== user._id) {
            return {
                error: {
                    status: 401,
                    message: "unauthorized operation",
                },
            }
        }

        if(todo.status === "completed") {
            return {
                error : {
                    status: 412,
                    message: "todo already completed"
                }
            }
        }

        await Todo.findByIdAndUpdate(todoId,{
            status: "completed",
            completedAt : new Date()
        })

        return {
            data: {
                message: "task completed successfully."
            }
        }
    } catch (err) {
        console.log("Error in service -> user -> function {markedTask} >>> error: ", err)
        throw err
    }
}

export async function unMarkedTask({
    user,
    todoId,
}: {
    user: {username: string; _id: string}
    todoId: string
}): Promise<unMarkedTaskResponse> {
    try {
        let todo = await Todo.findById(todoId)
        if (!todo) {
            return {
                error: {
                    status: 404,
                    message: "todo not found",
                },
            }
        }

        if (todo.userId.toString() !== user._id) {
            return {
                error: {
                    status: 401,
                    message: "unauthorized operation",
                },
            }
        }

        if(todo.status === "pending") {
            return {
                error : {
                    status: 412,
                    message: "todo already in pending"
                }
            }
        }

        await Todo.findByIdAndUpdate(todoId,{
            status: "pending",
            completedAt : null
        })

        return {
            data: {
                message: "task unmark  successfully."
            }
        }
    } catch (err) {
        console.log("Error in service -> user -> function {unMarkedTask} >>> error: ", err)
        throw err
    }
}

export async function getTodoList({
    user,
    date,
    year,
    month
}:{
    user: {username: string; _id: string}
    date: number,
    year: number,
    month : number
}){
    try{
        let newFullDate = new Date()
        newFullDate.setDate(date)
        newFullDate.setHours(0, 0, 0, 0)
        newFullDate.setFullYear(year)
        newFullDate.setMonth(month - 1)

        let todoList = await Todo.find({
            userId: user._id,
            createdAt: {
                $gte: new Date(newFullDate),
                $lt: new Date(newFullDate.setDate(newFullDate.getDate() + 1))
            }
        })

        return todoList
    }catch(err){
        console.log("Error in service -> user -> function {getTodoList} >>> error: ", err)
        throw err
    }
}


cron.schedule("*/1 * * * *", async () => { // Runs every 5 minutes
    try {
        const now = new Date();
        
        const upcomingTodos = await Todo.find({
            reminderTime: { $gte: now , $lte : new Date(now.setMinutes(now.getMinutes() + 1))}, // Reminder time is due
        }).populate("userId", "username email") as any;
        
        for (const todo of upcomingTodos) {
            if(todo.userId){
                const user = todo.userId

                if(user?.email){
                    const emailText = `
                        Reminder: Your task "${todo.title}" is due on ${todo.dueDate}.
                        Description: ${todo.description}.
                    `;
                    
                    await common.sendEmail({
                        subject : "Todo Reminder",
                        text : emailText,
                        to : user.email
                    })
                }
            }
        }
    } catch (err) {
        console.error("Error in reminder job:", err);
    }
});