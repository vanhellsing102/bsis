"use client";
import { useForm } from "react-hook-form";
import { getAuthContext } from "@/AuthContext/AuthContextProvider";
import { redirect } from "next/navigation";

export default function LoginPage() {
  const {loginUser, user} = getAuthContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;
    loginUser(email, password)
    .then(userCredential =>{
      const user = userCredential.user;
      // console.log(user);
    })
    .catch(error =>{
      console.log(error);
    })
    // console.log(email, password)
  };
  user && redirect(`/u/${user?.uid}`);
  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label>Email</label>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            className="w-full p-2 border rounded"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            {...register("password", { required: "Password is required" })}
            className="w-full p-2 border rounded"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 cursor-pointer text-white py-2 rounded hover:bg-green-600"
        >
          Login
        </button>
      </form>
    </div>
  );
}
