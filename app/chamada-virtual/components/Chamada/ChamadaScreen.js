import React from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet, ScrollView, AsyncStorage, Platform, Alert
} from 'react-native';
import { ListItem } from 'react-native-elements';

export class ChamadaScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      disciplina: '',
      matricula: '',
      aluno: '',
      apialunos: [],
      token: " "
    }
  }
  // remove as aspas
  // var someStr = 'He said "Hello, my name is Foo"';
  // console.log(someStr.replace(/['"]+/g, ''));
  getAlunos() {
    fetch("http://169.254.235.9:8000/api/alunos", {
      method: 'GET',
      headers: {
        Authorization: "Token a167012bd6d0df32632084a15e81fee055f366e4",
      },
    }).then(dados => dados.json()).then(dados => {
      this.setState({
        apialunos: dados
      })
    })
      .catch(error => {
        Alert.alert(JSON.stringify(error))
      });
  }
  componentDidMount() {
    //url = "https://daviwesleyvk.pythonanywhere.com/api/alunos";
    AsyncStorage.getItem('token', (err, result) => {
      this.setState({ token: result })
      console.log("token dentro do Async", this.state.token)
    });
    //console.log("sem aspas", this.state.token.replace(/['"]+/g, ''))
    this.getAlunos()
  }
  render() {
    return (
      <KeyboardAvoidingView behavior="padding" enabled={Platform.OS === 'ios'} >
        {/* renderizar os alunos */}
        <ScrollView style={{ padding: 15 }}>
          {this.state.apialunos.map
            ((alunos, index) => (
              <ListItem
                title={alunos.name}
                key={index}
              />
            ))}
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
export default ChamadaScreen;
