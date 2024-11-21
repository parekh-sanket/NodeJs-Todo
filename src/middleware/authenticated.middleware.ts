import {Request, Response, NextFunction} from "express"
import * as common from "../lib/common"
import User from "../database/models/User.model"

export async function isAuthenticated(req: Request, res: Response, next: NextFunction):Promise<void> {
    let token: string | undefined = req.header("Authorization")
    if (!token) {
        res.status(401).json({error: "Access denied"})
        return
    }

    try {
        token = token.split(" ")[1]
        const userId = common.decodeJWT(token)?._id
        if(!userId){
            res.status(401).json({error: "Access denied"})
            return
        }

        let user = await User.findById(userId)
        if(!user) {
            res.status(404).json({error: "User Not Found"})
            return
        }

        req.user = {
            username: user.username,
            _id : user._id.toString()
        } 

        next()
    } catch (error) {
        console.log("Error in middleware -> isAuthenticated -> function {isAuthenticated} >>> error: ", error)
        res.status(400).json({error: "Invalid token"})
        return
    }
}
