import { NextResponse } from "next/server";
import connectDb from "../../../../../utils/connectDb.ts";

export const GET = async() =>{
    try {
        await connectDb();
    } catch (error) {
        console.log(error);
        return NextResponse.json({message: "post not found"}, {status: 404});
    }
}