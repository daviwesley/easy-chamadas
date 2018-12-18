import React from 'react';
import {
	View, Text, KeyboardAvoidingView,
	StyleSheet, AsyncStorage, Alert, Platform,
	LayoutAnimation, StatusBar, Animated
} from 'react-native';
import { Button, FormInput, FormLabel } from 'react-native-elements'

//funções e variaveis
import { fazerLogin } from '../../controllers'

export class LoginScreen extends React.Component {
	static navigationOptions = {
		title: 'Login',
		headerStyle: {
			backgroundColor: '#003399'
		},
		headerTitleStyle: {
			color: 'white'
		}
	};
	constructor(props) {
		super(props)
		this.state = {
			usuario: "",
			senha: "",
			anim: new Animated.Value(0)
		}
	}
	componentWillMount() {
		AsyncStorage.getItem('token', (err, result) => {
			if (result !== null) {
				// Alert.alert("Ja temos seu login")
				// Alert.alert(result)
				this.props.navigation.push("Home")
			} /* else {
				Alert.alert("Seja Bem Vindo!", "Faça o login para prosseguir :)")
			} */
		});
	}
	componentDidMount() {
		Animated.timing(this.state.anim, { toValue: 3000, duration: 3000 }).start();
		LayoutAnimation.linear()

	}
	fazerLogin() {
		//Alert.alert(this.state.usuario, this.state.senha)
		fazerLogin(this.state.usuario, this.state.senha)
			.then(result => {
				AsyncStorage.setItem('token', JSON.stringify(result.token));
				this.props.navigation.navigate("Home")
			}).catch(erro => {
				if (erro.non_field_errors) {
					Alert.alert("Erro", "Usuário ou senha incorretas")
				} else if (erro.username || erro.password) {
					Alert.alert("Erro", "Preencha todos os campos")
				} else {
					Alert.alert("Erro", "Sem conexão com a internet")
				}
			})
	}
	render() {
		return (
			<KeyboardAvoidingView behavior="padding" enabled={Platform.OS === 'ios'} >
				{/* <StatusBar backgroundColor='black'/> */}

				<FormLabel labelStyle={styles.label}>Usuario</FormLabel>
				<FormInput
					placeholder='Digite seu usuário'
					returnKeyType='next'
					underlineColorAndroid='#003399'
					inputStyle={styles.input}
					containerStyle={styles.inputContainer}
					placeholderTextColor='#003378'
					autoCapitalize='none'
					autoCorrect={false}
					onChangeText={text => this.setState({ usuario: text })}
					onSubmitEditing={() => { this.secondTextInput.focus() }} />
				<FormLabel labelStyle={styles.label}>Senha</FormLabel>
				<FormInput
					secureTextEntry={true}
					placeholder='Digite sua senha'
					ref={el => this.secondTextInput = el}
					returnKeyType='go'
					underlineColorAndroid='#003399'
					inputStyle={styles.input}
					containerStyle={styles.inputContainer}
					placeholderTextColor='#003378'
					autoCapitalize='none'
					autoCorrect={false}
					onChangeText={text => this.setState({ senha: text })}
					onSubmitEditing={() => { this.fazerLogin() }} />
				<Button title="Entrar" onPress={() => this.fazerLogin()}
					containerViewStyle={styles.buttonContainer}
          buttonStyle={{ borderRadius: 3 }}
					backgroundColor='#003399' borderRadius={3} />
				<Button
				  title='Cadastre-se'
				  outline={true}
					color='#003399' onPress={() => this.props.navigation.navigate('SignUp')}
					containerViewStyle={styles.buttonContainer} />
				<StatusBar barStyle='light-content' />
			</KeyboardAvoidingView>
		);
	}
}

const styles = StyleSheet.create({
	input: {
		color: '#003398'
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


export default LoginScreen;
