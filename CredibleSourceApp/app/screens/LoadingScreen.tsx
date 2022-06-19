import { Text, StyleSheet, ActivityIndicator, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
const logoImage = require('../assets/VCS.png')

export const LoadingScreen = () => {
	return (
		<SafeAreaView style={styles.container}>
			<Text style={{ ...styles.text, marginTop: 100 }}>A Very Credible Source</Text>
			<Image
				source={logoImage}
				style={{
					height: 120,
					width: 240,
					marginBottom: 50,
				}}
			/>
			<Text style={styles.text}>Loading...</Text>
			<ActivityIndicator size="large" />
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'black',
		alignItems: 'center',
		justifyContent: 'flex-start',
	},
	text: {
		fontSize: 40,
		color: 'white',
		textAlign: 'center',
		margin: 30,
	},
})
