import { StyleSheet, SafeAreaView, Button, Alert, View, Dimensions, Image, Text, ImageBackground, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
const logoImage = require('../../assets/VCS.png')
const postsImage = require('../../assets/Posts.png')
import { useState } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { client } from '../../../client'
import { LIST_POSTS } from './queries'
import { COLORS } from '../../settings'

export const PostsView = ({ navigation }: { navigation: any }) => {
	const [posts, setPosts] = useState<Post[]>([])
	const [postsState, setPostsState] = useState<'LOADING' | 'LOADED'>('LOADING')

	const getPosts = async () => {
		const response = await client.query({ query: LIST_POSTS })
		if (!response.error) {
			const data = response.data
			if (data.listPosts.success) {
				try {
					setPosts(data.listPosts.posts)
				} catch (e) {
					Alert.alert('Something went wrong', 'Try again', [{ text: 'OK' }])
				}
			} else {
				Alert.alert('Error', JSON.stringify(data.listPosts.errors), [{ text: 'OK', onPress: () => console.log('OK Pressed') }])
			}
		}
		setPostsState('LOADED')
	}
	if (postsState === 'LOADING') {
		getPosts()
	}
	return (
		<SafeAreaProvider style={styles.container}>
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
		</SafeAreaProvider>
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
		alignItems: 'center',
		justifyContent: 'flex-start',
		padding: 20,
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
	},
	postSectionDescription: {
		color: 'grey',
		fontSize: 15,
	},
})
