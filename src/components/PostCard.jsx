import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { GrLike, GrDislike } from "react-icons/gr";
import { GoCommentDiscussion } from "react-icons/go";
import { useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import { VscSend } from "react-icons/vsc";

const PostCard = ({ post }) => {
  const { title, description, image, createdAt, location, userId } = post;
  const date = moment(createdAt).format("dddd YYYY");
  const [openComment, setOpenComment] = useState(false);

  const handleSendComment = (e) =>{
    e.preventDefault();
    const comment = e.target.comment.value;
    console.log(comment)
  }
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
      <div className="mt-3">
        {!openComment ? (
          <div className="text-xl flex justify-center items-center gap-[100px] px-16">
            <div className="flex flex-col items-center">
              <p className="text-sm">32 person votes</p>
              <button className="cursor-pointer">
                <GrLike></GrLike>
              </button>
            </div>
            <div>
              <button onClick={() => setOpenComment(true)} className="cursor-pointer">
                <GoCommentDiscussion className="text-2xl"></GoCommentDiscussion>
              </button>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-sm">32 person boycott</p>
              <button className="cursor-pointer">
                <GrDislike></GrDislike>
              </button>
            </div>
          </div>
        ) : (
          <div className="min-h-[200px] border border-slate-400 rounded-xl w-full p-2 bg-slate-100">
            <div className="flex w-full justify-end">
              <button onClick={() => setOpenComment(false)} className="cursor-pointer">
                <IoCloseCircleOutline className="text-xl"></IoCloseCircleOutline>
              </button>
            </div>
            <div className="flex justify-center">
              <form onSubmit={handleSendComment} className="w-1/2 relative h-full">
                <input
                  type="text"
                  placeholder="write your opinion..."
                  name="comment"
                  className="appearance-none outline-none border border-blue-500 w-full rounded-sm  px-5 py-1 text-sm"
                />
                <button type="submit" className="absolute inset-y-0 right-2 cursor-pointer hover:text-[17px] text-blue-600">
                    <VscSend></VscSend>
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostCard;
