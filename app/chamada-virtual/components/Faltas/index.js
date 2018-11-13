import React, { Component } from 'react'
import { Text, View } from 'react-native'

export class FaltaScreen extends Component {

	render() {
		console.log(this.props.navigation.navigationOptions)
		return (
			<View>
				<Text> textInComponent </Text>
			</View>
		)
	}
}

export default FaltaScreen
