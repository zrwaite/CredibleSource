import { gql } from '@apollo/client'

export const LOGIN = gql`
	query tryLogin($username: String!, $password: String!) {
		login(username: $username, password: $password) {
			user {
				id
				display_name
			}
			success
			errors
		}
	}
`
