import { NextResponse } from "next/server";
import Post from "../../../../../libs/models/post.model";

export const POST = async(request) =>{
    try {
        const {userId, postId, text} = await request.json();
        // console.log(userId, postId, comment);
        const post = await Post.findById(postId);
        if(!post){
            return NextResponse.json({message: "Post not found"}, {status: 404});
        }
        post.opinion.push({userId, text});
        post.save();
        return NextResponse.json({message: "comment succesfully"}, {status: 200});
    } catch (error) {
        console.log(error);
        return NextResponse.json({message: "client side error"}, {status: 400})
    }
}