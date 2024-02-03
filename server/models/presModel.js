import mongoose from "mongoose";

const presSchema = new mongoose.Schema(
    {
        name: [String],
        user:{
            type: String,
            default: "user",
        },
    },
    {
        timestamps: true
    }
)

export default mongoose.model("Pres", presSchema);