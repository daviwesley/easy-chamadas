import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Card, Icon } from 'react-native-elements'
import { createStackNavigator } from 'react-navigation';
import { Col, Row, Grid } from "react-native-easy-grid";

class App extends React.Component {
  static navigationOptions = ({ navigation }) => {
  const {state} = navigation;
  return {
    title: "Inicio",
  };
};

render() {
    return (
      <Grid>
        <Col>
          <Card title="Cadastrar Alunos">
            <Icon name='group-add'/>
          </Card>
          <Card title="Fazer chamadas">
            <Icon name="add"/>
          </Card>
        </Col>
        <Col>
          <Card title="Cadastrar Alunos">
            <Icon name="account"/>
          </Card>
          <Card title="Cadastrar Alunos">
            <Icon name="account"/>
          </Card>
        </Col>
      </Grid>
    );
  }
}

const navBar = createStackNavigator({
  Home: {
    screen: App,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  containerOptions: {
    //flexDirection: 'row',
    justifyContent:'center',
  },
  cardStyle: {
    alignItems: 'center',
  },
});

export default navBar