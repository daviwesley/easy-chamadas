import React, { Component } from 'react'
import { Text, View } from 'react-native'

export class FaltaScreen extends Component {

	render() {
		console.log('props de falta',this.props.navigation.navigationOptions)
		return (
			<View>
				<Text> textInComponent </Text>
			</View>
		)
	}
}

export default FaltaScreen
