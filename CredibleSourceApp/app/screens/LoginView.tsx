import { StyleSheet, SafeAreaView, Button, Alert, View, Dimensions, Image, Text, ImageBackground, TextInput, TouchableOpacity } from 'react-native'
const logoImage = require('../assets/VCS.png')

import { StackActions } from '@react-navigation/native'
import { useState } from 'react'
import { COLORS } from '../settings'
import { ZacButton } from '../components/ZacButton'

export const LoginView = ({ navigation }: { navigation: any }) => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const tryLogin = () => {}

	const trySignUp = () => {}
	return (
		<View style={styles.container}>
			<Text style={styles.title}>A Very Credible Source</Text>
			<Image
				source={logoImage}
				style={{
					height: 120,
					width: 240,
					marginBottom: 50,
				}}
			/>
			<TextInput style={styles.textInput} placeholder="Username" placeholderTextColor={COLORS.vcsGreen} onChangeText={(username) => setUsername(username)} />
			<TextInput style={styles.textInput} placeholder="Password" placeholderTextColor={COLORS.vcsGreen} onChangeText={(password) => setPassword(password)} />
			<ZacButton style={{ marginTop: 30 }} onPress={tryLogin} color={COLORS.vcsBlue} text={'Login'} />
			<ZacButton onPress={trySignUp} color={COLORS.vcsYellow} text={'Sign Up'} />

			{/* <Button title="Go Home" onPress={() => navigation.dispatch(StackActions.replace('Home'))} /> */}
		</View>
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
		alignItems: 'center',
		justifyContent: 'flex-start',
	},
	textInput: {
		height: 50,
		textAlign: 'center',
		width: '80%',
		backgroundColor: 'white',
		borderRadius: 20,
		margin: 10,
		fontSize: 20,
	},
})
