import { NextResponse } from "next/server";
import connectDb from "../../../../../../utils/connectDb";
import Post from "../../../../../../libs/models/post.model";

export const POST = async(request, {params}) =>{
    await connectDb();
    try {
        const {postId} = await params;
        const {uid} = await request.json();
        // console.log("hited uid",uid, postId);
        const post = await Post.findById(postId);
        if(!post){
            return NextResponse.json({message: "Post not found"}, {status: 404});
        }
        if(post.boycott.includes(uid)){
            return NextResponse.json({message: true}, {status: 200});
        }
        return NextResponse.json({message: false}, {status: 200});
    } catch (error) {
        console.log(error);
        return NextResponse.json({message: "Internal server error"}, {status: 500});
    }
}