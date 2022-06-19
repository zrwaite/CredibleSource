import { gql } from '@apollo/client'

export const LIST_POSTS = gql`
	query {
		listPosts {
			success
			errors
			posts {
				headline
				description
				content
			}
		}
	}
`
