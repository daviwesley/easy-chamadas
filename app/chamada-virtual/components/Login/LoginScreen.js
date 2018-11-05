import React from 'react';
import {
  View, Text, TextInput, KeyboardAvoidingView, Button,
  StyleSheet, AsyncStorage, Alert, ScrollView, Platform
} from 'react-native';

import { getToken } from '../../controllers'

export class LoginScreen extends React.Component {
	static navigationOptions = {
		title: 'Login',
	};
  constructor(props) {
    super(props)
    this.state = {
      usuario: "",
      senha: ""
    }
  }
  componentWillMount() {
    AsyncStorage.getItem('token', (err, result) => {
      if (result !== null) {
        // Alert.alert("Ja temos seu login")
        // Alert.alert(result)
        this.props.navigation.push("Home")
      } else {
        Alert.alert("Seja Bem Vindo!", "Faça o login para prosseguir :)")
      }
    });
  }
  fazerLogin() {
    //Alert.alert(this.state.usuario, this.state.senha)
    getToken(this.state.usuario, this.state.senha)
      .then(result => {
        AsyncStorage.setItem('token', JSON.stringify(result.token));
        this.props.navigation.navigate("Home")
      }).catch(erro => {
        if (erro.non_field_errors) {
          Alert.alert("Erro", "Usuário ou senha incorretas")
        } else if (erro.username || erro.password) {
          Alert.alert("Erro", "Preencha todos os campos")
        } else {
          Alert.alert("Erro", "Sem conexão com a internet")
        }
      })
  }
  render() {
    return (
      <KeyboardAvoidingView behavior="padding" enabled={Platform.OS === 'ios'} >
        {/* <StatusBar backgroundColor='black'/> */}
        <ScrollView>
          <View style={{ alignItems: 'center', }}>
            <Text style={styles.headerText}>Nome do usuário</Text>
            <TextInput placeholder="Digite o nome da disciplina"
              style={styles.textInput}
			  autoCapitalize="none"
			  autoCorrect={false}
              value={this.props.usuario}
              returnKeyType='next'
              onSubmitEditing={() => { this.secondTextInput.focus(); }}
              blurOnSubmit={false}
              onChangeText={text => this.setState({ usuario: text })}
            />
            <Text style={styles.headerText}>Senha</Text>
			<TextInput placeholder="Digite a senha do usuário"
			  ref={el => this.secondTextInput = el}
              style={styles.textInput}
              autoCapitalize="none"
              value={this.props.senha}
              secureTextEntry={true}
              password={true}
              returnKeyType='send'
              //onSubmitEditing={() => { this.secondTextInput.focus(); }}
              blurOnSubmit={false}
              onChangeText={text => this.setState({ senha: text })}
            />
          </View>
          <Button title="Entrar" onPress={() => this.fazerLogin()}
            accessibilityLabel="Entrar" />
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
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


export default LoginScreen;
