import mongoose from "mongoose";
import config from "config"

export async function connectDb(){
    try{
        
        // connect with mongodb
        await mongoose.connect(config.get("mongoDb.url"))

        console.log(">>> database connected <<< ")
    }catch(err){
        console.log("Error in connecting to database", err);
        throw err
    }
}