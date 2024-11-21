import mongoose from "mongoose";
const Schema = mongoose.Schema;
const model = mongoose.model;

export interface UserDocument extends Document {
    username: string;
    email: string;
    password: string;
}

const UserSchema = new Schema<UserDocument>({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String
    },
    password: {
        type: String,
        required: true
    }
},{
    timestamps: true
})

const User = model<UserDocument>("User", UserSchema);

export default User;