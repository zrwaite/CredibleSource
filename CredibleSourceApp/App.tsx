import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { HomeView } from './app/screens/HomeView'
import { LoginView } from './app/screens/LoginView'

const Stack = createNativeStackNavigator() as any

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name="Login" component={LoginView} />
				<Stack.Screen name="Home" component={HomeView} />
			</Stack.Navigator>
		</NavigationContainer>
	)
}
