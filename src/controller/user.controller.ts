import {Request, Response} from "express" 
import * as userService from "../service/user.service"
import * as common from "../lib/common"

export async function userRegistration(req: Request, res: Response):Promise<void> {
    try {
        let { username, password }: { username: string, password: string } = req.body

        if(!username || !password) {
            res.json({error: "invalid data"}).status(412)
        }

        let { data, error } = await userService.userRegistration({
            username, 
            password
        })

        if (error || !data) {
            res.status(error?.status ?? 500).json({error: error?.message})
            return
        }
        
        res.setHeader("Authorization", "Bearer " + common.encodeJWT({_id : data._id}))
        res.status(200).json(data)
        return
        
    } catch (err) {
        console.log("Error in controller -> user -> function {userRegistration} >>> error: ", err)
        if (err instanceof Error) {
            res.status(500).json({ error: err.message });
            return
        }
        // Handle cases where `err` is not an instance of Error
        res.status(500).json({ error: "An unexpected error occurred" });
        return 
    }
}

export async function userLogin(req: Request, res: Response):Promise<void> {
    try {
        let { username, password }: { username: string, password: string } = req.body

        if(!username || !password) {
            res.json({error: "invalid data"}).status(412)
        }

        let { data, error } = await userService.userLogin({
            username, 
            password
        })

        if (error || !data) {
            res.status(error?.status ?? 500).json({error: error?.message})
            return
        }
        
        res.setHeader("Authorization", "Bearer " + common.encodeJWT({_id : data._id}))
        res.status(200).json(data)
        return
        
    } catch (err) {
        console.log("Error in controller -> user -> function {userLogin} >>> error: ", err)
        if (err instanceof Error) {
            res.status(500).json({ error: err.message });
            return
        }
        // Handle cases where `err` is not an instance of Error
        res.status(500).json({ error: "An unexpected error occurred" });
        return 
    }
}

export async function edituserDetail(req: Request, res: Response) {
    try {

        let user = req.user as { username: string, _id: string }
        let { email }  = req.body

        if(!email || !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
            res.status(412).json({error: "invalid data"})
            return
        }

        let data = await userService.edituserDetail({
            user,
            email
        })

        res.status(200).json(data)
        return
        
    } catch (err) {
        console.log("Error in controller -> user -> function {userLogin} >>> error: ", err)
        if (err instanceof Error) {
            res.status(500).json({ error: err.message });
            return
        }
        // Handle cases where `err` is not an instance of Error
        res.status(500).json({ error: "An unexpected error occurred" });
        return 
    }
}