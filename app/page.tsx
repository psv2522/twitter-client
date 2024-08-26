"use client";
import { FeedCard } from "@/components/FeedCard";
import { TweetModal } from "@/components/TweetModal";
import { useGetAllTweets } from "@/hooks/tweet";
import { Tweet } from "@/gql/graphql";
import TwitterLayout from "@/components/Layout/TwitterLayout";

export default function Home() {
  const { tweets = [] } = useGetAllTweets();

  return (
    <div>
      <TwitterLayout>
        <TweetModal />
        {tweets?.map((tweet) =>
          tweet ? <FeedCard key={tweet?.id} data={tweet as Tweet} /> : null
        )}
      </TwitterLayout>
    </div>
  );
}
