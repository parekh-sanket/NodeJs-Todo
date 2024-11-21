import {Request, Response} from "express" 
import * as todoService from "../service/todo.service"
import * as common from "../lib/common"

export async function addTodo(req: Request, res: Response):Promise<void> {
    try {
        let { title, description, dueDate }: { title: string, description: string, dueDate:  NativeDate } = req.body
        let user = req.user as { username: string, _id: string }

        if(!title || !description || !dueDate) {
            res.status(412).json({error: "invalid data"})
        }

        if(new Date(dueDate) < new Date()) {
            res.status(412).json({error: "Due date should be greater than current date"})
            return
        }

        let response = await todoService.addTodo({
            title, 
            description, 
            dueDate,
            user
        })

        res.status(200).json(response)
        return
        
    } catch (err) {
        console.log("Error in controller -> user -> function {addTodo} >>> error: ", err)
        if (err instanceof Error) {
            res.status(500).json({ error: err.message });
            return
        }
        // Handle cases where `err` is not an instance of Error
        res.status(500).json({ error: "An unexpected error occurred" });
        return 
    }
}

export async function editTodo(req: Request, res: Response):Promise<void> {
    try {
        let { title, description, dueDate, reminderTime }: { title: string | undefined | null , description: string | undefined | null, dueDate:  NativeDate | undefined | null, reminderTime : NativeDate | undefined | null } = req.body
        let user = req.user as { username: string, _id: string }
        let todoId = req.params.todoId

        if(!title && !description && !dueDate) {
            res.status(412).json({error: "invalid data"})
            return
        }

        if(!todoId){
            res.status(412).json({error: "invalid data"})
            return
        }

        if(dueDate && new Date(dueDate) < new Date()) {
            res.status(412).json({error: "Due date should be greater than current date"})
            return
        }

        let {error , data} = await todoService.editTodo({
            title, 
            description, 
            dueDate,
            user,
            todoId,
            reminderTime
        })

        if (error || !data) {
            res.status(error?.status ?? 500).json({error: error?.message})
            return
        }

        res.status(200).json(data)
        return
        
    } catch (err) {
        console.log("Error in controller -> user -> function {addTodo} >>> error: ", err)
        if (err instanceof Error) {
            res.status(500).json({ error: err.message });
            return
        }
        // Handle cases where `err` is not an instance of Error
        res.status(500).json({ error: "An unexpected error occurred" });
        return 
    }
}

export async function deleteTodo(req: Request, res: Response):Promise<void> {
    try {
        let user = req.user as { username: string, _id: string }
        let todoId = req.params.todoId

        if(!todoId){
            res.status(412).json({error: "invalid data"})
            return
        }

        let {error , data} = await todoService.deleteTodo({
            user,
            todoId
        })

        if (error || !data) {
            res.status(error?.status ?? 500).json({error: error?.message})
            return
        }

        res.status(200).json(data)
        return
        
    } catch (err) {
        console.log("Error in controller -> user -> function {addTodo} >>> error: ", err)
        if (err instanceof Error) {
            res.status(500).json({ error: err.message });
            return
        }
        // Handle cases where `err` is not an instance of Error
        res.status(500).json({ error: "An unexpected error occurred" });
        return 
    }
}

export async function markedTask(req: Request, res: Response):Promise<void> {
    try {
        let user = req.user as { username: string, _id: string }
        let todoId = req.params.todoId

        if(!todoId){
            res.status(412).json({error: "invalid data"})
            return
        }

        let {error , data} = await todoService.markedTask({
            user,
            todoId
        })

        if (error || !data) {
            res.status(error?.status ?? 500).json({error: error?.message})
            return
        }

        res.status(200).json(data)
        return
        
    } catch (err) {
        console.log("Error in controller -> user -> function {markedTask} >>> error: ", err)
        if (err instanceof Error) {
            res.status(500).json({ error: err.message });
            return
        }
        // Handle cases where `err` is not an instance of Error
        res.status(500).json({ error: "An unexpected error occurred" });
        return 
    }
}

export async function unMarkedTask(req: Request, res: Response):Promise<void> {
    try {
        let user = req.user as { username: string, _id: string }
        let todoId = req.params.todoId

        if(!todoId){
            res.status(412).json({error: "invalid data"})
            return
        }

        let {error , data} = await todoService.unMarkedTask({
            user,
            todoId
        })

        if (error || !data) {
            res.status(error?.status ?? 500).json({error: error?.message})
            return
        }

        res.status(200).json(data)
        return
        
    } catch (err) {
        console.log("Error in controller -> user -> function {unMarkedTask} >>> error: ", err)
        if (err instanceof Error) {
            res.status(500).json({ error: err.message });
            return
        }
        // Handle cases where `err` is not an instance of Error
        res.status(500).json({ error: "An unexpected error occurred" });
        return 
    }
}

export async function getTodoList(req: Request, res: Response):Promise<void> {
    try{
        let {date, month, year} = req.query as {date: string | undefined , month : string | undefined , year : string | undefined}
        let user = req.user as { username: string, _id: string }

        if((date && !parseInt(date)) || (year && !parseInt(year)) || (month && !parseInt(month))) {
            res.status(412).json({error: "invalid data"})
            return
        }

        let data = await todoService.getTodoList({
            user,
            date : Number(date) || (new Date().getDate()),
            year : Number(year) || (new Date().getFullYear()),
            month : Number(month) || (new Date().getMonth()+1),
        })

        res.status(200).json(data)
        return
    }catch(err){
        console.log("Error in controller -> user -> function {getTodoList} >>> error: ", err)
        if (err instanceof Error) {
            res.status(500).json({ error: err.message });
            return
        }
        // Handle cases where `err` is not an instance of Error
        res.status(500).json({ error: "An unexpected error occurred" });
        return
    }
}