import { NextResponse } from "next/server";
import connectDb from "../../../../../../utils/connectDb.ts";
import Post from "../../../../../../libs/models/post.model";

export const POST = async(request, {params}) =>{
    await connectDb();
    try {
        const {uid} = await params;
        const {postId} = await request.json();
        console.log(uid, postId);
        const post = await Post.findById(postId);
        if(!post){
            return NextResponse.json({message: "Post not found"}, {status: 404});
        }
        if(post.votes.includes(uid)){
            return NextResponse.json({message: "Alreay voted"}, {status: 409});
        }
        post.votes.push(uid);
        post.save();
        return NextResponse.json({message: "vote added"}, {status: 200});
    } catch (error) {
        console.log(error);
        return NextResponse.json({message: "Cann't add vot"}, {status: 400});
    }
}