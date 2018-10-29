import React from 'react';
import { ScrollView, AsyncStorage, StatusBar } from 'react-native';
import { Card, Icon, } from 'react-native-elements'
import { createStackNavigator } from 'react-navigation';
import { Col, Grid } from "react-native-easy-grid";

//telas
import { CadastroTeacher } from './components/CadastroProfessor/cadastroProfessor';
import { LoginScreen } from './components/Login/LoginScreen'
import { CadastroDisciplina } from './components/CadastroDisciplina/CadastroDisciplina'
import { CadastroAluno } from './components/CadastroAluno/CadastroAluno';
import { ChamadaScreen } from './components/Chamada/ChamadaScreen';

//funções e variaveis

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dados: ''
    }
  }
  sair() {
    AsyncStorage.removeItem('token')
    this.props.navigation.push("Login")
  }
  componentDidMount() {

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
            <Card title={"Sair"} >
              <Icon size={70} name="live-help"
                // raised={true}
                onPress={() => this.sair()} />
            </Card>
          </Col>
          <Col>
            <Card title="Fazer Chamada">
              <Icon size={70} name="check"
                onPress={() => this.props.navigation.navigate('Chamada')} />
            </Card>
            <Card title={"Cadastrar Professor"} >
              <Icon size={70} name="account-circle"
                // raised={true}
                onPress={() => this.props.navigation.navigate("Professor")} />
            </Card>
          </Col>
        </Grid>
      <StatusBar backgroundColor="blue"/>
      </ScrollView>
    );
  }
}

const navBar = createStackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      title: 'Login',
      headerLeft: null,
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
    screen: CadastroAluno,
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
    screen: CadastroTeacher,
    navigationOptions: {
      title: 'Cadastrar professor'
    }
  },
});

export default navBar