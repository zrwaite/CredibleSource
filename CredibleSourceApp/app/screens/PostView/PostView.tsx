import { StyleSheet, View, Text } from 'react-native'
import { COLORS } from '../../settings'

export const PostView = ({ route }: { route: { params: { post: Post } } }) => {
	return (
		<View style={styles.container}>
			<Text style={styles.header}>{route.params.post.headline}</Text>
			<Text style={styles.description}>{route.params.post.description}</Text>
			<Text style={styles.content}>{route.params.post.content}</Text>
			<Text style={styles.footer}>- A Very Credible Source</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.vcsBlue,
		alignItems: 'center',
		justifyContent: 'flex-start',
		paddingTop: 20,
	},
	header: {
		color: 'black',
		fontSize: 40,
		textAlign: 'center',
	},
	description: {
		color: 'black',
		fontSize: 25,
		margin: 20,
	},
	content: {
		color: 'white',
		fontSize: 20,
		padding: 5,
	},
	footer: {
		color: 'black',
		fontSize: 20,
		marginTop: 20,
		fontStyle: 'italic',
	},
})
