import React, { Component } from 'react'
import { ActivityIndicator, ScrollView, StatusBar, View } from 'react-native'
import { ListItem } from 'react-native-elements'

import { getAlunosFromTurma, inserirFalta } from '../../controllers'
import DropdownAlert from 'react-native-dropdownalert';

export class RealizaChamadaScreen extends Component {
	static navigationOptions = ({ navigation }) => ({
		title: `${navigation.state.params.title}`,
		headerStyle: {
			backgroundColor: '#003399'
		},
		headerTitleStyle: {
			color: 'white'
		}
	})
	constructor(props) {
		super(props)
		this.state = {
			alunos: [],
			isLoading: true,
			id_turma: '',

		}
	}
	renderLoading = () => {
		if (this.state.isLoading) {
			return (<ActivityIndicator color='#003399' style={{ marginTop: 10 }} />)
		}
	}
	realizarFalta(nome_aluno, nome_turma) {
		const tk = this.props.navigation.getParam('token')
		inserirFalta(2, nome_aluno, nome_turma, tk)
		this.dropdown.alertWithType('success', 'Sucesso!', 'Falta lançada')
	}
	componentDidMount() {
		const id = this.props.navigation.getParam('id')
		const tk = this.props.navigation.getParam('token')

		this.setState({ token: tk })
		getAlunosFromTurma(tk, id).then(dados => {
			this.setState({ alunos: dados.alunos, isLoading: false })
		}).catch(erro => Alert.alert('Erro', erro.detail))
	}
	render() {
		const { name_turma} = this.props.navigation.state.params
		return (
			<View style={{flex:1}}>
			<ScrollView>
				{this.state.alunos.map((aluno, id)=>(
					<ListItem
					leftIcon={{
						name: 'user-circle-o',
						type: 'font-awesome',
						color: '#003399',
					}}
					hideChevron
					onPress={() => this.realizarFalta(aluno.name, name_turma)}
					title={aluno.name}
					subtitle={aluno.id_subscription}
					key={id}
				/>
				))}
				<StatusBar barStyle='light-content' />
			</ScrollView>
			<DropdownAlert
				ref={ref => this.dropdown = ref}
				updateStatusBar={false}
				/>
			</View>
		)
	}
}

export default RealizaChamadaScreen
