import { gql } from '@apollo/client'

export const GET_USER = gql`
	query tryGetUser($username: String!) {
		getUser(username: $username) {
			user {
				id
				username
				post_ids
			}
			success
			errors
		}
	}
`
