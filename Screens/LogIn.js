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

import {firebaseApp} from '../App'

export default class LogIn extends Component<{}>{
  usersRef = firebaseApp.database().ref('/Users/'); //Variable from which calls to and from users firebase node are made
  //on press register new account button, navigate to first registration screen.
  registerAccount = () => {
    this.props.navigation.navigate('RegistrationScreen1');
  };
  //On press login button, validate inputs, then navigate to MainFeed.
  login = () => {
    //Take snapshot of users node
    this.usersRef.once("value").then((snap) => {
      //Iterate through users and see if email and password match with the inputs provided by user
      snap.forEach((child) => {
        var email = child.val().email;
        var password = child.val().password;
        var username = child.val().username;
        if(this.state.email == email && this.state.password == password){
          //If email and password match with a user, set username to that accounts username
            this.setState({username: username});
        }
      });
    }).then(() => {
        if(this.state.username != undefined){
          this.props.navigation.navigate('MainFeed', {usermain: this.state.username});
        }else{
          Alert.alert("username is " + this.state.username);
        }
    })
    //TODO: Add validation of inputs to/from firebase
    //this.props.navigation.navigate('MainFeed');
  }
  
  //save email input as state var
  handleEmail = (text) => {
    this.setState({email: text});
  }
  //Save password input as state var
  handlePassword = (text) => {
    this.setState({password: text});
  }
  
  render() {
    return (
      <View>
        <Text style={styles.instructions}>
          Welcome to the Log In Page.
        </Text>
        <TextInput placeholder="Email" onChangeText={this.handleEmail}/>
        <TextInput placeholder="Password" onChangeText={this.handlePassword}/>
          <TouchableOpacity onPress={this.login}><Text>Login</Text></TouchableOpacity>
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