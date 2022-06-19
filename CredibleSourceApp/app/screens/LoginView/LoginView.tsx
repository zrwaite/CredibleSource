import { StyleSheet, SafeAreaView, Button, Alert, View, Dimensions, Image, Text, ImageBackground, TextInput, TouchableOpacity } from 'react-native'
const logoImage = require('../../assets/VCS.png')
import AsyncStorage from '@react-native-async-storage/async-storage'

import { StackActions } from '@react-navigation/native'
import { useContext, useState } from 'react'
import { COLORS } from '../../settings'
import { ZacButton } from '../../components/ZacButton'
import { client } from '../../../client'
import { LOGIN } from './queries'
import { SIGNUP } from './mutations'
import { UserContext } from '../../../App'

const loginRedirect = async (navigation: any) => {
	const username = await AsyncStorage.getItem('username')
	if (username) {
		navigation.dispatch(StackActions.replace('Home'))
	}
}

export const LoginView = ({ navigation }: { navigation: any }) => {
	loginRedirect(navigation)
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const buttonsEnabled = username.length !== 0 && password.length !== 0
	const { setUser } = useContext(UserContext)

	const tryLogin = async () => {
		const response = await client.query({
			query: LOGIN,
			variables: { username, password },
		})
		if (!response.error) {
			const data = response.data
			if (data.login.success) {
				try {
					await AsyncStorage.setItem('username', username)
					Alert.alert('Logged In', `You are logged in as "${username}"`, [{ text: 'OK' }])
					setUser(data.login.user)
				} catch (e) {
					Alert.alert('Something went wrong', 'Try again', [{ text: 'OK' }])
				}
			} else {
				Alert.alert('Error', JSON.stringify(data.login.errors), [{ text: 'OK', onPress: () => console.log('OK Pressed') }])
			}
		}
	}

	const trySignUp = async () => {
		const response = await client.mutate({
			mutation: SIGNUP,
			variables: { username, password },
		})
		if (!response.errors) {
			const data = response.data
			if (data.createUser.success) {
				try {
					await AsyncStorage.setItem('username', username)
					Alert.alert('User Created!', `You are logged in as "${username}"`, [{ text: 'OK' }])
					setUser(data.createUser.user)
				} catch (e) {
					Alert.alert('Something went wrong', 'Try again', [{ text: 'OK' }])
				}
			} else Alert.alert('Error', JSON.stringify(data.createUser.errors), [{ text: 'OK', onPress: () => console.log('OK Pressed') }])
		} else Alert.alert('Error', JSON.stringify(response.errors), [{ text: 'OK', onPress: () => console.log('OK Pressed') }])
	}
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
			<ZacButton style={{ marginTop: 30 }} onPress={tryLogin} color={COLORS.vcsBlue} text={'Login'} enabled={buttonsEnabled} />
			<ZacButton onPress={trySignUp} color={COLORS.vcsYellow} text={'Sign Up'} enabled={buttonsEnabled} />
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
