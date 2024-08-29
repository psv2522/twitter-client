"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useCurrentUser } from "@/hooks/user";
import { BsImage } from "react-icons/bs";
import { useCallback } from "react";
import { useCreateTweet } from "@/hooks/tweet";
import { getSignedUrlForTweetQuery } from "@/graphql/query/tweet";
import { graphqlClient } from "@/clients/api";
import axios from "axios";
import toast from "react-hot-toast";

export const TweetModal = () => {
  const { user } = useCurrentUser();
  const [content, setContent] = useState("");
  const [imageURL, setImageURL] = useState<string | null>(null);
  const { mutate } = useCreateTweet();

  const handleInputChangeFile = useCallback((input: HTMLInputElement) => {
    return async (event: Event) => {
      event.preventDefault();

      const file: File | null | undefined = input.files?.item(0);

      if (!file) return;

      const { getSignedUrlForTweet } = await graphqlClient.request(
        getSignedUrlForTweetQuery,
        {
          imageType: file.type,
          imageName: file.name,
        }
      );

      if (getSignedUrlForTweet) {
        toast.loading("Uploading image...", { id: "2" });
        console.log(getSignedUrlForTweet);
        await axios.put(getSignedUrlForTweet, file, {
          headers: {
            "Content-Type": file.type,
          },
        });

        toast.success("Image uploaded successfully", { id: "2" });

        const url = new URL(getSignedUrlForTweet);
        const myFilePath = `${url.origin}${url.pathname}`;

        setImageURL(myFilePath);
      }
    };
  }, []);

  const handleSelectImage = useCallback(() => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    const handlerFn = handleInputChangeFile(input);

    input.addEventListener("change", handlerFn);

    input.click();
  }, [handleInputChangeFile]);

  const handlePostTweet = useCallback(() => {
    mutate({
      content,
      imageURL,
    });
    setContent("");
    setImageURL(null);
  }, [content, mutate, imageURL]);

  if (!user) return null;
  return (
    <section className="grid grid-cols-12 h-auto border-b-[0.5px] border-b-gray-800 p-4 gap-2">
      {user?.profileImageURL && (
        <Image
          src={user?.profileImageURL}
          width={70}
          height={70}
          alt={"profile image"}
          className="col-span-1 rounded-full"
        />
      )}
      <div className="flex flex-col col-span-11 gap-2 p-2">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's happening?"
          className="bg-black px-3 text-xl"
          rows={3}
        />
        {imageURL && (
          <Image
            src={imageURL}
            width={300}
            height={300}
            alt={"image"}
            className="mb-2"
          />
        )}
        <div className="flex justify-between items-center">
          <div className="flex gap-4 text-xl font-bold">
            <BsImage onClick={handleSelectImage} className="cursor-pointer" />
          </div>
          <button
            onClick={handlePostTweet}
            className="w-16 font-semibold bg-blue-500 rounded-full py-1"
          >
            Post
          </button>
        </div>
      </div>
    </section>
  );
};
