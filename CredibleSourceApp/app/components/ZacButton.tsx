import { StyleProp, StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native'

export const ZacButton = (props: { onPress: () => void; text: string; color?: string; style?: ViewStyle }) => {
	const styles = StyleSheet.create({
		container: {
			display: 'flex',
			justifyContent: 'center',
			height: 40,
			width: '50%',
			margin: 10,
			borderRadius: 20,
			backgroundColor: props.color ?? 'black',
			...props.style,
		},
		text: {
			margin: 'auto',
			textAlign: 'center',
			color: 'black',
			fontSize: 20,
			width: '100%',
		},
	})
	return (
		<TouchableOpacity style={styles.container} onPress={props.onPress}>
			<Text style={styles.text}>{props.text}</Text>
		</TouchableOpacity>
	)
}
