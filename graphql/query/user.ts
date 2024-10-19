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
			followers{
				firstName
				lastName
				id
			}
			following{
				firstName
				lastName
				id
			}
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
			followers{
				firstName
				lastName
				id
			}
			following{
				firstName
				lastName
				id
			}
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
		followers: {
			firstName: string;
			lastName: string;
			id: string;
		}[];
		following: {
			firstName: string;
			lastName: string;
			id: string;
		}[];
		profileImageURL: string | null;
	} | null;
};