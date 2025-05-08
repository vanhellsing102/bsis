import { NextResponse } from "next/server";
import connectDb from "../../../../../../utils/connectDb.ts";
import Post from "../../../../../../libs/models/post.model.js";

export const GET = async(request, {params}) =>{
    await connectDb();
    try {
        const {userId} = await params;
        console.log(userId);
        const posts = await Post.find({userId});
        return NextResponse.json(posts, {status: 200});
    } catch (error) {
        console.log(error);
        return NextResponse.json({message: "post not found"}, {status: 404});
    }
}