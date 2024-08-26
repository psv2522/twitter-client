import { graphql } from "@/gql";

export const getAllTweetsQuery = graphql(`
    #graphql

    query GetAllTweets {
        getAllTweets {
            id
            content
            imageURL
            author {
                firstName
                lastName
                profileImageURL
            }
        }
    }
`);

export type GetAllTweetsQueryType  = {
    getAllTweets: {
        id: string; 
        content: string;
        imageURL: string | null;
        author: {
            firstName: string;
            lastName: string | null;
            profileImageURL: string | null;
        }
    }[]
};