import React from 'react';
import { ScrollView, AsyncStorage, StatusBar, LayoutAnimation } from 'react-native';
import { Card, Icon, } from 'react-native-elements'
import {
	createSwitchNavigator,
	FadeTransition, withTransition,
	withFadeTransition
} from 'react-navigation-switch-transitioner'
import { createStackNavigator } from 'react-navigation';
import { Col, Grid } from "react-native-easy-grid";

//telas
import { CadastroTeacher } from './components/CadastroProfessor/cadastroProfessor';
import { LoginScreen } from './components/Login/LoginScreen'
import { CadastroDisciplina } from './components/CadastroDisciplina/CadastroDisciplina'
import { CadastroAluno } from './components/CadastroAluno/CadastroAluno';
import { ChamadaScreen } from './components/Chamada/ChamadaScreen';
import { LoadingScreen } from './components/LoadingScreen';

//funções e variaveis

class App extends React.Component {
	static navigationOptions = FadeTransition.navigationOptions
	constructor(props) {
		super(props)
		this.state = {
			dados: ''
		}
	}
	sair() {
		AsyncStorage.removeItem('token')
		this.props.navigation.navigate("Auth")
	}

	componentDidMount() {
		LayoutAnimation.linear()
		console.log("componente montado")
	}
	render() {
		return (
				<ScrollView>
					<Grid>
						<Col>
							<Card title="Cadastrar Alunos">
								<Icon size={70} name='group-add'
									onPress={() => this.props.navigation.navigate('CadastroAluno')} />
							</Card>
							<Card title="Cadastrar Disciplina">
								<Icon size={70} name="school"
									onPress={() => this.props.navigation.navigate("Disciplina")}
								/>
							</Card>
						</Col>
						<Col>
							<Card title="Fazer Chamada">
								<Icon size={70} name="check"
									onPress={() => this.props.navigation.navigate('Chamada')} />
							</Card>
							<Card title={"Sair"+`\n`} containerStyle={{alignItems:'center', justifyContent:'center'}} >
								<Icon size={70} name="live-help"
									// raised={true}
									onPress={() => this.sair()} />
							</Card>
							{/* <Card title={"Cadastrar Professor"} >
								<Icon size={70} name="account-circle"
									// raised={true}
									onPress={() => this.props.navigation.navigate("Professor")} />
							</Card> */}
						</Col>
					</Grid>
					<StatusBar backgroundColor="blue" />
				</ScrollView>
		);
	}
}
const AuthStack = createStackNavigator({
	SignIn: LoginScreen
})

const navBar = createStackNavigator({
	Home: {
		screen: App,
		headerLeft: null,
		navigationOptions: {
			title: 'Inicio',
			headerLeft: null,
		}
	},
	CadastroAluno: {
		screen: CadastroAluno,
		navigationOptions: {
			title: 'Cadastrar Aluno'
		}
	},
	Chamada: {
		screen: ChamadaScreen,
		navigationOptions: {
			title: 'Fazer chamada'
		}
	},
	Disciplina: {
		screen: CadastroDisciplina,
		navigationOptions: {
			title: 'Cadastrar disciplina'
		}
	},
	Professor: {
		screen: CadastroTeacher,
		navigationOptions: {
			title: 'Cadastrar professor'
		}
	},
});

//aparentemente a animação não está funcionando # TODO
export default createSwitchNavigator({
	Loading: withFadeTransition(LoadingScreen),
	App: withFadeTransition(navBar),
	Auth: withFadeTransition(AuthStack),
})
