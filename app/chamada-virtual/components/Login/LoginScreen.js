import React from 'react';
import {
	View, Text, KeyboardAvoidingView,
	StyleSheet, AsyncStorage, Alert, ScrollView, Platform,
	LayoutAnimation, StatusBar, Animated
} from 'react-native';
import { Button, FormInput, SocialIcon } from 'react-native-elements'

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
			<ScrollView contentContainerStyle={styles.container}>
				<KeyboardAvoidingView behavior="padding" enabled={Platform.OS === 'ios'} >
					{/* <StatusBar backgroundColor='black'/> */}
					<View>
						<Text style={styles.headerText}>Nome do usuário</Text>
						<FormInput
							placeholder='Digite seu usuário'
							returnKeyType='next'
							underlineColorAndroid='transparent'
							blurOnSubmit={false}
							containerStyle={styles.formInputContainer}
							inputStyle={styles.textInput}
							clearButtonMode='always'
							autoCapitalize='none'
							autoCorrect={false}
							onChangeText={text => this.setState({ usuario: text })}
							onSubmitEditing={() => { this.secondTextInput.focus() }} />
						<Text style={styles.headerText}>Senha</Text>
						<FormInput
							secureTextEntry={true}
							placeholder='Digite sua senha'
							ref={el => this.secondTextInput = el}
							returnKeyType='go'
							underlineColorAndroid='transparent'
							blurOnSubmit={false}
							containerStyle={styles.formInputContainer}
							inputStyle={styles.textInput}
							clearButtonMode='always'
							autoCapitalize='none'
							autoCorrect={false}
							onChangeText={text => this.setState({ senha: text })}
							onSubmitEditing={() => { this.fazerLogin() }} />
					</View>
					<Button title="Entrar" onPress={() => this.fazerLogin()}
						accessibilityLabel="Entrar"
						buttonStyle={styles.buttonStyle}
						fontSize={15}
						fontWeight='bold'
						containerViewStyle={styles.buttonContainer}
					/>
				</KeyboardAvoidingView>
				<StatusBar barStyle='light-content' />
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	textInput: {
		color: 'black',
		height: 43,
		fontSize: 15,
		width: "100%",
		borderColor: '#003399',
		borderRadius: 4,
		borderWidth: 1,
		marginBottom: 3,
		backgroundColor: 'white',
	},
	headerText: {
		marginLeft: 2,
		fontSize: 15,
		paddingTop: 5,
		color: '#003399',
		fontWeight: 'bold'
	},
	container: {
		flex: 1,
	},
	formInputContainer: {
		marginLeft: 2,
		marginRight: 2,
		borderBottomColor: 'transparent',
	},
	buttonContainer: {
		marginLeft: 2,
		marginRight: 2,
		paddingTop: 3,
	},
	buttonStyle: {
		backgroundColor: '#003399',
		borderRadius: 4
	}
});


export default LoginScreen;
