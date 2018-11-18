import React from 'react';
import {
	ScrollView, Text, KeyboardAvoidingView,
	StyleSheet, Platform, Keyboard, StatusBar,
	AsyncStorage, Alert
} from 'react-native';

import { Button, FormInput, FormLabel } from 'react-native-elements';
import { inserirTurma, getallAlunos, getTeacherName } from '../../controllers'
import { Picker } from 'react-native-picker-dropdown';
import DropdownAlert from 'react-native-dropdownalert';


export class CadastroDisciplina extends React.Component {
	static navigationOptions = {
		headerStyle: {
			backgroundColor: '#003399'
		},
		headerTitleStyle: {
			color: 'white'
		},
	};
	constructor(props) {
		super(props)
		this.state = {
			alunoLista: [],
			alunoSelected: '',
			alunos: '',
			turma: '',
			professor: '',
			token: '',
			erro: '',
		}
		this.onValueChange = this.handleValueChange.bind(this)
	}
	componentDidMount() {
		AsyncStorage.getItem('token').then(dados => {
			this.setState({ token: dados.replace(/['"]+/g, '') })
			getallAlunos(this.state.token).then(alunos => {
				this.setState({ alunoLista: alunos })
			})
			getTeacherName(this.state.token).then(dados => this.setState({professor:dados.name}))
			.catch(erro => Alert.alert('Erro', JSON.stringify(erro)))
		})
	}
	handleValueChange(alunos) {
		this.setState({ alunoSelected: alunos })
	}
	cadastrar() {
		const data = {
			"teacher": this.state.professor,
			"name": this.state.turma,
			"students": this.state.alunoLista
		}
		console.log(this.state.professor)
			inserirTurma(this.state.alunoSelected, this.state.professor, this.state.turma, this.state.token)
			.then(() => {
			Alert.alert('Sucesso')
			this.setState({erro:''})
			})
			.catch(error => {
			this.setState({erro:error})
			console.log(error)
			})
	}
	render() {
		return (
			<ScrollView>
			<KeyboardAvoidingView behavior="padding" enabled={Platform.OS === 'ios'} >
					{/* <StatusBar backgroundColor='black'/> */}
					<FormLabel labelStyle={styles.label}>Nome da turma</FormLabel>
						<FormInput placeholder="Digite o nome da turma"
							inputStyle={styles.input}
							laceholder='Digite um usuário'
							containerStyle={styles.inputContainer}
							placeholderTextColor='#003378'
							underlineColorAndroid='#003399'
							autoCapitalize='words'
							blurOnSubmit={false}
							onSubmitEditing={() => Keyboard.dismiss()}
							onChangeText={text => this.setState({ turma: text })}
						/>
						{<Text style={styles.errorText}>{this.state.erro.name}</Text>}
						<FormLabel labelStyle={styles.label}>Aluno</FormLabel>
						<Picker
							prompt="Selecione um aluno"
							selectedValue={this.state.alunoSelected}
							onValueChange={this.onValueChange}
							mode="dialog"
							style={styles.picker}
							textStyle={styles.pickerText}
						>
							<Picker.Item  label='Selecione um aluno' value='' />
							{this.state.alunoLista.map((aluno, id) => (
								<Picker.Item key={id} label={aluno.name} value={aluno.name} />

							))}
						</Picker>
						{<Text style={styles.errorText}>{this.state.erro.students}</Text>}
					<Button title="Cadastrar Disciplina" onPress={() => this.cadastrar()}
						accessibilityLabel="Cadastrar Disciplina"
						containerViewStyle={styles.buttonContainer}
				    backgroundColor='#003399' borderRadius={3}
					/>
				<StatusBar barStyle='light-content' />
			</KeyboardAvoidingView>
			</ScrollView>
		);
	}

}
const estilo = {
	paddingHorizontal: Platform.OS === 'ios' ? 16 : null,
	paddingVertical: Platform.OS === 'ios' ? 16 : null,
}
const styles = StyleSheet.create({
	input: {
		color: '#003398'
	},
	errorText: {
		color: 'red',
		marginRight:20,
		marginLeft: 20
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
export default CadastroDisciplina;
