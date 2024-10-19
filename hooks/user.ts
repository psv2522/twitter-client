import { graphqlClient } from "@/clients/api";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getCurrentUserQuery, GetCurrentUserQueryType } from "@/graphql/query/user";
import { followUserMutation } from "@/graphql/mutation/user";

export const useCurrentUser = () => {
    const query = useQuery<GetCurrentUserQueryType>({
        queryKey: ["currentUser"],
        queryFn: () => graphqlClient.request(getCurrentUserQuery as any)
    })
    return { ...query, user: query.data?.getCurrentUser };
};

export const useFollowUser = (id: string) => {
    const mutation = useMutation({
        mutationKey: [`follow-${id}`],
        mutationFn: () => graphqlClient.request(followUserMutation as any, { to: id }),
    });
    return mutation;
};