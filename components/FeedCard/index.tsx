import Image from "next/image";
import { AiOutlineHeart } from "react-icons/ai";
import { BiMessageRounded, BiUpload } from "react-icons/bi";
import { FaRetweet } from "react-icons/fa";
import { Tweet } from "@/gql/graphql";

interface FeedCardProps {
  data: Tweet;
}

export function FeedCard({ data }: FeedCardProps) {
  return (
    <div className="border border-l-0 border-r-0 border-b-0 border-gray-600 p-4 hover:bg-slate-900 transition-all cursor-pointer">
      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-1">
          {data.author?.profileImageURL && (
            <Image
              src={data.author?.profileImageURL}
              alt="userimage"
              className="rounded-full"
              height={30}
              width={30}
            />
          )}
        </div>
        <div className="col-span-11">
          <h5>{data.author?.firstName + " " + data.author?.lastName}</h5>
          <p>
            {data.content}
          </p>
          <div className="flex justify-between mt-5 text-xl items-center p-2 w-[90%]">
            <div>
              <BiMessageRounded />
            </div>
            <div>
              <FaRetweet />
            </div>
            <div>
              <AiOutlineHeart />
            </div>
            <div>
              <BiUpload />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
