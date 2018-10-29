import React from 'react';
import {
  View, Text, TextInput, KeyboardAvoidingView, Button,
  StyleSheet, ScrollView, Platform
} from 'react-native';

export class CadastroAluno extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      nome: " ",
      matricula: " ",
      cadeira: " ",
      curso: ""
    }
  }
  cadastrar() {
    let data = {
      "course": this.state.curso,
      "id_subscription": this.state.matricula,
      "name": this.state.nome,
      "subject": [this.state.cadeira]
    }
    const datajson = JSON.stringify(data);
    fetch("http://169.254.235.9:8000/api/alunos", {
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
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled={Platform.OS === 'ios'} >
        <ScrollView >
          {/* <StatusBar backgroundColor='black'/> */}
          <View style={{ alignItems: 'center', }}>
            <Text style={styles.headerText}>Nome do aluno</Text>
            <TextInput placeholder="Digite o nome do aluno"
              style={styles.textInput}
              autoCapitalize='words'
              returnKeyType='next'
              //onSubmitEditing={() => { this.secondTextInput.focus(); }}
              blurOnSubmit={false}
              onChangeText={text => this.setState({ nome: text })}
            />
          </View>
          <View style={{ alignItems: 'center', }}>
            <Text style={styles.headerText}>Matricula do aluno</Text>
            <TextInput placeholder="Digite a matricula do aluno"
              style={styles.textInput}
              keyboardType='numeric'
              maxLength={6}
              onChangeText={text => this.setState({ matricula: text })}
            />
          </View>
          <View style={{ alignItems: 'center', }}>
            <Text style={styles.headerText}>Curso</Text>
            <TextInput placeholder="Digite o nome do curso(ES,CC)"
              style={styles.textInput}
              // keyboardType='numeric'
              // maxLength={6}
              autoCapitalize="none"
              onChangeText={text => this.setState({ curso: text })}
            />
          </View>
          <View style={{ alignItems: 'center', }}>
            <Text style={styles.headerText}>Disciplina</Text>
            <TextInput placeholder="Digite o id da disciplinar"
              style={styles.textInput}
              keyboardType='numeric'
              returnKeyType='next'
              //onSubmitEditing={() => { this.secondTextInput.focus(); }}
              blurOnSubmit={false}
              onChangeText={text => this.setState({ cadeira: text })}
            />
          </View>
          <Button title="Cadastrar" onPress={() => this.cadastrar()}
            accessibilityLabel="Cadastrar alunos" />
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
  textInput: {
    height: 40,
    width: "95%",
    borderColor: 'black',
    borderRadius: 4,
    borderWidth: 1,
    marginBottom: 20,
    backgroundColor: 'white',
  },
  headerText: {
    fontSize: 15,
    paddingTop: 5,
  }
});
export default CadastroAluno;