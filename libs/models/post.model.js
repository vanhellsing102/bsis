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
    },
    votes: [
        {
            type: String
        }
    ],
    boycott: [
        {
            type: String,
        }
    ],
    opinion: [
        {
            userId: {
                type: String,
                required: true,
            },
            text: {
                type: String,
                required: true
            },
            userName: {
                type: String,
                required: true
            },
            createdAt: {
                type: Date,
                default: Date.now
            }
        }
    ]
}, {timestamps: true}) 

const Post = models?.Post || model("Post", PostSchema);
export default Post;