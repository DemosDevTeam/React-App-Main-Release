import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  TouchableOpacity,
  TextInput,
} from 'react-native';

export default class LogIn extends Component<{}>{
  //on press register new account button, navigate to first registration screen.
  registerAccount = () => {
    this.props.navigation.navigate('RegistrationScreen');
  };
  //On press login button, validate inputs, then navigate to MainFeed.
  login = () => {
    //TODO: Add validation of inputs to/from firebase
    this.props.navigation.navigate('MainFeed');
  }

  render() {
    return (
      <View>
        <Text style={styles.instructions}>
          Welcome to the Log In Page.
        </Text>
        <TextInput
          placeholder="Email"/>
        <TextInput
          placeholder="Password"/>
        <View>
          <TouchableOpacity onPress={this.login}><Text>Login</Text></TouchableOpacity>
          <TouchableOpacity><Text>Login with Google</Text></TouchableOpacity>
          <TouchableOpacity><Text>Login with Facebook</Text></TouchableOpacity>
        </View>
        <Button onPress={this.registerAccount} title="Register New Account"/>
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