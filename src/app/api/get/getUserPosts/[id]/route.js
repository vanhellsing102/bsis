import { NextResponse } from "next/server";
import connectDb from "../../../../../../utils/connectDb.ts";
import Post from "../../../../../../libs/models/post.model.js";

export const GET = async(request, {params}) =>{
    await connectDb();
    try {
        const {id:userId} = await params
        // console.log("User Id : ",id);
        
        // const userId = request.url.split("/").pop();
        const posts = await Post.find({userId});
        return NextResponse.json(posts, {status: 200});
    } catch (error) {
        console.log("error =:" ,error);
        return NextResponse.json({message: "post not found"}, {status: 404});
    }
}