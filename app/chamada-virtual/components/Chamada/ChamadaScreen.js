import React from 'react';
import { View, Text, TextInput, KeyboardAvoidingView, Button, 
        StyleSheet, ScrollView, AsyncStorage } from 'react-native';
import { ListItem } from 'react-native-elements';

import { getAlunos, getToken} from '../../controllers'

export class ChamadaScreen extends React.Component {
    constructor(){
        super();
        this.state={
          disciplina : '',
          matricula: '',
          aluno:'',
          apialunos:[],
          token:" "
        }
      }
      // remove as aspas
      // var someStr = 'He said "Hello, my name is Foo"';
      // console.log(someStr.replace(/['"]+/g, ''));
      componentDidMount(){
        //url = "https://daviwesleyvk.pythonanywhere.com/api/alunos";
        AsyncStorage.getItem('token', (err, result) =>{
          this.setState({token:result})
          console.log("token dentro do Async",this.state.token)
        });
        //console.log("sem aspas", this.state.token.replace(/['"]+/g, ''))
      }
      render() {
          return (
            <KeyboardAvoidingView  behavior="padding" enabled={Platform.OS === 'ios'} >
          {/* <StatusBar backgroundColor='black'/> */}
            <View style={{alignItems: 'center',}}>
            <Text style={styles.headerText}>Nome do aluno</Text>
            <TextInput placeholder="Digite o nome do aluno"
                       style={styles.textInput}
                       autoCapitalize='words'
                       returnKeyType='next'
                       //onSubmitEditing={() => { this.secondTextInput.focus(); }}
                       blurOnSubmit={false}
                       onChangeText={text => this.setState({aluno:text})}
            />
            </View>
            <View style={{alignItems: 'center',}}>
            <Text style={styles.headerText}>Matricula do aluno</Text>
            <TextInput placeholder="Digite a matricula do aluno"
                      style={styles.textInput}
                      keyboardType='numeric'
                      maxLength={6}
                      onChangeText={text => this.setState({matricula:text})}
            />
            </View>
            <View style={{alignItems: 'center',}}>
            <Text style={styles.headerText}>Disciplina</Text>
            <TextInput placeholder="Digite a disciplina"
                      style={styles.textInput}
                      onChangeText={text => this.setState({disciplina:text})}
            />
            </View>
            <Button title="Cadastrar" onPress={() => null }
             accessibilityLabel="Cadastrar alunos"/>
             {/* renderizar os alunos */}
            <ScrollView style={{padding:15}}>
            {this.state.apialunos.map
            ((alunos, index) =>(
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
      backgroundColor:'white',
    },
    headerText:{
      fontSize: 15,
      paddingTop: 5,
    }
});
export default ChamadaScreen;