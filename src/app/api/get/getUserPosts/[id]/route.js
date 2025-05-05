import { NextResponse } from "next/server";
import connectDb from "../../../../../../utils/connectDb.ts";
import Post from "../../../../../../libs/models/post.model.js";

export const GET = async(request, {params}) =>{
    try {
        await connectDb();
        const userId = params.id;
        // console.log(userId);
        const posts = await Post.find({userId}).sort({createdAt: -1});
        return NextResponse.json(posts, {status: 200});
    } catch (error) {
        console.log(error);
        return NextResponse.json({message: "post not found"}, {status: 404});
    }
}