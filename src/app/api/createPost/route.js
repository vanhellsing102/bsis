import { NextResponse } from "next/server";
import Post from "../../../../libs/models/post.model";
import connectDb from '../../../../utils/connectDb.ts';

export const POST = async(request) =>{
    try {
        await connectDb();
        const newPost = await request.json();
        // console.log(newPost);
        await Post.create(newPost);
        return NextResponse.json({message: "Posted Successfully"}, {status: 200});
    } catch (error) {
        console.log(error);
        return NextResponse.json({message: "Cann't create post"}, {status: 301});
    }
}