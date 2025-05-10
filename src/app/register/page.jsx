"use client";
import { getAuthContext } from "@/AuthContext/AuthContextProvider";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";

const Register = () => {
  const {createUser, updateProfileName, user} = getAuthContext();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const name = data.name;
    const email = data.email;
    const password = data.password;
    const confirmPassword = data.confirmPassword;
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    createUser(email, password)
    .then(userCredential =>{
      const user = userCredential.user;
      console.log(user);
      updateProfileName(name)
      .then(() =>console.log("updated name"))
      .catch(error=> console.log(error));
    })
    .catch(error =>{
      console.log(error);
    })
  };
  user && redirect(`/u/${user?.uid}`);
  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label>Name</label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            className="w-full p-2 border rounded"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

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
            {...register("password", {
              required: "Password is required",
              minLength: 6,
            })}
            className="w-full p-2 border rounded"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        <div>
          <label>Confirm Password</label>
          <input
            type="password"
            {...register("confirmPassword", {
              required: "Please confirm your password",
            })}
            className="w-full p-2 border rounded"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 cursor-pointer text-white py-2 rounded hover:bg-green-600"
        >
          Register
        </button>
      </form>
      <p className="mt-1">Don't have an account? <Link href={"/login"} className="text-red-400">Login</Link></p>
    </div>
  );
};

export default Register;
