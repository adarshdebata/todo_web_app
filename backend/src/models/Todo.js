//model.js
import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            default: "",
            trim: true
        },
        completed: {
            type: Boolean,
            default: false
        },
        deadline: { type: Date }, 
        priority: {
            type: String,
            enum: ["Highest", "High", "Mid", "Low"], 
            default: "Mid",
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
    },
    { timestamps: true }
);

export default mongoose.model("Todo", TodoSchema);
