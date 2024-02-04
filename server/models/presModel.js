import mongoose from "mongoose";

const presSchema = new mongoose.Schema(
    {
        name: [String],
        image: String,
        user:{
            type: mongoose.Schema.ObjectId,
            default: "user",
        },
        info: String
    },
    {
        timestamps: true
    }
)

export default mongoose.model("Pres", presSchema);