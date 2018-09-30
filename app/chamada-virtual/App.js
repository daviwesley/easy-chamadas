import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Card, Icon } from 'react-native-elements'
import { createStackNavigator } from 'react-navigation';

class App extends React.Component {
  static navigationOptions = ({ navigation }) => {
  const {state} = navigation;
  return {
    title: "Inicio",
  };
};

render() {
    return (
      <View style={styles.container}>
        <View style={styles.containerOptions}>
          <Card sytle={styles.cardStyle} title="Cadastrar Alunos">
            <Icon
              name='ios-clock'
              type='ionicon'
             // color='#517fa4'
            />
          </Card>
          <Card sytle={styles.cardStyle} title="Realizar Chamadas">
            <Icon
              name='logo-twitter'
              type='ionicon'
             //color='#517fa4'
            />
          </Card>
        </View>
      </View>
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  containerOptions: {
    flexDirection: 'row',
    alignItems: 'center', 
  },
  cardStyle: {
    alignItems: 'center',
  },
});

export default navBar