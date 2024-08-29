import { graphql } from "@/gql";

export const verifyUserGoogleTokenQuery = graphql(`
	#graphql
	query VerifyUserGoogleTokenQuery($token: String!) {
		verifyGoogleToken(token: $token)
	}
`);

export const getCurrentUserQuery = graphql(`
    query GetCurrentUserQuery {
        getCurrentUser {
            id
            firstName
            lastName
            email
            profileImageURL
			tweets {
				id
				content
				author{
					id
					firstName
					lastName
					profileImageURL
				}
			}
        }
    }
`);

export const getUserByIdQuery = graphql(`#graphql
	query GetUserById($id: ID!) {
		getUserById(id: $id) {
			id
			firstName
			lastName
			profileImageURL
			tweets {
				content
				id
				author {
					id
					firstName
					lastName
					profileImageURL
				}
			}
		}
	}
`);

export type GetCurrentUserQueryType = {
	getCurrentUser: {
		id: string;
		firstName: string;
		lastName: string | null;
		email: string;
		profileImageURL: string | null;
	} | null;
};