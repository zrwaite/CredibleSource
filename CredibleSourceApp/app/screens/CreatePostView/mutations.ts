import { gql } from '@apollo/client'

export const CREATE_POST = gql`
	mutation tryCreatePost($headline: String!, $description: String!, $content: String!) {
		createPost(headline: $headline, description: $description, content: $content) {
			post {
				id
				headline
				content
				description
			}
			success
			errors
		}
	}
`
