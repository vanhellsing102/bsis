import { getAuthContext } from "@/AuthContext/AuthContextProvider";
import axios from "axios";
import React, { useState } from "react";
import { GoCommentDiscussion } from "react-icons/go";
import { IoCloseCircleOutline } from "react-icons/io5";
import { VscSend } from "react-icons/vsc";
import { BiDislike, BiLike, BiSolidDislike, BiSolidLike } from "react-icons/bi";
import useGetVotedId from "../hooks/GetRespondData/useGetVotedId";
import useGetBoycottedId from "../hooks/GetRespondData/useGetBoycottedId";

const RespondArea = ({postId, votes, boycott}) => {
    const [openComment, setOpenComment] = useState(false);
    const {user} = getAuthContext();
    const {isVoted, refetch, } = useGetVotedId(postId);
    const {isBoycott, ref} = useGetBoycottedId(postId);
    // console.log(isBoycott);

  const handleSendComment = (e) => {
    e.preventDefault();
    const comment = e.target.comment.value;
    // console.log(comment);
  };
  const handleVote = (uid) =>{
      // console.log(`vote from ${uid}`);
      isVoted 
      ?
      axios.post(`/api/post/removeVotes/${uid}`, {postId})
      .then(res =>{
        console.log(res.data.message);
        refetch();
      })
      :
      axios.post(`/api/post/addVotes/${uid}`, {postId})
      .then(res =>{
        console.log(res.data);
        refetch();
      })
  }
  const handleBoycott = (uid) =>{
    console.log(`boycott from ${uid}`);
    isBoycott 
    ?
    axios.post(`/api/post/removeBoycott/${uid}`, {postId})
    .then(res =>{
      console.log(res.data);
      ref();
    })
    :
    axios.post(`/api/post/addBoycott/${uid}`, {postId})
    .then(res =>{
      console.log(res.data);
      ref();
    })
  }
  return (
    <div className="mt-3">
      {!openComment ? (
        <div className="text-xl flex justify-center items-center gap-[100px] px-16">
          <div className="flex flex-col items-center">
            <p className="text-sm">{votes.length} person votes</p>
            <button
              onClick={() =>handleVote(user?.uid)}
              className="cursor-pointer"
            >
              {
                isVoted ? <BiSolidLike className="text-2xl"></BiSolidLike> : <BiLike className="text-2xl"></BiLike>
              }
            </button>
          </div>
          <div>
            <button
              onClick={() => setOpenComment(true)}
              className="cursor-pointer"
            >
              <GoCommentDiscussion className="text-2xl"></GoCommentDiscussion>
            </button>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-sm">{boycott.length} person boycott</p>
            <button
              onClick={() => handleBoycott(user?.uid)}
              className="cursor-pointer"
            >
              {
                isBoycott ? <BiSolidDislike className="text-2xl"></BiSolidDislike> : <BiDislike className="text-2xl"></BiDislike>
              }
            </button>
          </div>
        </div>
      ) : (
        <div className="min-h-[200px] border border-slate-400 rounded-xl w-full p-2 bg-slate-100">
          <div className="flex w-full justify-end">
            <button
              onClick={() => setOpenComment(false)}
              className="cursor-pointer"
            >
              <IoCloseCircleOutline className="text-xl"></IoCloseCircleOutline>
            </button>
          </div>
          <div className="flex justify-center">
            <form
              onSubmit={handleSendComment}
              className="w-1/2 relative h-full"
            >
              <input
                type="text"
                placeholder="write your opinion..."
                name="comment"
                className="appearance-none outline-none border border-blue-500 w-full rounded-sm  px-5 py-1 text-sm"
              />
              <button
                type="submit"
                className="absolute inset-y-0 right-2 cursor-pointer hover:text-[17px] text-blue-600"
              >
                <VscSend></VscSend>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RespondArea;
