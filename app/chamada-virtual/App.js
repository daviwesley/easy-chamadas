import React from 'react';
import { StyleSheet, View, TextInput , Text, Button, KeyboardAvoidingView,
 Alert, Platform, ScrollView, AsyncStorage,
} from 'react-native';
import { Card, Icon, ListItem} from 'react-native-elements'
import { createStackNavigator } from 'react-navigation';
import { Col, Grid } from "react-native-easy-grid";
import { getAlunos, getToken} from './controllers'

//import { Cadastro } from './components/cadastro';

// tela de cadastramento de aluno
export class Cadastro extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      nomeAluno:" ",
      matricula:" ",
      disciplina:"",
    }
  }
  render() {
      return (
        <KeyboardAvoidingView  style={{flex:1}}behavior="padding" enabled={Platform.OS === 'ios'} >
        <ScrollView >
        {/* <StatusBar backgroundColor='black'/> */}
          <View style={{alignItems: 'center',}}>
          <Text style={styles.headerText}>Nome do aluno</Text>
          <TextInput placeholder="Digite o nome do aluno"
                     style={styles.textInput}
                     autoCapitalize='words'
                     returnKeyType='next'
                     //onSubmitEditing={() => { this.secondTextInput.focus(); }}
                     blurOnSubmit={false}
                     onChangeText={text => this.setState({nomeAluno:text})}
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
          <TextInput placeholder="Digite a matricula do aluno"
                    style={styles.textInput}
                    keyboardType='numeric'
                    maxLength={6}
                    onChangeText={text => this.setState({disciplina:text})}
          />
          </View>
          <Button title="Cadastrar" onPress={() => Alert.alert(this.state.nomeAluno, this.state.matricula) }
           accessibilityLabel="Cadastrar alunos"/>
        </ScrollView>
        </KeyboardAvoidingView>
      );
    }
  }
// tela de cadastro professor
export class CadastroProfessor extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      nome:" ",
    }
  }
  render() {
      return (
        <KeyboardAvoidingView  behavior="padding" enabled={Platform.OS === 'ios'} >
        {/* <StatusBar backgroundColor='black'/> */}
          <View style={{alignItems: 'center',}}>
          <Text style={styles.headerText}>Nome do Professor</Text>
          <TextInput placeholder="Digite o nome do aluno"
                     style={styles.textInput}
                     autoCapitalize='words'
                     returnKeyType='next'
                     //onSubmitEditing={() => { this.secondTextInput.focus(); }}
                     blurOnSubmit={false}
                     onChangeText={text => this.setState({nome:text})}
          />
          </View>
          <Button title="Cadastrar" onPress={() => Alert.alert(this.state.nome) }
           accessibilityLabel="Cadastrar alunos"/>
           
        </KeyboardAvoidingView>
      );
    }
  }
// tela de login
export class LoginScreen extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      usuario:"",
      senha:""
    }
  }
  componentWillMount(){
    // AsyncStorage.setItem('token', JSON.stringify(result.token));
    AsyncStorage.getItem('token', (err, result) => {
      if(result !== null){
        // Alert.alert("Ja temos seu login")
        Alert.alert(result)
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

// tela de cadastro de Disciplina
export class CadastroDisciplina extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      disciplina:" ",
    }
  }
  render() {
      return (
        <KeyboardAvoidingView  behavior="padding" enabled={Platform.OS === 'ios'} >
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
          <Button title="Cadastrar" onPress={() => Alert.alert(this.state.disciplina) }
           accessibilityLabel="Cadastrar disciplina"/>
           
        </KeyboardAvoidingView>
      );
    }
  }

// Tela da chamada
  export class ChamadaScreen extends React.Component {

    constructor(){
      super();
      this.state={
        disciplina : '',
        matricula: '',
        aluno:'',
        apialunos:[{
          "name": "Zoë Hange",
          "id_subscription": 314685,
          "course": "ES"
          },
          {
          "name": "MIkasa Alckerman",
          "id_subscription": 798564,
          "course": "ES"
          },],
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
      });
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

class App extends React.Component {
constructor(props){
  super(props)
  this.state = {
    dados:''
  }
}
componentDidMount(){
  
}
render() {
    return (
      <ScrollView>
      <Grid>
        <Col>
          <Card title="Cadastrar Alunos">
            <Icon size={70} name='group-add' 
            onPress={() => this.props.navigation.navigate('CadastroAluno')} />
          </Card>
          <Card title="Cadastrar Disciplina">
            <Icon size={70} name="school"
            onPress={() => this.props.navigation.navigate("Disciplina")}
            />
          </Card>
          <Card title={"Chamadas"} >
            <Icon size={70} name="live-help"
            // raised={true}
            onPress={() => this.props.navigation.navigate("C")}/>
          </Card>
        </Col>
        <Col>
          <Card title="Fazer Chamada">
            <Icon size={70} name="check"
            onPress={() => this.props.navigation.navigate('Chamada')}/>
          </Card>
          <Card title={"Cadastrar Professor"} >
            <Icon size={70} name="account-circle"
            // raised={true}
            onPress={() => this.props.navigation.navigate("Professor")}/>
          </Card>
        </Col>
      </Grid>
      </ScrollView>
    );
  }
}

const navBar = createStackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      title: 'Login'
    }
  },
  Home: {
    screen: App,
    headerLeft: null,
    navigationOptions: {
      title: 'Inicio',
      headerLeft: null,
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
      title: 'Fazer chamada'
    }
  },
  Disciplina: {
    screen: CadastroDisciplina,
    navigationOptions: {
      title: 'Cadastrar disciplina'
    }
  },
  Professor: {
    screen: CadastroProfessor,
    navigationOptions: {
      title: 'Cadastrar professor'
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
export default navBar