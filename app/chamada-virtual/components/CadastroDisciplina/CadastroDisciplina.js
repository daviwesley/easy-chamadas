import React from 'react';
import {
	View, Text, TextInput, KeyboardAvoidingView,
	StyleSheet, Platform, ScrollView, StatusBar,
	AsyncStorage, Alert
} from 'react-native';

import { Button } from 'react-native-elements';
import { inserirTurma } from '../../controllers'

export class CadastroDisciplina extends React.Component {
	static navigationOptions = {
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
			aluno: '',
			turma: '',
			professor: '',
			token: ''
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
		const data = {
			"teacher": this.state.professor,
			"name": this.state.turma,
			"students": this.state.aluno
		}
		try {
      inserirTurma(this.state.aluno, this.state.professor, this.state.turma, this.state.token)
    } catch (error) {
      console.log('erro em ', error)
    }
	}
	render() {
		return (
			<KeyboardAvoidingView behavior="padding" enabled={Platform.OS === 'ios'} >
				<ScrollView>
					{/* <StatusBar backgroundColor='black'/> */}
					<View style={styles.textContainer}>
						<Text style={styles.headerText}>Nome da turma</Text>
						<TextInput placeholder="Digite o nome da turma"
							style={styles.textInput}
							autoCapitalize='words'
							returnKeyType='next'
							onSubmitEditing={() => { this.horasInput.focus(); }}
							blurOnSubmit={false}
							onChangeText={text => this.setState({ turma: text })}
						/>
					</View>
					<View style={styles.textContainer}>
						<Text style={styles.headerText}>Nome do professor</Text>
						<TextInput placeholder="Digite o nome do professor"
							ref={el => this.horasInput = el}
							style={styles.textInput}
							returnKeyType='next'
							onSubmitEditing={() => { this.alunoInput.focus()}}
							blurOnSubmit={false}
							onChangeText={text => this.setState({ professor: text })}
						/>
					</View>
					<View style={styles.textContainer}>
						<Text style={styles.headerText}>Aluno</Text>
						<TextInput placeholder="Digite o nome do alunor"
							ref={el => this.alunoInput = el}
							style={styles.textInput}
							returnKeyType='go'
							onSubmitEditing={() => { this.cadastrar(); }}
							blurOnSubmit={false}
							onChangeText={text => this.setState({ aluno: text })}
						/>
					</View>
					<Button title="Cadastrar Disciplina" onPress={() => this.cadastrar()}
						accessibilityLabel="Cadastrar Disciplina"
						buttonStyle={styles.buttonStyle}
						fontSize={15}
						fontWeight='bold'
						containerViewStyle={styles.buttonContainer}
					/>
				</ScrollView>
				<StatusBar barStyle='light-content' />
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
		color:'#003399',
		fontWeight:'bold'
	},
	buttonContainer: {
		marginLeft: 2,
		marginRight: 2,
		paddingTop: 3,
	},
	buttonStyle: {
		backgroundColor: '#003399',
		borderRadius: 4
	},
	formInputContainer: {
		marginLeft: 2,
		marginRight: 2,
		borderBottomColor: 'transparent'
	},
});
export default CadastroDisciplina;
