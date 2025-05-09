import { NextResponse } from "next/server";
import connectDb from "../../../../../../utils/connectDb.ts";
import Post from "../../../../../../libs/models/post.model.js";

export const POST = async(request, {params}) =>{
    await connectDb();
    try {
        const {uid} = await params;
        const {postId} = await request.json();
        // console.log(uid, postId);
        await Post.updateOne(
            {_id: postId},
            {$pull: {boycott: uid}}
        )
        return NextResponse.json({message: "removed boycott"}, {status: 200});
    } catch (error) {
        console.log(error);
        return NextResponse.json({message: "internal server error"}, {status: 409})
    }
}