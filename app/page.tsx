"use client";
import { FeedCard } from "@/components/FeedCard";
import { BiHomeCircle, BiHash, BiUser, BiMoney } from "react-icons/bi";
import { BsBell, BsBookmark, BsEnvelope, BsTwitter } from "react-icons/bs";
import { SlOptions } from "react-icons/sl";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { useCallback } from "react";

interface TwitterSidebarButton {
  title: string;
  icon: React.ReactNode;
}

const sidebarMenuItems: TwitterSidebarButton[] = [
  {
    title: "Home",
    icon: <BiHomeCircle />,
  },
  {
    title: "Explore",
    icon: <BiHash />,
  },
  {
    title: "Notifications",
    icon: <BsBell />,
  },
  {
    title: "Messages",
    icon: <BsEnvelope />,
  },
  {
    title: "Bookmarks",
    icon: <BsBookmark />,
  },
  {
    title: "Twitter Blue",
    icon: <BiMoney />,
  },
  {
    title: "Profile",
    icon: <BiUser />,
  },
  {
    title: "More",
    icon: <SlOptions />,
  },
];

export default function Home() {
  const handleLoginwithGoogle = useCallback((cred: CredentialResponse) => {
    
  },
  []);
  return (
    <div>
      <div className="grid grid-cols-12 h-screen w-screen px-56">
        <div className="col-span-3 pt-1 ml-12">
          <div className="text-2xl h-fit hover:bg-gray-800 rounded-full p-4 cursor-pointer transition-all w-fit">
            <BsTwitter />
          </div>
          <div className="mt-1 text-xl font-semibold pr-4">
            <ul>
              {sidebarMenuItems.map((item) => (
                <li
                  key={item.title}
                  className="flex items-center justify-start gap-4 hover:bg-gray-800 rounded-full px-3 py-3 w-fit cursor-pointer mt-2"
                >
                  <span className="text-3xl">{item.icon}</span>
                  <span>{item.title}</span>
                </li>
              ))}
            </ul>
            <div className="mt-5 px-3">
              <button className="bg-[#1d9bf0] px-4 py-2 rounded-full w-full text-lg font-semibold">
                Post
              </button>
            </div>
          </div>
        </div>
        <div className="col-span-5 border-l-[1px] border-r-[1px] h-screen overflow-scroll scroll border-gray-600 no-scrollbar ">
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
        </div>
        <div className="col-span-3 p-5">
          <div className="p-5 bg-slate-700 rounded-lg">
            <h1 className="py-2 text-2xl">New to Twitter?</h1>
            <GoogleLogin onSuccess={(cred) => console.log(cred)} />;
          </div>
        </div>
      </div>
    </div>
  );
}
