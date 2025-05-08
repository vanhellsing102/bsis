import { NextResponse } from "next/server"
import connectDb from "../../../../../../utils/connectDb";
import Post from "../../../../../../libs/models/post.model";

export const POST = async(request, {params}) =>{
    await connectDb();
    try {
        const {postId} = await params;
        const {userId} = await request.json();
        const post = await Post.findById(postId);
        if(!post){
            return NextResponse.json({message: "Post not found"}, {status: 404});
        }
        if(post.votes.includes(userId)){
            return NextResponse.json({postId: post._id, status: true}, {status: 200});
        }
        return NextResponse.json({postId: post._id, status: false}, {status: 200});
        // console.log("userid", userId, postId);
        // return NextResponse.json({message: "adfdafd"}, {status: 200});
    } catch (error) {
        console.log(error)
        return NextResponse.json({message: "internal server error"}, {status: 500});
    }
}