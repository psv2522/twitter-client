import { useState, useCallback, useMemo } from "react";
import { useCurrentUser } from "@/hooks/user";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { BiCheckCircle, BiHash, BiHomeCircle, BiUser } from "react-icons/bi";
import { BsBell, BsBookmark, BsEnvelope, BsTwitter } from "react-icons/bs";
import { SlOptions } from "react-icons/sl";
import { graphqlClient } from "@/clients/api";
import { verifyUserGoogleTokenQuery } from "@/graphql/query/user";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import Image from "next/image";

interface TwitterLayoutProps {
  children: React.ReactNode;
}

interface TwitterSidebarButton {
  title: string;
  icon: React.ReactNode;
  link: string;
}

export default function TwitterLayout({ children }: TwitterLayoutProps) {
  const queryClient = useQueryClient();
  const { user } = useCurrentUser();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const sidebarMenuItems: TwitterSidebarButton[] = useMemo(
    () => [
      {
        title: "Home",
        icon: <BiHomeCircle />,
        link: "/",
      },
      {
        title: "Explore",
        icon: <BiHash />,
        link: "/",
      },
      {
        title: "Notifications",
        icon: <BsBell />,
        link: "/",
      },
      {
        title: "Messages",
        icon: <BsEnvelope />,
        link: "/",
      },
      {
        title: "Bookmarks",
        icon: <BsBookmark />,
        link: "/",
      },
      {
        title: "Get Verified",
        icon: <BiCheckCircle />,
        link: "/",
      },
      {
        title: "Profile",
        icon: <BiUser />,
        link: `/${user?.id}`,
      },
      {
        title: "More",
        icon: <SlOptions />,
        link: "/",
      },
    ],
    [user?.id]
  );

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

  const handleLogout = () => {
    window.localStorage.removeItem("__twitter_token");
    queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    setIsDropdownOpen(false);
    toast.success("Logged out successfully");
  };

  return (
    <div>
      <div className="grid grid-cols-12 h-screen w-screen lg:px-56">
        <div className="col-span-2 sm:col-span-3 pt-1 relative pr-4">
          <div>
            <div className="text-2xl h-fit hover:bg-gray-800 rounded-full p-4 cursor-pointer transition-all w-fit">
              <Link href={"/"}>
                <BsTwitter />
              </Link>
            </div>
            <div className="mt-1 text-xl font-semibold pr-4">
              <ul>
                {sidebarMenuItems.map((item) => (
                  <li key={item.title}>
                    <Link
                      href={item.link}
                      className="flex items-center justify-start gap-4 hover:bg-gray-800 rounded-full px-3 py-3 w-fit cursor-pointer mt-2"
                    >
                      <span className="text-3xl">{item.icon}</span>
                      <span className="hidden sm:inline">{item.title}</span>
                    </Link>
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
            <div className="absolute bottom-5">
              <div
                className="bg-slate-700 rounded-full px-3 py-2 cursor-pointer w-full"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <div className="flex items-center">
                  {user.profileImageURL ? (
                    <img
                      src={user.profileImageURL}
                      alt="User profile"
                      height={50}
                      width={50}
                      className="rounded-full"
                    />
                  ) : (
                    <div className="h-10 w-10 bg-green-700 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold">
                        {user.firstName.charAt(0)}
                      </span>
                    </div>
                  )}
                  <span className="hidden lg:inline ml-2 text-white">
                    {user.firstName}
                  </span>
                </div>
              </div>

              {isDropdownOpen && (
                <div className="absolute bottom-16 left-0 bg-slate-700 p-3 rounded-lg w-48 shadow-lg">
                  <ul>
                    <li
                      className="cursor-pointer hover:bg-gray-600 p-2 rounded-lg"
                      onClick={handleLogout}
                    >
                      Logout
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="col-span-10 sm:col-span-5 border-l-[1px] border-r-[1px] h-screen overflow-scroll scroll border-gray-600 no-scrollbar">
          {children}
        </div>

        <div className="sm:col-span-3 p-5">
          {!user ? (
            <div className="p-5 bg-slate-700 rounded-lg flex flex-col items-center">
              <h1 className="py-2 text-2xl">New to Twitter?</h1>
              <GoogleLogin onSuccess={handleLoginwithGoogle} />
            </div>
          ) : (
            <div className="px-4 py-3 rounded-lg bg-slate-800">
              <h1 className="py-2 text-xl mb-5">Users you may know</h1>
              {user?.recommendedUsers?.map((el) => (
                <div key={el.id} className="flex items-center gap-3 mt-2">
                  {el.profileImageURL && (
                    <Image
                      src={el?.profileImageURL}
                      alt="user-image"
                      className="rounded-full"
                      width={60}
                      height={60}
                    ></Image>
                  )}
                  <div>
                    <div className="text-base">
                      {el.firstName} {el.lastName}
                    </div>
                    <Link
                      href={`/${el?.id}`}
                      className="bg-white text-black text-sm px-5 py-1 w-full rounded-lg"
                    >
                      View
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
