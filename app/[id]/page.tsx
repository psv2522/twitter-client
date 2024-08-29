"use client";
import TwitterLayout from "@/components/Layout/TwitterLayout";
import { BsArrowLeftShort } from "react-icons/bs";
import Image from "next/image";
import { FeedCard } from "@/components/FeedCard";
import { Tweet, User } from "@/gql/graphql";
import { usePathname } from "next/navigation";
import { graphqlClient } from "@/clients/api";
import { getUserByIdQuery } from "@/graphql/query/user";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

type UserData = {
  getUserById: {
    id: string;
    firstName: string;
    lastName: string;
    profileImageURL: string;
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
                className="rounded-full invert"
              />
            )}
            <h1 className="text-lg font-bold mt-5">
              {user?.firstName} {user?.lastName}
            </h1>
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
