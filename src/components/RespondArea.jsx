import { getAuthContext } from "@/AuthContext/AuthContextProvider";
import axios from "axios";
import React, { useState } from "react";
import { GoCommentDiscussion } from "react-icons/go";
import { IoCloseCircleOutline } from "react-icons/io5";
import { VscSend } from "react-icons/vsc";
import { BiDislike, BiLike, BiSolidDislike, BiSolidLike } from "react-icons/bi";
import useGetVotedId from "../hooks/GetRespondData/useGetVotedId";
import useGetBoycottedId from "../hooks/GetRespondData/useGetBoycottedId";
import useGetAllPost from "@/hooks/useGetAllPost";
import useGetCurrentUserPost from "@/hooks/useGetCurrentUserPost";
import Opinion from "./Opinion";

const RespondArea = ({postId, votes, boycott, opinion}) => {
    const [openComment, setOpenComment] = useState(false);
    const {user} = getAuthContext();
    const {isVoted, refetchVote} = useGetVotedId(postId);
    const {isBoycott, refetchBoycott} = useGetBoycottedId(postId);
    const {refetchVotesAndBoycott} = useGetAllPost();
    const {refetchCurrentUserPostVoteAndBoycott} = useGetCurrentUserPost();
    const [loading, setLoading] = useState(false);      
    const [loadingBoycott, setLoadingBoycott] = useState(false);      
    // console.log(isBoycott);

  const handleSendComment = (e) => {
    e.preventDefault();
    setLoading(true);
    const userId = user?.uid;
    if(!userId) return;
    const text = e.target.comment.value;
    const newComment = {
      userId, postId, text
    }
    axios.post('/api/post/addComment', newComment)
    .then(res =>{
      console.log(res.data);
      refetchVotesAndBoycott();
      refetchCurrentUserPostVoteAndBoycott();
      e.target.reset();
      setLoading(false);
    })
    console.log(text);
  };
  const handleVote = (uid) =>{
      // console.log(`vote from ${uid}`);
      setLoading(true);
      isVoted 
      ?
      axios.post(`/api/post/removeVotes/${uid}`, {postId})
      .then(res =>{
        console.log(res.data.message);
        refetchVote();
        refetchBoycott();
        refetchVotesAndBoycott();
        refetchCurrentUserPostVoteAndBoycott();
        setLoading(false);
      })
      :
      axios.post(`/api/post/addVotes/${uid}`, {postId})
      .then(res =>{
        console.log(res.data);
        refetchVote();
        refetchBoycott();
        refetchVotesAndBoycott();
        refetchCurrentUserPostVoteAndBoycott();
        setLoading(false);
      })
  }
  const handleBoycott = (uid) =>{
    // console.log(`boycott from ${uid}`);
    setLoadingBoycott(true);
    isBoycott 
    ?
    axios.post(`/api/post/removeBoycott/${uid}`, {postId})
    .then(res =>{
      console.log(res.data);
      refetchVote();
      refetchBoycott();
      refetchVotesAndBoycott();
      refetchCurrentUserPostVoteAndBoycott();
      setLoadingBoycott(false);
    })
    :
    axios.post(`/api/post/addBoycott/${uid}`, {postId})
    .then(res =>{
      console.log(res.data);
      refetchVote();
      refetchBoycott();
      refetchVotesAndBoycott();
      refetchCurrentUserPostVoteAndBoycott();
      setLoadingBoycott(false);
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
                loading ? <span className="loading loading-ball loading-xs"></span> :
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
                loadingBoycott ? <span className="loading loading-ball loading-xs"></span> :
                isBoycott ? <BiSolidDislike className="text-2xl"></BiSolidDislike> : <BiDislike className="text-2xl"></BiDislike>
              }
            </button>
          </div>
        </div>
      ) : (
        <div className="h-[200px] overflow-y-scroll border border-slate-400 rounded-xl w-full p-2 bg-slate-100">
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
                required
              />
              <button
                type="submit"
                className="absolute inset-y-0 right-2 cursor-pointer hover:text-[17px] text-blue-600"
              >
                {
                  loading ? <span className="loading loading-spinner text-info loading-sm"></span> : <VscSend></VscSend>
                }
              </button>
            </form>
          </div>
          <div className="mt-3 space-y-2">
            {
              opinion.length > 0 &&
              [...opinion].reverse().map(opi =><Opinion key={opi?._id} opi={opi}></Opinion>)
            }
          </div>         
        </div>
      )}
    </div>
  );
};

export default RespondArea;
