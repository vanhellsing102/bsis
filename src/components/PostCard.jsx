import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { GrLike, GrDislike } from "react-icons/gr";
import { GoCommentDiscussion } from "react-icons/go";
import { useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import { VscSend } from "react-icons/vsc";
import { getAuthContext } from "@/AuthContext/AuthContextProvider";
import RespondArea from "../components/RespondArea";

const PostCard = ({ post }) => {
  const { title, description, image, createdAt, location, _id, userId } = post;
  const date = moment(createdAt).format("dddd YYYY");

  return (
    <div className="p-3 border border-slate-500 rounded-lg">
      <div className="flex items-center gap-3">
        <Image
          className="w-10 h-10 rounded-full border border-blue-600"
          width={100}
          height={100}
          src={"/images/postcard/download.png"}
          alt="user porfile"
        ></Image>
        <div>
          <Link
            href={`/u/${userId}`}
            className="hover:underline underline-offset-2"
          >
            <h3 className="text-[17px] font-medium text-slate-800">Md Murad</h3>
          </Link>
          <p className="text-sm text-slate-500">
            <span>{date}</span>,
            <span className="text-slate-800"> {location}</span>
          </p>
        </div>
      </div>
      <h2 className="text-[17px] font-medium">
        Issue: <span className="text-slate-600">{title}</span>
      </h2>
      <p className="text-slate-800 text-[17px]">
        Details:{" "}
        <span className="text-[15px] text-slate-600">{description}</span>
      </p>
      <div className="flex items-center justify-center border-y mt-3 border-slate-500 py-2">
        <Image
          className="h-[180px] w-auto"
          width={100}
          height={100}
          alt="issue image"
          src={image}
        ></Image>
      </div>
      <RespondArea postId={_id}></RespondArea>
    </div>
  );
};

export default PostCard;
