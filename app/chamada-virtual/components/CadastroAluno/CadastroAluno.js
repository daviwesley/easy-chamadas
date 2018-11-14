import React from 'react';
import {
	View, Text, TextInput, KeyboardAvoidingView,
	StyleSheet, ScrollView, Platform, AsyncStorage,
	Alert, StatusBar, Keyboard
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Button, PricingCard } from 'react-native-elements';
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
			<KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled={Platform.OS === 'ios'} >
				<ScrollView decelerationRate={0.9}>
					{/* <StatusBar backgroundColor='black'/> */}
					<View style={styles.textContainer}>
						<Text style={styles.headerText}>Nome do aluno</Text>
						<TextInput placeholder="Digite o nome do aluno"
							style={styles.textInput}
							autoCapitalize='words'
							returnKeyType='next'
							onSubmitEditing={() => { this.matriculaInput.focus(); }}
							blurOnSubmit={false}
							onChangeText={text => this.setState({ nome: text })}
						/>
						{<Text style={{ color: 'red' }}>{this.state.errorAluno}</Text>}
					</View>
					<View style={styles.textContainer}>
						<Text style={styles.headerText}>Matricula do aluno</Text>
						<TextInput placeholder="Digite a matricula do aluno"
							ref={el => this.matriculaInput = el}
							style={styles.textInput}
							keyboardType='numeric'
							returnKeyType='next'
							maxLength={6}
							onChangeText={text => this.setState({ matricula: text })}
						/>
						{<Text style={{ color: 'red' }}>{this.state.errorMatricula}</Text>}
					</View>
					<View style={styles.textContainer}>
						<Text style={styles.headerText}>Curso</Text>
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
						{<Text style={{ color: 'red' }}>{this.state.erroCurso}</Text>}
					</View>

					<Button title="Cadastrar Aluno" onPress={() => this.cadastrar()}
						iconRight={{
							name: 'user-circle-o',
							type: 'font-awesome',
							color: '#ffffff',
						}}
						accessibilityLabel="Cadastrar Aluno"
						buttonStyle={styles.buttonStyle}
						fontSize={15}
						fontWeight='bold'
						containerViewStyle={styles.buttonContainer}
					/>
				</ScrollView>
				<StatusBar barStyle='light-content' />
				<DropdownAlert ref={ref => this.dropdown = ref} updateStatusBar={false}
				messageNumOfLines={1}
				defaultContainer={{paddingTop:0}}/>
			</KeyboardAvoidingView>
		);
	}
}
const estilo = {
		paddingHorizontal: Platform.OS === 'ios' ? 16 : null,
		paddingVertical: Platform.OS === 'ios' ? 16 : null,
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#e5e5e5"
	},
	textContainer: {
		marginLeft: 2,
		marginRight: 2,
		alignItems: 'center'
	},
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
		fontSize: 15,
		paddingTop: 5,
		color: '#003399',
		fontWeight: 'bold'
	},
	buttonContainer: {
		marginLeft: 2,
		marginRight: 2,
		paddingTop: 3
	},
	buttonStyle: {
		backgroundColor: '#003399',
		borderRadius: 4,
	},
	formInputContainer: {
		marginLeft: 2,
		marginRight: 2,
		borderBottomColor: 'black'
	},
	//padding pode ser corrigido com o Platform API
	picker: {
		backgroundColor: 'white',
		...estilo,
		marginLeft: 1,
		marginRight: 1,
		borderRadius: 4,
		borderWidth: 1,
		borderColor: '#003399',
	},
	pickerText: {
		color: '#003399',
	},
	textStyle: {
    fontSize: 18,
    textAlign: 'center',
    padding: 10,
  },
});
export default CadastroAluno;
