import React, { Component } from 'react'
import { Text, ScrollView, ActivityIndicator } from 'react-native'
import { ListItem } from 'react-native-elements'
import { getTotalFaltasTurma } from '../../controllers'

export class FaltaScreen extends Component {
	constructor(props){
		super(props)
		this.state = {
			alunos: [],
			isLoading:true
		}
	}
	componentDidMount(){
		this.fetchFaltas()
	}
	fetchFaltas(){
		const id = this.props.navigation.getParam('id')
		const tk = this.props.navigation.getParam('token')
		console.log('id',id,tk)
		getTotalFaltasTurma(id,tk).then(dados => {
			this.setState({isLoading:false})
			this.setState({alunos:dados.alunos})
		})
		.catch(error => console.log(error))
	}
	renderLoading = () => {
		if(this.state.isLoading) {
			return (<ActivityIndicator color='#003399' style={{ marginTop: 10 }} />)
		}
	}
	render() {
		return (
			<ScrollView>
				{this.renderLoading()}
				{this.state.alunos.map((aluno, id)=>(
					<ListItem
					/* leftIcon={{
						name: 'list',
						type: 'font-awesome',
						color: '#003399',
					}} */
					hideChevron
					title={aluno.name}
					subtitle={aluno.faults}
					key={id}
				/>
				))}
			</ScrollView>
		)
	}
}

export default FaltaScreen
