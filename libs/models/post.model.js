import mongoose, { model, models } from "mongoose";

const PostSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true,
    },
    title:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    image:{
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true
    }
}, {timestamps: true}) 

const Post = models?.Post || model("Post", PostSchema);
export default Post;