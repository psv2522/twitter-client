import { graphqlClient } from "@/clients/api";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUserQuery, GetCurrentUserQueryType } from "@/graphql/query/user";

export const useCurrentUser = () => {
    const query = useQuery<GetCurrentUserQueryType>({
        queryKey: ["currentUser"],
        queryFn: () => graphqlClient.request(getCurrentUserQuery as any)
    })
    return { ...query, user: query.data?.getCurrentUser };
};
