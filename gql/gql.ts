/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "#graphql\n    mutation CreateTweet($payload: CreateTweetData!) {\n        createTweet(payload: $payload) {\n            id\n        }\n    }\n": types.CreateTweetDocument,
    "\n  #graphql\n  mutation followUser($to: ID!) {\n    followUser(to: $to)\n  }\n": types.FollowUserDocument,
    "\n  #graphql\n  mutation unfollowUser($to: ID!) {\n    unfollowUser(to: $to)\n  }\n": types.UnfollowUserDocument,
    "\n    #graphql\n\n    query GetAllTweets {\n        getAllTweets {\n            id\n            content\n            imageURL\n            author {\n                id\n                firstName\n                lastName\n                profileImageURL\n            }\n        }\n    }\n": types.GetAllTweetsDocument,
    "\n    query GetSignedUrlForTweet($imageType: String!, $imageName: String!) {\n        getSignedUrlForTweet(imageType: $imageType, imageName: $imageName)\n    }\n": types.GetSignedUrlForTweetDocument,
    "\n\t#graphql\n\tquery VerifyUserGoogleTokenQuery($token: String!) {\n\t\tverifyGoogleToken(token: $token)\n\t}\n": types.VerifyUserGoogleTokenQueryDocument,
    "\n    query GetCurrentUserQuery {\n        getCurrentUser {\n            id\n            firstName\n            lastName\n            email\n            profileImageURL\n\t\t\tfollowers{\n\t\t\t\tfirstName\n\t\t\t\tlastName\n\t\t\t\tid\n\t\t\t}\n\t\t\tfollowing{\n\t\t\t\tfirstName\n\t\t\t\tlastName\n\t\t\t\tid\n\t\t\t}\n\t\t\ttweets {\n\t\t\t\tid\n\t\t\t\tcontent\n\t\t\t\tauthor{\n\t\t\t\t\tid\n\t\t\t\t\tfirstName\n\t\t\t\t\tlastName\n\t\t\t\t\tprofileImageURL\n\t\t\t\t}\n\t\t\t}\n        }\n    }\n": types.GetCurrentUserQueryDocument,
    "#graphql\n\tquery GetUserById($id: ID!) {\n\t\tgetUserById(id: $id) {\n\t\t\tid\n\t\t\tfirstName\n\t\t\tlastName\n\t\t\tprofileImageURL\n\t\t\tfollowers{\n\t\t\t\tfirstName\n\t\t\t\tlastName\n\t\t\t\tid\n\t\t\t}\n\t\t\tfollowing{\n\t\t\t\tfirstName\n\t\t\t\tlastName\n\t\t\t\tid\n\t\t\t}\n\t\t\ttweets {\n\t\t\t\tcontent\n\t\t\t\tid\n\t\t\t\tauthor {\n\t\t\t\t\tid\n\t\t\t\t\tfirstName\n\t\t\t\t\tlastName\n\t\t\t\t\tprofileImageURL\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": types.GetUserByIdDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n    mutation CreateTweet($payload: CreateTweetData!) {\n        createTweet(payload: $payload) {\n            id\n        }\n    }\n"): (typeof documents)["#graphql\n    mutation CreateTweet($payload: CreateTweetData!) {\n        createTweet(payload: $payload) {\n            id\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  #graphql\n  mutation followUser($to: ID!) {\n    followUser(to: $to)\n  }\n"): (typeof documents)["\n  #graphql\n  mutation followUser($to: ID!) {\n    followUser(to: $to)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  #graphql\n  mutation unfollowUser($to: ID!) {\n    unfollowUser(to: $to)\n  }\n"): (typeof documents)["\n  #graphql\n  mutation unfollowUser($to: ID!) {\n    unfollowUser(to: $to)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    #graphql\n\n    query GetAllTweets {\n        getAllTweets {\n            id\n            content\n            imageURL\n            author {\n                id\n                firstName\n                lastName\n                profileImageURL\n            }\n        }\n    }\n"): (typeof documents)["\n    #graphql\n\n    query GetAllTweets {\n        getAllTweets {\n            id\n            content\n            imageURL\n            author {\n                id\n                firstName\n                lastName\n                profileImageURL\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GetSignedUrlForTweet($imageType: String!, $imageName: String!) {\n        getSignedUrlForTweet(imageType: $imageType, imageName: $imageName)\n    }\n"): (typeof documents)["\n    query GetSignedUrlForTweet($imageType: String!, $imageName: String!) {\n        getSignedUrlForTweet(imageType: $imageType, imageName: $imageName)\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\t#graphql\n\tquery VerifyUserGoogleTokenQuery($token: String!) {\n\t\tverifyGoogleToken(token: $token)\n\t}\n"): (typeof documents)["\n\t#graphql\n\tquery VerifyUserGoogleTokenQuery($token: String!) {\n\t\tverifyGoogleToken(token: $token)\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GetCurrentUserQuery {\n        getCurrentUser {\n            id\n            firstName\n            lastName\n            email\n            profileImageURL\n\t\t\tfollowers{\n\t\t\t\tfirstName\n\t\t\t\tlastName\n\t\t\t\tid\n\t\t\t}\n\t\t\tfollowing{\n\t\t\t\tfirstName\n\t\t\t\tlastName\n\t\t\t\tid\n\t\t\t}\n\t\t\ttweets {\n\t\t\t\tid\n\t\t\t\tcontent\n\t\t\t\tauthor{\n\t\t\t\t\tid\n\t\t\t\t\tfirstName\n\t\t\t\t\tlastName\n\t\t\t\t\tprofileImageURL\n\t\t\t\t}\n\t\t\t}\n        }\n    }\n"): (typeof documents)["\n    query GetCurrentUserQuery {\n        getCurrentUser {\n            id\n            firstName\n            lastName\n            email\n            profileImageURL\n\t\t\tfollowers{\n\t\t\t\tfirstName\n\t\t\t\tlastName\n\t\t\t\tid\n\t\t\t}\n\t\t\tfollowing{\n\t\t\t\tfirstName\n\t\t\t\tlastName\n\t\t\t\tid\n\t\t\t}\n\t\t\ttweets {\n\t\t\t\tid\n\t\t\t\tcontent\n\t\t\t\tauthor{\n\t\t\t\t\tid\n\t\t\t\t\tfirstName\n\t\t\t\t\tlastName\n\t\t\t\t\tprofileImageURL\n\t\t\t\t}\n\t\t\t}\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n\tquery GetUserById($id: ID!) {\n\t\tgetUserById(id: $id) {\n\t\t\tid\n\t\t\tfirstName\n\t\t\tlastName\n\t\t\tprofileImageURL\n\t\t\tfollowers{\n\t\t\t\tfirstName\n\t\t\t\tlastName\n\t\t\t\tid\n\t\t\t}\n\t\t\tfollowing{\n\t\t\t\tfirstName\n\t\t\t\tlastName\n\t\t\t\tid\n\t\t\t}\n\t\t\ttweets {\n\t\t\t\tcontent\n\t\t\t\tid\n\t\t\t\tauthor {\n\t\t\t\t\tid\n\t\t\t\t\tfirstName\n\t\t\t\t\tlastName\n\t\t\t\t\tprofileImageURL\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["#graphql\n\tquery GetUserById($id: ID!) {\n\t\tgetUserById(id: $id) {\n\t\t\tid\n\t\t\tfirstName\n\t\t\tlastName\n\t\t\tprofileImageURL\n\t\t\tfollowers{\n\t\t\t\tfirstName\n\t\t\t\tlastName\n\t\t\t\tid\n\t\t\t}\n\t\t\tfollowing{\n\t\t\t\tfirstName\n\t\t\t\tlastName\n\t\t\t\tid\n\t\t\t}\n\t\t\ttweets {\n\t\t\t\tcontent\n\t\t\t\tid\n\t\t\t\tauthor {\n\t\t\t\t\tid\n\t\t\t\t\tfirstName\n\t\t\t\t\tlastName\n\t\t\t\t\tprofileImageURL\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;