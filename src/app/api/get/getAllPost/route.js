import { NextResponse } from "next/server"
import Post from "../../../../../libs/models/post.model"
import connectDb from "../../../../../utils/connectDb";

export const GET = async() =>{
    await connectDb();
    try {
        // const {location} =await params;
        // console.log("recieved location", location);
        const allPost = await Post.find().sort({createdAt: -1});
        return NextResponse.json({allPost}, {status: 200});
    } catch (error) {
        return NextResponse.json({message: error}, {status: 404})
    }
}