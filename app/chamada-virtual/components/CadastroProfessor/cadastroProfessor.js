import React from 'react';
import { View, Text, TextInput, KeyboardAvoidingView, Button, 
StyleSheet } from 'react-native';

export class CadastroTeacher extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      nome:" ",
    }
  }
  cadastrar(){
    let data = {     
      "name": this.state.nome
    }
    const datajson = JSON.stringify(data);
    fetch("http://169.254.235.9:8000/api/professores",{
      method:'POST',
      headers:{
        Authorization: "Token a167012bd6d0df32632084a15e81fee055f366e4",
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body:datajson
    }).then(dados => dados.json()).then(dados => console.log(dados))
    .catch(error => {
      console.log(error)
      Alert.alert(JSON.stringify(error))
    });
  }
  render() {
      return (
        <KeyboardAvoidingView  behavior="padding" enabled={Platform.OS === 'ios'} >
        {/* <StatusBar backgroundColor='black'/> */}
          <View style={{alignItems: 'center',}}>
          <Text style={styles.headerText}>Nome do Professor</Text>
          <TextInput placeholder="Digite o nome do professor"
                     style={styles.textInput}
                     autoCapitalize='words'
                     returnKeyType='next'
                     //onSubmitEditing={() => { this.secondTextInput.focus(); }}
                     blurOnSubmit={false}
                     onChangeText={text => this.setState({nome:text})}
          />
          </View>
          <Button title="Cadastrar" onPress={() => this.cadastrar() }
           accessibilityLabel="Cadastrar alunos"/>
           
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
      backgroundColor:'white',
    },
    headerText:{
      fontSize: 15,
      paddingTop: 5,
    }
  });
export default CadastroTeacher;