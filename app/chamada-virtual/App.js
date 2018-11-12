import React from 'react';
import {
	ScrollView, AsyncStorage, StatusBar, LayoutAnimation,
	Animated, StyleSheet, View
} from 'react-native';
import { Card, Icon, } from 'react-native-elements'
import {
	createSwitchNavigator,
	FadeTransition,
	withFadeTransition
} from 'react-navigation-switch-transitioner'
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { Col, Grid } from "react-native-easy-grid";

//telas
import { CadastroTeacher } from './components/CadastroProfessor/cadastroProfessor';
import { LoginScreen } from './components/Login/LoginScreen'
import { CadastroDisciplina } from './components/CadastroDisciplina/CadastroDisciplina'
import { CadastroAluno } from './components/CadastroAluno/CadastroAluno';
import { ChamadaScreen } from './components/Chamada/ChamadaScreen';
import { LoadingScreen } from './components/LoadingScreen';
import { RealizaChamadaScreen } from './components/RealizarChamada';

class App extends React.Component {
	static navigationOptions = FadeTransition.navigationOptions
	static navigationOptions = {
		headerStyle: {
			backgroundColor: '#003399'
		},
		headerTitleStyle: {
			color: 'white'
		}
	};
	stata = {
		anim: new Animated.Value(0)
	};
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
		Animated.timing(this.stata.anim, { toValue: 3000, duration: 3000 }).start();
		console.log("componente montado")
	}
	fadeIn(delay, from = 0) {
		const { anim } = this.stata;
		return {
			opacity: anim.interpolate({
				inputRange: [delay, Math.min(delay + 500, 3000)],
				outputRange: [0, 1],
				extrapolate: "clamp"
			}),
			transform: [
				{
					translateY: anim.interpolate({
						inputRange: [delay, Math.min(delay + 500, 3000)],
						outputRange: [from, 0],
						extrapolate: "clamp"
					})
				}
			]
		};
	}
	render() {
		return (
			<View style={{ flex: 1 }}>
				<ScrollView>
					<Grid>
						<Col>
							<Card title="Cadastrar Alunos" titleStyle={{ color: '#103399' }}>
								<Icon size={70} name='group-add' color='#103399'
									onPress={() => this.props.navigation.navigate('CadastroAluno')} />
							</Card>
							<Card title="Criar Turma" titleStyle={{ color: '#103399' }}>
								<Icon size={70} name="school" color='#103399'
									onPress={() => this.props.navigation.navigate("Disciplina")}
								/>
							</Card>
						</Col>
						<Col>
							<Card title="Fazer Chamada" titleStyle={{ color: '#103399' }}>
								<Icon size={70} name="check" color='#103399'
									onPress={() => this.props.navigation.navigate('Chamada')} />
							</Card>
							<Card title={"Sair"} titleStyle={{ color: '#103399' }} containerStyle={{ alignItems: 'center', justifyContent: 'center' }} >
								<Icon size={70} name="live-help" color='#103399'
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
					<StatusBar barStyle='light-content' />
				</ScrollView>
				<Animated.Text
					style={[sytles.versao, this.fadeIn(1200, 10)]}
				>
					ChamadaVirtual v0.1.0
			</Animated.Text>
			<StatusBar barStyle='light-content' />
			</View>
		);
	}
}
const AuthStack = createStackNavigator({
	SignIn: LoginScreen
})
/* const tab = createBottomTabNavigator({
		cadastroProfessor:{
			screen: CadastroTeacher,
			navigationOptions: {
				tabBarLabel: 'Cadastro Professor',
				tabBarIcon: ({tintColor, focused}) => (
					<Icon
						name={'star'}
						size={24}
						color={focused ? '#003399':'red'}
						/>
				)
			}
		}
	}) */
const navBar = createStackNavigator({
	Home: {
		screen: App,
		headerLeft: null,
		navigationOptions: {
			title: 'Inicio',
			headerLeft: null,
		}
	},
	FazerChamada: {
		screen: RealizaChamadaScreen,
		navigationOptions: {
			headerTintColor: '#ffffff'
		}
	},
	CadastroAluno: {
		screen: CadastroAluno,
		navigationOptions: {
			title: 'Cadastro de alunos',
			headerTintColor: '#ffffff'
		}
	},
	Chamada: {
		screen: ChamadaScreen,
		navigationOptions: {
			title: 'Turmas',
			headerTintColor: '#ffffff'
		}
	},
	Disciplina: {
		screen: CadastroDisciplina,
		navigationOptions: {
			title: 'Criar Turmas',
			headerTintColor: '#ffffff'
		}
	},
	Professor: {
		screen: CadastroTeacher,
		navigationOptions: {
			title: 'Cadastro de professores',
			headerTintColor: '#ffffff'
		}
	},
	/* Root: { //tabBar funcionando
		screen: tab,
		navigationOptions: {
			title: 'Apenas um teste aleatório'
		}
	}, */
});
sytles = StyleSheet.create({
	versao: {
		alignItems: 'center',
		alignContent: 'center',
		color: '#003399',
		fontSize: 12,

	}
})
//aparentemente a animação não está funcionando no android# TODO
export default createSwitchNavigator({
	Loading: withFadeTransition(LoadingScreen),
	App: withFadeTransition(navBar),
	Auth: withFadeTransition(AuthStack),
})
