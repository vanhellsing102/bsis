import { NextResponse } from "next/server";
import Post from "../../../../../../libs/models/post.model";
import connectDb from "../../../../../../utils/connectDb";

export const POST = async(request, {params}) =>{
    await connectDb();
    try {
        const {uid} = await params;
        const {postId} = await request.json();
        console.log(uid, postId);
        await Post.updateOne(
            {_id: postId},
            {$pull: {votes: uid}}
        )
        return NextResponse.json({message: "vot removed"}, {status: 200});
    } catch (error) {
        console.log(error);
        return NextResponse.json({message: "Cann't remove vot"}, {status: 400});
    }
}