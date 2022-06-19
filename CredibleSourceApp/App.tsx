import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createContext, useState } from 'react'
import { HomeView } from './app/screens/HomeView'
import { LoginView } from './app/screens/LoginView/LoginView'
import { client } from './client'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { GET_USER } from './queries'
import { Alert } from 'react-native'
import { LoadingScreen } from './app/screens/LoadingScreen'
import { PostsView } from './app/screens/PostsView'
import { PostView } from './app/screens/PostView'
import { CreatePostView } from './app/screens/CreatePostView'

const Stack = createNativeStackNavigator() as any

const UserContext = createContext<{ user: User | null; setUser: Function }>({
	user: null,
	setUser: () => {},
})

const PostsContext = createContext<{ posts: Post[]; setPosts: Function }>({
	posts: [],
	setPosts: () => {},
})

export default function App() {
	const [usernameState, setUsernameState] = useState<'LOADING' | 'NOT_FOUND' | 'FOUND'>('LOADING')
	const tryGetUser = async () => {
		const username = await AsyncStorage.getItem('username')
		if (!username) {
			setUsernameState('NOT_FOUND')
			return
		}
		const response = await client.query({
			query: GET_USER,
			variables: { username },
		})
		if (!response.error) {
			const data = response.data
			if (data.getUser.success) {
				setUser(data.getUser.user)
			} else Alert.alert('Error', JSON.stringify(data.login.errors), [{ text: 'OK', onPress: () => console.log('OK Pressed') }])
		} else Alert.alert('Error', JSON.stringify(response.errors), [{ text: 'OK', onPress: () => console.log('OK Pressed') }])
		setUsernameState('FOUND')
	}
	const [user, setUser] = useState<User | null>(null)
	const userValue = { user, setUser }

	const [posts, setPosts] = useState<Post[]>([])
	const postValue = { posts, setPosts }
	if (usernameState === 'LOADING') {
		setTimeout(tryGetUser, 1000)
	}
	return (
		<UserContext.Provider value={userValue}>
			<PostsContext.Provider value={postValue}>
				{usernameState === 'LOADING' ? (
					<LoadingScreen />
				) : (
					<NavigationContainer>
						<Stack.Navigator>
							{usernameState === 'FOUND' ? (
								<>
									<Stack.Screen name="Home" component={HomeView} />
									<Stack.Screen name="Login" component={LoginView} />
								</>
							) : (
								<>
									<Stack.Screen name="Login" component={LoginView} />
									<Stack.Screen name="Home" component={HomeView} />
								</>
							)}
							<Stack.Screen name="Posts" component={PostsView} />
							<Stack.Screen name="Post" component={PostView} />
							<Stack.Screen name="Create" component={CreatePostView} />
						</Stack.Navigator>
					</NavigationContainer>
				)}
			</PostsContext.Provider>
		</UserContext.Provider>
	)
}

export { UserContext, PostsContext }
