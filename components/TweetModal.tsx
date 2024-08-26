"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useCurrentUser } from "@/hooks/user";
import { BsImage } from "react-icons/bs";
import { useCallback } from "react";
import { useCreateTweet } from "@/hooks/tweet";

export const TweetModal = () => {
  const { user } = useCurrentUser();
  const [content, setContent] = useState("");
  const { mutate } = useCreateTweet();

  const handleSelectImage = useCallback(() => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.click();
  }, []);

  const handlePostTweet = useCallback(() => { 
    mutate({
      content,
    });
  }, [content, mutate]);

  return (
    <section className="grid grid-cols-12 grid-rows-4  h-48 border-b-[0.5px] border-b-gray-800 p-4 gap-2">
      {user?.profileImageURL && (
        <Image
          src={user?.profileImageURL}
          width={70}
          height={70}
          alt={"profile image"}
          className="col-span-1 row-span-4 rounded-full"
        />
      )}
      <div className="flex flex-col col-span-11 row-span-3 gap-2 border-b border-b-gray-800 p-2">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's happening?"
          className="bg-black px-3 text-xl"
          rows={4}
        />
      </div>
      <div className="col-span-11 flex justify-between">
        <div className="flex gap-4 text-xl p-2 font-bold">
          <BsImage onClick={handleSelectImage} className="cursor-pointer" />
        </div>
        <button onClick={handlePostTweet} className="w-16 font-semibold bg-blue-500 rounded-full">
          Post
        </button>
      </div>
    </section>
  );
};
