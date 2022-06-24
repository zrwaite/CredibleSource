import { StyleSheet, Alert, Text, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native'
const logoImage = require('../../assets/VCS.png')
const postsImage = require('../../assets/Posts.png')
import { useContext, useState } from 'react'
import { client } from '../../../client'
import { LIST_POSTS } from './queries'
import { COLORS } from '../../settings'
import { PostsContext } from '../../../contexts'

export const PostsView = ({ navigation }: { navigation: any }) => {
	const { posts, setPosts } = useContext(PostsContext)

	const [postsState, setPostsState] = useState<'LOADING' | 'LOADED'>('LOADING')

	const getPosts = async () => {
		const response = await client.query({ query: LIST_POSTS })
		if (!response.error) {
			const data = response.data
			if (data.listPosts.success) {
				setPosts([...data.listPosts.posts].reverse())
			} else Alert.alert('Error', JSON.stringify(data.listPosts.errors), [{ text: 'OK', onPress: () => console.log('OK Pressed') }])
		} else Alert.alert('Error', JSON.stringify(response.errors), [{ text: 'OK', onPress: () => console.log('OK Pressed') }])
		setPostsState('LOADED')
	}
	if (postsState === 'LOADING') getPosts()
	return (
		<ScrollView contentContainerStyle={{ alignItems: 'center' }} style={styles.container}>
			{postsState === 'LOADING' ? (
				<ActivityIndicator size="large" />
			) : (
				posts.map((post, i) => {
					return (
						<TouchableOpacity key={i} style={styles.postSection} onPress={() => navigation.navigate('Post', { post: post })}>
							<Text style={styles.postSectionHeader}>{post.headline}</Text>
							<Text style={styles.postSectionDescription}>{post.description}...</Text>
						</TouchableOpacity>
					)
				})
			)}
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	header: {
		margin: 20,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
	},
	headerText: {
		color: 'white',
		fontSize: 25,
		textAlign: 'left',
	},
	container: {
		flex: 1,
		backgroundColor: COLORS.vcsYellow,
		width: '100%',
		padding: 20,
		overflow: 'scroll',
	},
	postSection: {
		backgroundColor: 'white',
		width: '80%',
		margin: 20,
		padding: 10,
		borderRadius: 20,
		alignItems: 'center',
		justifyContent: 'center',
	},
	postSectionHeader: {
		color: 'black',
		fontSize: 20,
		textAlign: 'center',
	},
	postSectionDescription: {
		color: 'grey',
		fontSize: 15,
		textAlign: 'center',
	},
})
