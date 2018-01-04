import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  RectangleButton,
  Alert
} from 'react-native';

import { NavigationActions } from 'react-navigation'

//instructions include the pre set values from the original basic app that ships with react
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

//Defines signUpNav as navigate action to send user to SignUp page
const signUpNav = NavigationActions.navigate({
  routeName: 'SignUp',
  params: {},
  action: {},
})

//Defines logInNav as navigate action to send user to LogIn page
const logInNav = NavigationActions.navigate({
  routeName: 'LogIn',
  params: {},
  action: {},
})

export default class Home extends Component<{}>{
  //changeText makes use of the prop provided by this being in a navigation stack 
  //This allows us to navigate to another sheet within the stack
  //The stack is defined in router.js
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View>
       <Text style={styles.welcome}>
          Welcome to Demos!
        </Text>
        <Button onPress={() => this.props.navigation.dispatch(signUpNav)} title="Sign Up"/>
        <Button onPress={() => this.props.navigation.dispatch(logInNav)} title="Log In"/>
        <Text style={styles.instructions}>
          To get started, edit App.js
        </Text>
        <Text style={styles.instructions}>
          {instructions}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});