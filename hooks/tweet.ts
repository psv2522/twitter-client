import { graphqlClient } from "@/clients/api";
import { createTweetMutation } from "@/graphql/mutation/tweet";
import { getAllTweetsQuery, GetAllTweetsQueryType } from "@/graphql/query/tweet";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CreateTweetData } from "@/gql/graphql";
import { toast } from "react-hot-toast";

export const useCreateTweet = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: (payload: CreateTweetData) => graphqlClient.request(createTweetMutation as any, { payload }),
        onMutate: () => toast.loading("Creating tweet", { id: "1" }),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["all-tweets"] })
            toast.success("Tweet created", { id: "1" })
            return true;
        },
        onError: (error) => {
            toast.error("Please wait 10s before creating another tweet", { id: "1" });
            return false;
        }
    });
    return mutation;
};

export const useGetAllTweets = () => {
    const query = useQuery<GetAllTweetsQueryType>({
        queryKey: ["all-tweets"],
        queryFn: () => graphqlClient.request(getAllTweetsQuery as any),
    });
    return { ...query, tweets: query.data?.getAllTweets };
};