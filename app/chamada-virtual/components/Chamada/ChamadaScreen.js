import React from 'react';
import {
	StatusBar, ActivityIndicator,
	StyleSheet, ScrollView, AsyncStorage, Alert,
} from 'react-native';

import { ListItem, } from 'react-native-elements';

import { getTurma } from '../../controllers';

export class ChamadaScreen extends React.Component {
	static navigationOptions = {
		headerStyle: {
			backgroundColor: '#003399'
		},
		headerTitleStyle: {
			color: 'white'
		}
	};
	constructor(props) {
		super(props);
		this.state = {
			turma: [],
			isLoading: true
		}
	}
	renderLoading = (props) => {
		if (this.state.isLoading) {
			return (<ActivityIndicator color='#003399' style={{ marginTop: 10 }} />)
		}
	}
	componentDidMount() {
		AsyncStorage.getItem('token').then(token => {
			this.setState({ token: token.replace(/['"]+/g, '') })
			getTurma(token.replace(/['"]+/g, '')).then(dados => {
				this.setState({ turma: dados })
				this.setState({ isLoading: false })
			}).catch(erro => Alert.alert('Erro', erro.detail))
		})
	}
	render() {
		return (
			<ScrollView style={styles.list}>
				{this.renderLoading()}
				{this.state.turma.map((turma, id) => (
					<ListItem
						leftIcon={{
							name: 'user-circle-o',
							type: 'font-awesome',
							color: '#003399',
						}}
						onPress={() => this.props.navigation.navigate('FazerChamada', {
							title: turma.name, token: this.state.token, name_turma:turma.name,
							id: turma.id
						})}
						title={turma.name}
						subtitle={turma.teacher}
						key={id}
					/>
				))}
				<StatusBar barStyle='light-content' />
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	list: {
		backgroundColor: '#fff',
	}
});
export default ChamadaScreen;
