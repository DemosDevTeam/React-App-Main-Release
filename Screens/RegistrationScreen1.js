import React, { Component } from 'react';
import {  
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
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
    //Validate inputs
    //TODO: Improve data check and search database to see if this username already exists
    if(this.state.phone == ''){
      this.state.phone = "none"
    }
    
    if(this.state.name != '' && this.state.username != '' && this.state.password != '' && this.state.email != ''){
      //Make a new node and populate with correct info about the user, aquired from this page
      newUserPush = this.usersRef.child(this.state.username).set({
        name: this.state.name,
        password: this.state.password,
        email: this.state.email,
        phone: this.state.phone,
        username: this.state.username,
      });
      //Once new user has been written, navigate to RegistrationScreen2 with the username passed as arg to maintain correct reference in database
      this.props.navigation.navigate('RegistrationScreen2', {username: this.state.username});
    }else{
      Alert.alert("Please ensure that all fields are filled in.");
    }
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
      <ScrollView>
        <Image
          style={{width: 325, height: 325}}
          source={{uri: 'https://user-images.githubusercontent.com/18129905/35187343-734d21b4-fdf0-11e7-8799-761570dea412.png'}}
        />
        <TextInput onChangeText={this.handleName}placeholder="name"/>
        <TextInput onChangeText={this.handleUsername} placeholder="username"/>
        <TextInput onChangeText={this.handlePassword} placeholder="password"/>
        <TextInput onChangeText={this.handleEmail} placeholder="email"/>
        <TextInput onChangeText={this.handlePhone} placeholder="phone number (optional)"/>
        <Button onPress={this.submit} title="Continue"/>
      </ScrollView>
    );
  }
};
