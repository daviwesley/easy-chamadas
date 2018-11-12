import React from 'react';
import {
	View, Text, TextInput, KeyboardAvoidingView,
	StyleSheet, Platform, AsyncStorage
} from 'react-native';
import { Button } from 'react-native-elements'

import { inserirProfessor } from '../../controllers'
export class CadastroTeacher extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			nome: " ",
		}
	}
	componentDidMount() {
		AsyncStorage.getItem('token').then(dados => {
			this.setState({
				token: dados.replace(/['"]+/g, '')
			})
		})
	}

	cadastrar() {
		let data = {
			"name": this.state.nome
		}
		inserirProfessor(data.name)
			.then(dados => {
				this.setState({
					nome: dados
				})
			}).catch(erro => {
				console.log(erro)
			})
	}
	render() {
		return (
			<KeyboardAvoidingView behavior="padding" enabled={Platform.OS === 'ios'} >
				{/* <StatusBar backgroundColor='black'/> */}
				<View style={{ alignItems: 'center', }}>
					<Text style={styles.headerText}>Nome do Professor</Text>
					<TextInput placeholder="Digite o nome do professor"
						style={styles.textInput}
						autoCapitalize='words'
						returnKeyType='next'
						onSubmitEditing={() => { this.cadastrar(); }}
						blurOnSubmit={false}
						onChangeText={text => this.setState({ nome: text })}
					/>
				</View>
				<Button title="Entrar" onPress={() => this.cadastrar()}
						accessibilityLabel="Entrar"
						buttonStyle={styles.buttonStyle}
						fontSize={15}
						containerViewStyle={styles.buttonContainer}
						/>

			</KeyboardAvoidingView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#e5e5e5"
	},
	textInput: {
		height: 40,
		width: "95%",
		borderColor: 'black',
		borderRadius: 4,
		borderWidth: 1,
		marginBottom: 20,
		backgroundColor: 'white',
	},
	headerText: {
		fontSize: 15,
		paddingTop: 5,
	},
	buttonStyle:{
		backgroundColor:'#003399',
		borderRadius:4,
	},
	formInputContainer: {
		marginLeft:2,
		marginRight:2,
		borderBottomColor:'black'
	},
});
export default CadastroTeacher;
