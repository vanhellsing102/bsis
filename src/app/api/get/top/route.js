import { NextResponse } from "next/server";
import connectDb from "../../../../../utils/connectDb.ts";
import Post from "../../../../../libs/models/post.model.js";

export const GET = async() =>{
    await connectDb();
    try {
        const posts = await Post.aggregate([
            {
                $addFields: {
                    voteCount: {$size: "$votes"}
                }
            },
            {
                $sort: {voteCount: -1}
            }
        ])
        return NextResponse.json(posts, {status: 200});
    } catch (error) {
        console.log(error);
        return NextResponse.json({message: "server error"}, {status: 500});
    }
}