"use client";
import { useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import axios from "axios";
import UserProfilePosts from "../../../components/UserProfilePosts";
import Logout from "../../../components/Logout";
import { getAuthContext } from "@/AuthContext/AuthContextProvider";
import useGetCurrentUserPost from "@/hooks/useGetCurrentUserPost";

const page = ({ params }) => {
  const {user} = getAuthContext();
  const {userId} = React.use(params);
  const {refetchCurrentUserPostVoteAndBoycott} = useGetCurrentUserPost(userId);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm();
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState("");
  const fetchLocation = () =>{
    navigator.geolocation.getCurrentPosition( async(position) =>{
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`);
      const data = await res.json();
      const place = data?.address?.city || data?.address?.town || data?.address?.state || data?.address?.country || "Unknown";
      setLocation(place);
    }, (error) =>{
      console.log(`Location not found ${error}`);
      setLocation("Unknown");
    })
  }
  useEffect( () =>{
    fetchLocation();
  }, [])
  // console.log(location);
  const onSubmit = async(data) => {
    // fetchLocation();
    const title = data.title;
    const description = data.description;
    await axios.post('/api/createPost', {
        userId,
        title,
        description,
        image,
        location
      })
      .then(res =>{
        refetchCurrentUserPostVoteAndBoycott();
        // isLoading();
        console.log(res.data.message);
      })
  };
  const watchImageChanged = watch("image");
  useEffect( () =>{
    const imageFile = watchImageChanged?.[0];
    if(!imageFile) return;
    const reader = new FileReader();
    reader.readAsDataURL(imageFile);

    reader.onload = () =>{
      // console.log(reader.result);
      setImage(reader.result);
    };
  }, [watchImageChanged])
  return (
    <>
    <title>user profile</title>
    <div>
      {
        user?.uid == userId 
        ?
        <div>
          <Logout></Logout>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label>Title</label>
          <input
            {...register("title")}
            className="w-full p-2 border rounded"
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>
        <div>
          <label>Description</label>
          <textarea
            {...register("description")}
            className="w-full p-2 border rounded"
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>

        <div>
          <label>Image</label>
          <input
            type="file"
            {...register("image", { required: "Image is required" })}
            className="w-full p-2 border rounded"
          />
          {errors.image && (
            <p className="text-red-500 text-sm">{errors.image.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
          </form>
          <UserProfilePosts></UserProfilePosts>
        </div>:
        <UserProfilePosts></UserProfilePosts>
      }
    </div>
    </>
  );
};

export default page;
