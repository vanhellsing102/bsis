import { NextResponse } from "next/server";
import Post from "../../../../../../libs/models/post.model";
import connectDb from "../../../../../../utils/connectDb";

export const POST = async(request, {params}) =>{
    await connectDb();
    try {
        const {uid} = await params;
        const {postId} = await request.json();
        const post = await Post.findById(postId);
        if(!post){
            return NextResponse.json({message: "post not found"}, {status: 204});
        }
        if(post.boycott.includes(uid)){
            return NextResponse.json({message: "already added boycott"}, {status: 409});
        }
        if(post.votes.includes(uid)){
            post.boycott.push(uid);
            post.save();
            await post.updateOne(
                {$pull: {votes: uid}}
            )
            return NextResponse.json({message: "boycott add and vot removed"}, {status: 200});
        }
        post.boycott.push(uid);
        post.save();
        return NextResponse.json({message: "boycott added"}, {status: 200});
        // console.log(uid, postId);
    } catch (error) {
        console.log(error);
        return NextResponse.json({message: "Internal server error"}, {status: 500});
    }
}