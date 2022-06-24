import { StyleSheet, Alert, Image, Text, TextInput, ScrollView } from 'react-native'
const logoImage = require('../../assets/VCS.png')

import { StackActions } from '@react-navigation/native'
import { useContext, useState } from 'react'
import { COLORS } from '../../settings'
import { ZacButton } from '../../components/ZacButton'
import { client } from '../../../client'
import { CREATE_POST } from './mutations'
import { PostsContext } from '../../../contexts'

export const CreatePostView = ({ navigation }: { navigation: any }) => {
	const { posts, setPosts } = useContext(PostsContext)
	const [headline, setHeadline] = useState('')
	const [description, setDescription] = useState('')
	const [content, setContent] = useState('')
	const submitEnabled = headline.length !== 0 && description.length !== 0 && content.length !== 0

	const tryCreatePost = async () => {
		const response = await client.mutate({
			mutation: CREATE_POST,
			variables: { headline, description, content },
		})
		if (!response.errors) {
			const data = response.data
			if (data.createPost.success) {
				Alert.alert('Post Created!', `View it here`, [{ text: 'OK' }])
				setPosts([data.createPost.post, ...posts])
				navigation.dispatch(StackActions.replace('Post', { post: data.createPost.post }))
			} else Alert.alert('Error', JSON.stringify(data.login.errors), [{ text: 'OK' }])
		} else Alert.alert('Error', JSON.stringify(response.errors), [{ text: 'OK' }])
	}

	return (
		<ScrollView contentContainerStyle={{ alignItems: 'center' }} style={styles.container}>
			<Text style={styles.title}>Create a Post</Text>
			<Image
				source={logoImage}
				style={{
					height: 50,
					width: 100,
					marginBottom: 50,
				}}
			/>
			<TextInput blurOnSubmit={true} maxLength={50} style={styles.textInput} placeholder="Headline" placeholderTextColor={COLORS.vcsGreen} onChangeText={(headline) => setHeadline(headline)} />
			<TextInput
				multiline={true}
				maxLength={200}
				blurOnSubmit={true}
				style={styles.textInput}
				placeholder="Description"
				placeholderTextColor={COLORS.vcsGreen}
				onChangeText={(description) => setDescription(description)}
			/>
			<TextInput blurOnSubmit={true} multiline={true} style={styles.textInput} placeholder="Content" placeholderTextColor={COLORS.vcsYellow} onChangeText={(content) => setContent(content)} />
			<ZacButton style={{ marginTop: 30 }} onPress={tryCreatePost} color={COLORS.vcsBlue} text={'Create Post'} enabled={submitEnabled} />
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	title: {
		color: 'white',
		fontSize: 40,
		textAlign: 'center',
		margin: 40,
	},
	container: {
		flex: 1,
		backgroundColor: 'black',
	},
	textInput: {
		height: 50,
		textAlign: 'center',
		width: '80%',
		backgroundColor: 'white',
		borderRadius: 20,
		margin: 10,
		fontSize: 20,
		padding: 10,
	},
})
