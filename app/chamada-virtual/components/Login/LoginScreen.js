import React from 'react';
import { View, Text, TextInput, KeyboardAvoidingView, Button, 
StyleSheet, AsyncStorage } from 'react-native';

export class LoginScreen extends React.Component {
    constructor(props){
      super(props)
      this.state = {
        usuario:"",
        senha:""
      }
    }
    componentWillMount(){  
      AsyncStorage.getItem('token', (err, result) => {
        if(result !== null){
          // Alert.alert("Ja temos seu login")
          // Alert.alert(result)
          this.props.navigation.push("Home")
        }else{
          Alert.alert(err,"Sem login")
        }
      });
    }
    fazerLogin(){
      Alert.alert(this.state.usuario, this.state.senha)
      getToken(this.state.usuario, this.state.senha)
      .then(result =>{
        AsyncStorage.setItem('token', JSON.stringify(result.token));
        this.props.navigation.push("Home")
      }).catch( erro =>{
        Alert.alert("Erro",JSON.stringify(erro))
      })
    }
    render() {
        return (
          <KeyboardAvoidingView  behavior="padding" enabled={Platform.OS === 'ios'} >
          {/* <StatusBar backgroundColor='black'/> */}
            <View style={{alignItems: 'center',}}>
            <Text style={styles.headerText}>Nome do usuário</Text>
            <TextInput placeholder="Digite o nome da disciplina"
                       style={styles.textInput}
                       autoCapitalize="none"
                       value={this.props.usuario}
                       returnKeyType='next'
                       //onSubmitEditing={() => { this.secondTextInput.focus(); }}
                       blurOnSubmit={false}
                       onChangeText={text => this.setState({usuario:text})}
            />
            <Text style={styles.headerText}>Senha</Text>
            <TextInput placeholder="Digite a senha do usuário"
                       style={styles.textInput}
                       autoCapitalize="none"
                       value={this.props.senha}
                       secureTextEntry={true}
                       password={true}
                       returnKeyType='next'
                       //onSubmitEditing={() => { this.secondTextInput.focus(); }}
                       blurOnSubmit={false}
                       onChangeText={text => this.setState({senha:text})}
            />
            </View>
            <Button title="Cadastrar" onPress={() =>  this.fazerLogin() }
             accessibilityLabel="Cadastrar disciplina"/>
             
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
      backgroundColor:'white',
    },
    headerText:{
      fontSize: 15,
      paddingTop: 5,
    }
  });

export default LoginScreen;