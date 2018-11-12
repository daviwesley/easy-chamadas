import React, { Component } from 'react'
import {
	ActivityIndicator,
	AsyncStorage,
	StatusBar,
	View,
	Text
} from 'react-native';

export class LoadingScreen extends Component {
	bootstrapAsync = async () => {
		const userToken = await AsyncStorage.getItem('token');
		let initialRouteName = userToken ? 'App' : 'Auth';
		this.props.navigation.navigate(initialRouteName);
	}

	componentDidMount() {
		this.bootstrapAsync();
	}


	render() {
		return (
			<View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
				<ActivityIndicator color='#003399'/>
				<Text style={{color:'#003399'}}>Carregando...</Text>
				<StatusBar barStyle="default" />
			</View>
		);
	}
}

export default LoadingScreen
