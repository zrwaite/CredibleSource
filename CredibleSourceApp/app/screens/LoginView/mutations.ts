import { gql } from '@apollo/client'

export const SIGNUP = gql`
	mutation trySignUp($username: String!, $password: String!) {
		createUser(username: $username, password: $password) {
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
