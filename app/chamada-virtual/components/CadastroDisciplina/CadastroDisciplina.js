import React from 'react';
import {
  View, Text, TextInput, KeyboardAvoidingView,
  StyleSheet, Platform, ScrollView,
} from 'react-native';

import { Button } from 'react-native-elements';

export class CadastroDisciplina extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      disciplina: " ",
      lista: "",
      horas: "",
      creditos: "",
      professor: []
    }
  }
  cadastrar() {
    let data = {
      "name": this.state.disciplina,
      "hours": this.state.horas,
      "credit": this.state.creditos,
      "teacher": [this.state.professor]
    }
    const datajson = JSON.stringify(data);
    fetch("http://169.254.235.9:8000/api/disciplinas", {
      method: 'POST',
      headers: {
        Authorization: "Token a167012bd6d0df32632084a15e81fee055f366e4",
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: datajson
    }).then(dados => dados.json()).then(dados => console.log(dados))
      .catch(error => {
        console.log(error)
        Alert.alert(JSON.stringify(error))
      });
  }
  render() {
    return (
      <KeyboardAvoidingView behavior="padding" enabled={Platform.OS === 'ios'} >
        <ScrollView>
          {/* <StatusBar backgroundColor='black'/> */}
          <View style={styles.textContainer}>
            <Text style={styles.headerText}>Nome da disciplina</Text>
            <TextInput placeholder="Digite o nome da disciplina"
              style={styles.textInput}
              autoCapitalize='words'
              returnKeyType='next'
              //onSubmitEditing={() => { this.secondTextInput.focus(); }}
              blurOnSubmit={false}
              onChangeText={text => this.setState({ disciplina: text })}
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.headerText}>Quantidade de horas</Text>
            <TextInput placeholder="Digite o número de horas"
							style={styles.textInput}
							clearButtonMode='always'
              keyboardType='numeric'
              returnKeyType='next'
              //onSubmitEditing={() => { this.secondTextInput.focus(); }}
              blurOnSubmit={false}
              onChangeText={text => this.setState({ horas: text })}
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.headerText}>Quantidade de créditos</Text>
            <TextInput placeholder="Digite o número de créditos"
              style={styles.textInput}
              keyboardType='numeric'
              returnKeyType='next'
              //onSubmitEditing={() => { this.secondTextInput.focus(); }}
              blurOnSubmit={false}
              onChangeText={text => this.setState({ creditos: text })}
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.headerText}>Nome do professor</Text>
            <TextInput placeholder="Digite o nome do professor"
              style={styles.textInput}
              keyboardType='numeric'
              returnKeyType='next'
              //onSubmitEditing={() => { this.secondTextInput.focus(); }}
              blurOnSubmit={false}
              onChangeText={text => this.setState({ professor: text })}
            />
          </View>
          <Button title="Cadastrar Disciplina" onPress={() => this.cadastrar()}
						accessibilityLabel="Cadastrar Disciplina"
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
export default CadastroDisciplina;
