"use client";

import Spinner from "@/app/components/Spinner";
import { signIn } from "next-auth/react";
import Image from "next/image";
import React, { useState } from "react";

const SignInPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      if (username.length <= 3 || password.length <= 3) {
        setError("Username and password are required!");
        return;
      }

      setLoading(true);

      const result = await signIn("credentials", {
        username,
        password,
        redirect: true,
        callbackUrl: "/",
      });
    } catch (error) {
      setLoading(false);
      setError("Something went wrong");
    }
  };

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="h-screen flex flex-col p-5 items-center  overflow-auto"
    >
      <Image src="/logo.png" width={60} height={60} alt="Logo" />

      <div className="w-full flex flex-col my-6">
        <p className="text-sm my-2 font-bold">Username</p>
        <input
          placeholder="Enter your username"
          type="text"
          className="border p-3 rounded-md outline-none"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div className="w-full flex flex-col">
        <p className="text-sm my-2 font-bold">Password</p>
        <input
          placeholder="Enter your password"
          type="password"
          className="border p-3 rounded-md outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button
        type="submit"
        disabled={loading || username.length <= 3 || password.length <= 3}
        className={`p-4 ${
          loading || username.length <= 3 || password.length <= 3
            ? "bg-neutral-200 text-white"
            : "bg-yellow-400"
        }  w-full rounded-full mt-10 font-medium flex items-center justify-center`}
      >
        {loading ? <Spinner /> : "Sign In "}
      </button>
    </form>
  );
};

export default SignInPage;
