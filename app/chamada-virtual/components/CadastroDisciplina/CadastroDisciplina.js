import React from 'react';
import { View, Text, TextInput, KeyboardAvoidingView, Button, 
StyleSheet, Platform } from 'react-native';

export class CadastroDisciplina extends React.Component {
    constructor(props){
        super(props)
        this.state = {
          disciplina:" ",
          lista:"",
          horas:"",
          creditos:"",
          professor:[]
        }
      }
      cadastrar(){
        let data = {     
          "name": this.state.disciplina,
          "hours": this.state.horas,
          "credit": this.state.creditos,
          "teacher": this.state.professor
        }
        const datajson = JSON.stringify(data);
        fetch("http://169.254.235.9:8000/api/disciplinas",{
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
            <ScrollView>
            {/* <StatusBar backgroundColor='black'/> */}
              <View style={{alignItems: 'center',}}>
              <Text style={styles.headerText}>Nome da disciplina</Text>
              <TextInput placeholder="Digite o nome da disciplina"
                         style={styles.textInput}
                         autoCapitalize='words'
                         returnKeyType='next'
                         //onSubmitEditing={() => { this.secondTextInput.focus(); }}
                         blurOnSubmit={false}
                         onChangeText={text => this.setState({disciplina:text})}
              />
              </View>
              <View style={{alignItems: 'center',}}>
              <Text style={styles.headerText}>Quantidade de horas</Text>
              <TextInput placeholder="Digite o número de horas"
                         style={styles.textInput}
                         keyboardType='numeric'
                         returnKeyType='next'
                         //onSubmitEditing={() => { this.secondTextInput.focus(); }}
                         blurOnSubmit={false}
                         onChangeText={text => this.setState({horas:text})}
              />
              </View>
              <View style={{alignItems: 'center',}}>
              <Text style={styles.headerText}>Quantidade de créditos</Text>
              <TextInput placeholder="Digite o número de créditos"
                         style={styles.textInput}
                         keyboardType='numeric'
                         returnKeyType='next'
                         //onSubmitEditing={() => { this.secondTextInput.focus(); }}
                         blurOnSubmit={false}
                         onChangeText={text => this.setState({creditos:text})}
              />
              </View>
              <View style={{alignItems: 'center',}}>
              <Text style={styles.headerText}>Nome do professor</Text>
              <TextInput placeholder="Digite o nome do professor"
                         style={styles.textInput}
                         keyboardType='numeric'
                         returnKeyType='next'
                         //onSubmitEditing={() => { this.secondTextInput.focus(); }}
                         blurOnSubmit={false}
                         onChangeText={text => this.setState({professor:text})}
              />
              </View>
              <Button title="Cadastrar" onPress={() => this.cadastrar() }
               accessibilityLabel="Cadastrar disciplina"/>
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
      backgroundColor:'white',
    },
    headerText:{
      fontSize: 15,
      paddingTop: 5,
    }
  });

export default CadastroDisciplina;