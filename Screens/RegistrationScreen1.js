import React, { Component } from 'react';
import {  
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import {firebaseApp} from '../App'

export default class RegistrationScreen1 extends Component<{}>{
  usersRef = firebaseApp.database().ref('/Users/'); //Variable from which calls to and from users firebase node are made
  
  state = {
    name: '',
    username: '',
    password: '',
    email: '',
    phone: '',
  }
  
  //On submit verify inputs and navigate to next registration screen
  submit = () => {
    newUserPush = this.usersRef.push();
    newUserPush.set({
      name: this.state.name,
      username: this.state.username,
      password: this.state.password,
      email: this.state.email,
      phone: this.state.phone,
    })
    //TODO: validate inputs and write to database
    //this.props.navigation.navigate('RegistrationScreen2');
        /*Framework for test case:
    Alert.alert('name is ' + this.state.name
               + ' username is ' + this.state.username
               + ' password is ' + this.state.password
               + ' email is ' + this.state.email
               + ' phone number is ' + this.state.phone);
      */
  };

  //Populate appropriate state fields with data as it is recieved
  handleName = (text) => {
    this.setState({name: text});
  }
  handleUsername = (text) => {
    this.setState({username: text});
  }
  handlePassword = (text) => {
    this.setState({password: text});
  }
  handleEmail = (text) => {
    this.setState({email: text});
  }
  handlePhone = (text) => {
    this.setState({phone: text})
  }
  
  render() {
    return (
      <View>
        <TextInput onChangeText={this.handleName}placeholder="name"/>
        <TextInput onChangeText={this.handleUsername} placeholder="username"/>
        <TextInput onChangeText={this.handlePassword} placeholder="password"/>
        <TextInput onChangeText={this.handleEmail} placeholder="email"/>
        <TextInput onChangeText={this.handlePhone} placeholder="phone number (optional)"/>
        <Button onPress={this.submit} title="Continue"/>
      </View>
    );
  }
};
