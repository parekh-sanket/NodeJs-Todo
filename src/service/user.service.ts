import User from "../database/models/User.model"
import {userRegistrationResponse, userLoginResponse, userLoginPayload, editUserServiceParams} from "../types/user.type"
import bcrypt from "bcrypt"
import config from "config"
import { userRegistrationPayload } from "../types/user.type"


export async function userRegistration({username, password}: userRegistrationPayload):Promise<userRegistrationResponse> {
    try {

        // cheack is user already exist or not
        let existUser = await User.findOne({username})
        if (existUser) {
            return {
                error : {
                    message: "User already exist",
                    status: 409,
                }
            }
        }

        // encrypt user password
        let hashedPassword = await bcrypt.hash(password, config.get("secret.saltRounds"))

        // create user
        let user = await User.create({
            username,
            password : hashedPassword
        })

        return {
            data : {
                username: user.username,
                _id : user._id.toString()
            }
        }
    } catch (err: unknown) {
        console.log("Error in service -> user -> function {userRegistration} >>> error: ", err)
        throw err
    }
}

export async function userLogin({username, password}: userLoginPayload):Promise<userLoginResponse> {
    try {
        // find user
        let existUser = await User.findOne({username})
        if (!existUser) {
            return {
                error : {
                    message: "User not found",
                    status: 404,
                }
            }
        }

        // match passowrd
        const match = await bcrypt.compare(password, existUser.password);
        if(!match) {
            return {
                error : {
                    message: "Invalid password",
                    status: 401,
                }
            }
        }

        return {
            data : {
                _id : existUser._id.toString(),
                username : existUser.username
            }
        }
    } catch (err: unknown) {
        console.log("Error in service -> user -> function {userLogin} >>> error: ", err)
        throw err
    }
}

export async function edituserDetail({
    user,
    email
} : editUserServiceParams) {
    try{

        // update user in database
        await User.findByIdAndUpdate(user._id , {
            email
        })

        return {
            data : {
                message : "Email updated successfully"
            }
        }
    }catch(err){
        console.log("Error in service -> user -> function {edituserDetail} >>> error: ", err)
        throw err
    }
}
