import { StyleSheet, SafeAreaView, Button, Alert, View, Dimensions, Image, Text, ImageBackground } from 'react-native'
const iconImage = require('../assets/icon.png')
export const HomeView = ({ navigation }: { navigation: any }) => {
	return (
		<ImageBackground resizeMode={'cover'} source={iconImage} style={styles.container}>
			<SafeAreaView
				style={{
					flex: 1,
					justifyContent: 'space-between',
				}}
			>
				<View>
					<Image
						source={iconImage}
						style={{
							alignSelf: 'center',
							height: 200,
							width: 300,
						}}
					/>
					<Text style={{ textAlign: 'center' }}>Home Page</Text>
				</View>
			</SafeAreaView>
		</ImageBackground>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
		// alignItems: 'center',
		// justifyContent: 'center',
	},
})
