"use client";
import TwitterLayout from "@/components/Layout/TwitterLayout";
import { BsArrowLeftShort } from "react-icons/bs";
import Image from "next/image";
import { useCurrentUser } from "@/hooks/user";
import { FeedCard } from "@/components/FeedCard";
import { Tweet, User } from "@/gql/graphql";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { user } = useCurrentUser() as { user: User & { tweets?: Tweet[] } };
  const router = useRouter();
  return (
    <div>
      <TwitterLayout>
        <div>
          <nav className="gap-3 flex items-center py-3 px-3">
            <BsArrowLeftShort className="text-4xl" />
            <div>
              <h1 className="text-lg font-bold">Prathmesh</h1>
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
            <h1 className="text-lg font-bold mt-5">Prathmesh</h1>
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
