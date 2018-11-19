import React, { Component } from 'react'
import { StyleSheet, StatusBar, Alert, KeyboardAvoidingView, Text, ScrollView } from 'react-native'
import { FormLabel, FormInput, Button } from 'react-native-elements'

import { criarUsuario } from '../../controllers'

export class CadastroUsuario extends Component {
	static navigationOptions = {
		title: 'Cadastro de usuário',
		headerStyle: {
			backgroundColor: '#003399',
		},
		headerTitleStyle: {
			color: 'white'
		},
	};
	constructor(props) {
		super(props)
		this.state = {
			username: '',
			first_name: '',
			last_name: '',
			password1: '',
			password2: '',
			erro: ''
		}
	}
	renderError(text) {
		if (this.state.erro) {
			return (
				<Text style={styles.errorText}>{text}</Text>
			)
		}
	}
	signUp() {
		if (this.state.password1 === this.state.password2) {
			criarUsuario(this.state.username, this.state.first_name, this.state.last_name, this.state.password1)
				.then(() => {
					Alert.alert('Sucesso', 'Usuário cadastrado')
				})
				.catch(erro => this.setState({ erro }))
		} else {
			Alert.alert('Erro', 'As senhas não se combinam, tente novamente!')
			this.setState({ erro: { password: 'As senhas não se combinam' } })
		}
	}
	render() {
		return (
			<ScrollView>
			<KeyboardAvoidingView behavior='padding'>
				<FormLabel labelStyle={styles.label}>Usuario</FormLabel>
				<FormInput inputStyle={styles.input}
					placeholder='Digite um usuário'
					containerStyle={styles.inputContainer}
					placeholderTextColor='#003378'
					underlineColorAndroid='#003399'
					autoCorrect={false}
					autoCapitalize='none'
					onChangeText={text => this.setState({ username: text })} />
				{this.renderError(this.state.erro.username)}
				<FormLabel labelStyle={styles.label}>Nome</FormLabel>
				<FormInput inputStyle={styles.input}
					placeholder='Digite seu nome'
					containerStyle={styles.inputContainer}
					placeholderTextColor='#003378'
					underlineColorAndroid='#003399'
					onChangeText={text => this.setState({ first_name: text })} />
				{this.renderError(this.state.erro.first_name)}
				<FormLabel labelStyle={styles.label}>Sobrenome</FormLabel>
				<FormInput inputStyle={styles.input}
					placeholder='Digite seu sobrenome'
					containerStyle={styles.inputContainer}
					placeholderTextColor='#003378'
					underlineColorAndroid='#003399'
					onChangeText={text => this.setState({ last_name: text })} />
				{this.renderError(this.state.erro.last_name)}
				<FormLabel labelStyle={styles.label}>Senha</FormLabel>
				<FormInput inputStyle={styles.input}
					placeholder='Digite sua senha'
					secureTextEntry={true}
					containerStyle={styles.inputContainer}
					placeholderTextColor='#003378'
					underlineColorAndroid='#003399'
					onChangeText={text => this.setState({ password1: text })} />
				{this.renderError(this.state.erro.password)}
				<FormLabel labelStyle={styles.label}>Confirmar senha</FormLabel>
				<FormInput inputStyle={styles.input}
					placeholder='Repita sua senha'
					secureTextEntry={true}
					containerStyle={styles.inputContainer}
					placeholderTextColor='#003378'
					underlineColorAndroid='#003399'
					onChangeText={text => this.setState({ password2: text })} />
				{this.renderError(this.state.erro.password)}
				<Button title='Cadastrar' containerViewStyle={styles.buttonContainer}
					backgroundColor='#003399' borderRadius={3}
					onPress={() => this.signUp()} />
				<StatusBar barStyle='light-content' />

			</KeyboardAvoidingView>
			</ScrollView>
		)
	}
}

const styles = StyleSheet.create({
	input: {
		color: '#003398'
	},
	errorText: {
		color: 'red',
		marginRight: 20,
		marginLeft: 20
	},
	inputContainer: {
		borderBottomColor: '#003399'
	},
	label: {
		color: "#003399"
	},
	buttonContainer: {
		marginTop: 8,
	}
});
export default CadastroUsuario
