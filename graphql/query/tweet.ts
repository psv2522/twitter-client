import { graphql } from "@/gql";

export const getAllTweetsQuery = graphql(`
    #graphql

    query GetAllTweets {
        getAllTweets {
            id
            content
            imageURL
            author {
                id
                firstName
                lastName
                profileImageURL
            }
        }
    }
`);

export const getSignedUrlForTweetQuery = graphql(`
    query GetSignedUrlForTweet($imageType: String!, $imageName: String!) {
        getSignedUrlForTweet(imageType: $imageType, imageName: $imageName)
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