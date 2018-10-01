import React from 'react';
import { StyleSheet, View, TextInput , Text, Button, KeyboardAvoidingView,
Picker,
} from 'react-native';
import { Card, Icon,} from 'react-native-elements'
import { createStackNavigator } from 'react-navigation';
import { Col, Grid } from "react-native-easy-grid";
import { getAlunos} from './controllers'

//import { Cadastro } from './components/cadastro';

// tela de cadastramento de aluno
export class Cadastro extends React.Component {
  render() {
      return (
        <KeyboardAvoidingView  behavior="padding" enabled>
          <Text style={styles.headerText}>Nome do aluno</Text>
          <TextInput placeholder="Digite o nome do aluno"
                     //style={styles.textInput}
                     autoCapitalize='words'
                     returnKeyType='next'
                     //onSubmitEditing={() => { this.secondTextInput.focus(); }}
                     blurOnSubmit={false}
          />
          <Text style={styles.headerText}>Matricula do aluno</Text>
          <TextInput placeholder="Digite a matricula do aluno"
                   //style={styles.textInput}
                    keyboardType='numeric'
                    maxLength={6}
          />
          <Button title="Cadastrar" onPress={() => getAlunos() }/>
        </KeyboardAvoidingView>
      );
    }
  }

// Tela da chamada
  export class ChamadaScreen extends React.Component {

    constructor(){
      super();
      this.state={
        PickerValueHolder : ''
      }
    }

    render() {
        return (
          <KeyboardAvoidingView  behavior="padding" enabled>
          <Picker
            selectedValue={this.state.PickerValueHolder}
            onValueChange={(itemValue, itemIndex) => this.setState({PickerValueHolder: itemValue})} >
            <Picker.Item label="React Native" value="React Native" />
            <Picker.Item label="Java" value="Java" />
            <Picker.Item label="Html" value="Html" />
            <Picker.Item label="Php" value="Php" />
            <Picker.Item label="C++" value="C++" />
            <Picker.Item label="JavaScript" value="JavaScript" />
            <Text>Escolha um aluno</Text>
    
          </Picker>
          </KeyboardAvoidingView>
        );
      }
    }

class App extends React.Component {

render() {
    return (
      <Grid>
        <Col>
          <Card title="Cadastrar Alunos">
            <Icon size={35} name='group-add' 
            onPress={() => this.props.navigation.navigate('CadastroAluno')} />
          </Card>
          <Card title="Fazer chamadas">
            <Icon size={35} name="check-circle"
            />
          </Card>
        </Col>
        <Col>
          <Card title="Fazer Chamada">
            <Icon size={35} name="check"
            onPress={() => this.props.navigation.navigate('Chamada')}/>
          </Card>
          <Card title="Sobre Nós" >
            <Icon size={35} name="live-help"/>
          </Card>
        </Col>
      </Grid>
    );
  }
}

const navBar = createStackNavigator({
  Home: {
    screen: App,
    navigationOptions: {
      title: 'Inicio'
    }
  },
  CadastroAluno: {
    screen: Cadastro,
    navigationOptions: {
      title: 'Cadastrar Aluno'
    }
  },
  Chamada: {
    screen: ChamadaScreen,
    navigationOptions: {
      title: 'Cadastrar Aluno'
    }
  },
});

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
    borderColor: 'gray', 
    borderRadius: 2,
    borderWidth: 1,  
    marginBottom: 20
  },
  headerText:{
    fontSize: 15,
    fontWeight: 'bold',
  }
});
export default navBar