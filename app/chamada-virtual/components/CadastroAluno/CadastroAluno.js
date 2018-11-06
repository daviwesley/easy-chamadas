import React from 'react';
import {
  View, Text, TextInput, KeyboardAvoidingView,
	StyleSheet, ScrollView, Platform, AsyncStorage,
	Alert
} from 'react-native';
import { Button } from 'react-native-elements';

import { inserirAluno, getDBToken } from '../../controllers';

export class CadastroAluno extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      nome: " ",
      matricula: " ",
      cadeira: " ",
			curso: "",
			token:''
		}
	}
	componentDidMount(){
		AsyncStorage.getItem('token').then(dados => {
			this.setState({
				token: dados.replace(/['"]+/g, '')
			})
		})
	}
  cadastrar() {
		console.log("token antes da chamada",this.state.token)
		inserirAluno(this.state.nome, this.state.matricula, this.state.curso, this.state.subject,
								 this.state.token).then(dados => Alert.alert('Sucesso',JSON.stringify(dados)))
		console.log("token depois da chamada",this.state.token)
		console.log("sem aspas", this.state.token.replace(/['"]+/g, ''))
    //const datajson = JSON.stringify(data);
    //console.log(JSON.stringify(this.state))
  }
  render() {
    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled={Platform.OS === 'ios'} >
        <ScrollView >
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
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.headerText}>Matricula do aluno</Text>
						<TextInput placeholder="Digite a matricula do aluno"
							ref={el => this.matriculaInput = el}
							onSubmitEditing={() => { this.cursoInput.focus(); }}
              style={styles.textInput}
							keyboardType='numeric'
							returnKeyType='next'
              maxLength={6}
              onChangeText={text => this.setState({ matricula: text })}
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.headerText}>Curso</Text>
						<TextInput placeholder="Digite o nome do curso"
							ref={el => this.cursoInput = el}
							onSubmitEditing={() => { this.disciplinaInput.focus(); }}
              style={styles.textInput}
              returnKeyType='next'
              autoCapitalize="words"
              onChangeText={text => this.setState({ curso: text })}
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.headerText}>Disciplina</Text>
						<TextInput placeholder="Digite o nome da disciplinar"
							ref={el => this.disciplinaInput = el}
							onSubmitEditing={() => { this.cadastrar }}
              style={styles.textInput}
              returnKeyType='done'
              onSubmitEditing={() => { this.cadastrar() }}
              blurOnSubmit={false}
              onChangeText={text => this.setState({ cadeira: text })}
            />
          </View>
					<Button title="Cadastrar Aluno" onPress={() => this.cadastrar()}
						accessibilityLabel="Cadastrar Aluno"
						buttonStyle={styles.buttonStyle}
						fontSize={15}
						containerViewStyle={styles.buttonContainer}
						/>
        </ScrollView>
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
		marginLeft:2,
		marginRight:2,
		alignItems:'center'
	},
  textInput: {
		color:'black',
		height: 43,
		fontSize:15,
		width: "100%",
		borderColor: 'black',
		borderRadius: 4,
		borderWidth: 1,
		marginBottom: 3,
		backgroundColor: 'white',
	},
  headerText: {
    fontSize: 15,
    paddingTop: 5,
	},
	buttonContainer:{
		marginLeft:2,
		marginRight:2,
		paddingTop:3
	},
	buttonStyle:{
		backgroundColor:'black',
		borderRadius:4,
	},
	formInputContainer: {
		marginLeft:2,
		marginRight:2,
		borderBottomColor:'black'
	},
});
export default CadastroAluno;
