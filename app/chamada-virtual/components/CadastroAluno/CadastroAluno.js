import React from 'react';
import {
	SafeAreaView, Text, KeyboardAvoidingView,
	StyleSheet, Platform, AsyncStorage,
	StatusBar, Keyboard
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Button, FormLabel, FormInput } from 'react-native-elements';
import DropdownAlert from 'react-native-dropdownalert';
import { Picker } from 'react-native-picker-dropdown';
import { inserirAluno, getTurma } from '../../controllers';

export class CadastroAluno extends React.Component {
	static navigationOptions = {
		headerStyle: {
			backgroundColor: '#003399'
		},
		headerTitleStyle: {
			color: 'white',
		},
		tintColor: {
			backgroundColor: 'white',
			borderWidth: 20
		}
	};
	constructor(props) {
		super(props)
		this.state = {
			turma: [],
			turmaSelected: 'Selecione uma turma',
			nome: " ",
			matricula: " ",
			cadeira: "",
			curso: "Engenharia de Software",
			token: '',
			errorAluno: '',
			errorMatricula: '',
			erroCurso: '',
			erroDisciplina: '',
		}
		this.onValueChange = this.handleValueChange.bind(this)
		this.onValueTurma = this.handleCadeiras.bind(this)
	}
	componentWillMount() {
		AsyncStorage.getItem('token').then(dados => {
			this.setState({
				token: dados.replace(/['"]+/g, '')
			})
		})
		console.log(this.state.token)
	}

	handleValueChange(curso) {
		this.setState({ curso })
	}
	handleCadeiras(turmaSelected) {
		this.setState({ turmaSelected })
		console.log(turmaSelected)
	}
	cadastrar() {
		inserirAluno(this.state.nome, this.state.matricula, this.state.curso, this.state.subject,
			this.state.token).then(() => {
				this.dropdown.alertWithType('success', 'Sucesso', 'Aluno cadastrado');
				Keyboard.dismiss()
			})
			.catch(erro => {
				this.dropdown.alertWithType('error', 'Erro', message='algo deu errado!');
				if (erro.name) {
					this.setState({ errorAluno: erro.name })
				}
				if (erro.course) {
					this.setState({ erroCurso: erro.course })
				}
				if (erro.id_subscription) {
					this.setState({ errorMatricula: erro.id_subscription })
				}
			})
	}
	render() {
		return (
			<SafeAreaView>
			<KeyboardAvoidingView behavior="padding" enabled={Platform.OS === 'ios'} >
					{/* <StatusBar backgroundColor='black'/> */}
					<FormLabel labelStyle={styles.label}>Aluno</FormLabel>
						<FormInput placeholder="Digite o nome do aluno"
							inputStyle={styles.input}
							containerStyle={styles.inputContainer}
							placeholderTextColor='#003378'
							underlineColorAndroid='#003399'
							autoCapitalize='words'
							returnKeyType='next'
							onSubmitEditing={() => { this.matriculaInput.focus(); }}
							onChangeText={text => this.setState({ nome: text })}
						/>
						{<Text style={styles.errorText}>{this.state.errorAluno}</Text>}
						<FormLabel labelStyle={styles.label}>Matricula</FormLabel>
						<FormInput placeholder="Digite a matricula do aluno"
							ref={el => this.matriculaInput = el}
							inputStyle={styles.input}
							placeholder='Digite seu nome'
							containerStyle={styles.inputContainer}
							placeholderTextColor='#003378'
							underlineColorAndroid='#003399'
							keyboardType='numeric'
							returnKeyType='next'
							maxLength={6}
							onChangeText={text => this.setState({ matricula: text })}
						/>
						{<Text style={styles.errorText}>{this.state.errorMatricula}</Text>}
						<FormLabel labelStyle={styles.label}>Curso</FormLabel>
						<Picker
							prompt="Selecione um curso abaixo"
							selectedValue={this.state.curso}
							onValueChange={this.onValueChange}
							mode="dialog"
							style={styles.picker}
							textStyle={styles.pickerText}
						>
							{/* <Picker.Item label="Selecione um curso" value="Selecione um curso" /> */}
							<Picker.Item label="Engenharia de Software" value="Engenharia de Software" />
							<Picker.Item label="Engenharia Mecânica" value="Engenharia Mecânica" />
							<Picker.Item label="Engenharia da Produção" value="Engenharia da Produção" />
							<Picker.Item label="Ciências da Computação" value="Ciências da Computação" />
							<Picker.Item label="Engenharia Civil" value="Engenharia Civil" />
						</Picker>
						{<Text style={styles.errorText}>{this.state.erroCurso}</Text>}
					<Button title="Cadastrar Aluno" onPress={() => this.cadastrar()}
						iconRight={{
							name: 'user-circle-o',
							type: 'font-awesome',
							color: '#ffffff',
						}}
						accessibilityLabel="Cadastrar Aluno"
						ontainerViewStyle={styles.buttonContainer}
				    backgroundColor='#003399' borderRadius={3}
					/>
				<StatusBar barStyle='light-content' />
				<DropdownAlert ref={ref => this.dropdown = ref} updateStatusBar={false}
				messageNumOfLines={1}
				defaultContainer={{paddingTop:0}}/>
			</KeyboardAvoidingView>
			</SafeAreaView>
		);
	}
}
const estilo = {
		paddingHorizontal: Platform.OS === 'ios' ? 14 : null,
		paddingVertical: Platform.OS === 'ios' ? 14 : null,
}
const styles = StyleSheet.create({
	input: {
		color: '#003398'
	},
	inputContainer: {
		borderBottomColor: '#003399'
	},
	label: {
		color:"#003399"
	},
	buttonContainer: {
		marginTop: 8,
	},
	errorText: {
		color: 'red',
		marginLeft:20,
		marginRight:20
	},
	//padding pode ser corrigido com o Platform API
	picker: {
		backgroundColor: 'white',
		...estilo,
		marginLeft: 20,
		marginRight: 20,
		borderRadius: 4,
		borderWidth: 1,
		borderColor: '#003399',
	},
	pickerText: {
		color: '#003399',
	},
});
export default CadastroAluno;
