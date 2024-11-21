import mongoose from "mongoose";
const Schema = mongoose.Schema;
const model = mongoose.model;


const TodoSchema = new Schema({
    userId : {
        type: Schema.Types.ObjectId,
        ref : "User",
        required: true
    },
    title : {
        type: String,
        require : true
    },
    description : {
        type: String,
        require : true
    },
    dueDate : {
        type: Date,
        require : true
    },
    status : {
        type: String,
        enum: ["pending", "completed"],
        default: "pending"
    },
    completedAt : {
        type: Date
    },
    reminderTime : {
        type: Date
    }
},{
    timestamps: true
})

const Todo = model("Todo", TodoSchema);

export default Todo;