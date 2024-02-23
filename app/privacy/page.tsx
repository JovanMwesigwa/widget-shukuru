"use client";

import { Button } from "@/components/ui/button";
import { TiInfoOutline } from "react-icons/ti";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

import React, { useState } from "react";
import Image from "next/image";
import { APIURL } from "@/data/apiUrl";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const PrivacyPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const notifications = [
    {
      title: "All account balances and funds.",
      description: "App account",
    },
    {
      title: "All your transactions and payment history.",
      description: "App account",
    },
    {
      title: "All your security settings and Account keys.",
      description: "App account",
    },
  ];

  // Get the token from /next/auth
  const { data: session, status } = useSession();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      setLoading(true);
      // Delete account
      await fetch(APIURL + "/user/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user?.image}`,
        },
      });
      // Redirect to home page
      window.location.href = "/";
    } catch (error) {
      setLoading(false);
      setError("Something went wrong");
    }
  };

  if (status !== "authenticated") {
    // Redirect to home page using next router
    router.push("/");
  }

  return (
    <div className="flex flex-col flex-1 p-5">
      <div className="flex items-center justify-between w-full">
        <h1 className="text-sm font-bold md:text-xl">
          Manage my Account / Data
        </h1>
        <Image src="/logo.png" width={40} height={40} alt="Shukuru" />
      </div>

      <div className="flex items-center justify-center h-screen">
        <Card className={cn("w-[560px]")}>
          <CardHeader className="flex flex-col items-center justify-center">
            <div className="flex items-center justify-center w-16 h-16 text-white bg-red-500 rounded-full">
              <TiInfoOutline size={34} />
            </div>
            <CardTitle className="text-base md:text-lg">
              Are you sure you want to delete your account permanently?
            </CardTitle>
            <CardDescription className="text-xs md:text-sm">
              Press &rdquo;Delete account&rdquo; to remove it permanently or
              &rdquo;Cancel&rdquo; if you want to keep your benefits.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CardTitle className="mb-4 text-xs md:text-sm">
              By deleting your account, you will lose all your data and all the
              following:
            </CardTitle>
            <div>
              {notifications.map((notification, index) => (
                <div
                  key={index}
                  className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                >
                  <span className="flex w-2 h-2 translate-y-1 bg-red-500 rounded-full" />
                  <div className="space-y-1">
                    <p className="text-xs font-medium leading-none md:text-sm">
                      {notification.title}
                    </p>
                    <p className="text-xs md:text-sm text-muted-foreground">
                      {notification.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex flex-row items-center justify-between w-full">
            <Button
              disabled={loading}
              onClick={handleSubmit}
              className={`w-full mr-3 text-sm border md:text-base ${
                loading ? "bg-white text-white" : "bg-neutral-100"
              } text-neutral-800 hover:text-white`}
            >
              {loading ? "Deleting account..." : "Delete account"}
            </Button>
            <Button
              disabled={loading}
              className="w-1/2 ml-3 text-sm md:text-base"
            >
              Cancel
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default PrivacyPage;
