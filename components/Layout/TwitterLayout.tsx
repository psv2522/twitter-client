"use client";
import { useCurrentUser } from "@/hooks/user";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { BiCheckCircle, BiHash, BiHomeCircle, BiUser } from "react-icons/bi";
import { BsBell, BsBookmark, BsEnvelope, BsTwitter } from "react-icons/bs";
import { SlOptions } from "react-icons/sl";
import { graphqlClient } from "@/clients/api";
import { verifyUserGoogleTokenQuery } from "@/graphql/query/user";
import { useCallback } from "react";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

interface TwitterLayoutProps {
  children: React.ReactNode;
}

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
    title: "Get Verified",
    icon: <BiCheckCircle />,
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

export default function TwitterLayout({ children }: TwitterLayoutProps) {
  const queryClient = useQueryClient();

  const handleLoginwithGoogle = useCallback(
    async (cred: CredentialResponse) => {
      const googleToken = cred.credential;
      if (!googleToken) return toast.error("Google token not found");
      const { verifyGoogleToken } = await graphqlClient.request(
        verifyUserGoogleTokenQuery,
        {
          token: googleToken,
        }
      );

      toast.success("Google token verified");
      console.log(verifyGoogleToken);

      if (verifyGoogleToken) {
        window.localStorage.setItem("__twitter_token", verifyGoogleToken);
      }
      await queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
    [queryClient]
  );

  const { user } = useCurrentUser();

  return (
    <div>
      <div className="grid grid-cols-12 h-screen w-screen lg:px-56">
        <div className="col-span-2 sm:col-span-3 pt-1 flex relative sm:justify-end pr-4">
          <div>
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
                    <span className="hidden sm:inline">{item.title}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 px-3">
                <button className="hidden sm:block bg-[#1d9bf0] px-4 py-2 rounded-full w-full text-lg font-semibold">
                  Post
                </button>
                <button className="block sm:hidden bg-[#1d9bf0] px-4 py-2 rounded-full w-full text-lg font-semibold">
                  <BsTwitter />
                </button>
              </div>
            </div>
          </div>
          {user && (
            <div className=" absolute bottom-5 flex gap-2 items-center bg-slate-700 rounded-full px-3 py-2 cursor-pointer">
              {user && user.profileImageURL && (
                <img
                  src={user.profileImageURL}
                  alt="User profile"
                  height={50}
                  width={50}
                  className="rounded-full"
                />
              )}
              <div className="hidden lg:block">
                <h3>{user.firstName}</h3>
              </div>
            </div>
          )}
        </div>
        <div className="col-span-10 sm:col-span-5 border-l-[1px] border-r-[1px] h-screen overflow-scroll scroll border-gray-600 no-scrollbar">
          {children}
        </div>
        <div className="hidden sm:col-span-3 p-5">
          {!user && (
            <div className="p-5 bg-slate-700 rounded-lg">
              <h1 className="py-2 text-2xl">New to Twitter?</h1>
              <GoogleLogin onSuccess={handleLoginwithGoogle} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
