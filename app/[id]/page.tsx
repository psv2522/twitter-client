"use client";
import TwitterLayout from "@/components/Layout/TwitterLayout";
import { BsArrowLeftShort } from "react-icons/bs";
import Image from "next/image";
import { FeedCard } from "@/components/FeedCard";
import { Tweet, User } from "@/gql/graphql";
import { usePathname } from "next/navigation";
import { graphqlClient } from "@/clients/api";
import { getUserByIdQuery } from "@/graphql/query/user";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useCurrentUser } from "@/hooks/user";
import { useCallback, useMemo } from "react";
import {
  followUserMutation,
  unfollowUserMutation,
} from "@/graphql/mutation/user";

type UserData = {
  getUserById: {
    id: string;
    firstName: string;
    lastName: string;
    profileImageURL: string;
    followers: User[];
    following: User[];
    tweets: Tweet[];
  };
};

export default function ProfilePage() {
  const pathname = usePathname();
  const id = pathname.split("/").pop();
  const { data: userInfo, isLoading } = useQuery<UserData>({
    queryKey: ["user", id],
    queryFn: () =>
      graphqlClient.request(getUserByIdQuery as any, { id: id ?? "" }),
    enabled: !!id,
  });
  const user = userInfo?.getUserById;

  const queryClient = useQueryClient();

  const { user: currentUser } = useCurrentUser();

  const amIFollowing = useMemo(() => {
    if (!user) return false;
    return (
      (currentUser?.following?.findIndex((el) => el.id === user.id) ?? -1) >= 0
    );
  }, [user, currentUser?.following]);

  const handleFollowUser = useCallback(async () => {
    if (!user?.id) return;
    await graphqlClient.request(followUserMutation, { to: user?.id });
    await queryClient.invalidateQueries({ queryKey: ["currentUser"] });
  }, [user?.id, queryClient]);

  const handleUnFollowUser = useCallback(async () => {
    if (!user?.id) return;
    await graphqlClient.request(unfollowUserMutation, { to: user?.id });
    await queryClient.invalidateQueries({ queryKey: ["currentUser"] });
  }, [user?.id, queryClient]);

  return (
    <div>
      <TwitterLayout>
        <div>
          <nav className="gap-3 flex items-center py-3 px-3">
            <Link href={"/"}>
              <BsArrowLeftShort className="text-4xl" />
            </Link>
            <div>
              <h1 className="text-lg font-bold">{user?.firstName}</h1>
              <h1 className="text-md font-bold text-slate-500">100 tweets</h1>
            </div>
          </nav>
          <div className="border-b p-4 border-slate-800">
            {user?.profileImageURL && (
              <Image
                src={user?.profileImageURL || ""}
                alt="user-image"
                width={100}
                height={100}
                className="rounded-full"
              />
            )}
            <h1 className="text-lg font-bold mt-5">
              {user?.firstName} {user?.lastName}
            </h1>
            <div className="flex justify-between items-center">
              <div className="flex gap-4 mt-2 text-sm text-gray-400">
                <span>{user?.followers?.length} followers</span>
                <span>{user?.following?.length} following</span>
              </div>
              {currentUser?.id !== user?.id && currentUser && (
                <>
                  {amIFollowing ? (
                    <button
                      onClick={handleUnFollowUser}
                      className="bg-white text-black px-3 py-1 rounded-full text-sm"
                    >
                      Unfollow
                    </button>
                  ) : (
                    <button
                      onClick={handleFollowUser}
                      className="bg-white text-black px-3 py-1 rounded-full text-sm"
                    >
                      Follow
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
          <div>
            {user?.tweets?.map((tweet: any) => (
              <FeedCard data={tweet as Tweet} key={tweet.id} />
            ))}
          </div>
        </div>
      </TwitterLayout>
    </div>
  );
}
