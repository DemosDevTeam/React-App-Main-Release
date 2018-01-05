import React, { Component } from 'react';
import {  
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  TextInput,
} from 'react-native';

export default class RegistrationScreen1 extends Component<{}>{
  
  //On submit verify inputs and navigate to next registration screen
  submit = () => {
    //TODO: validate inputs and write to database
    this.props.navigation.navigate('RegistrationScreen2');
  };
  
  render() {
    return (
      <View>
        <TextInput placeholder="name"/>
        <TextInput placeholder="username"/>
        <TextInput placeholder="password"/>
        <TextInput placeholder="email"/>
        <TextInput placeholder="phone number (optional)"/>
        <Button onPress={this.submit} title="Continue"/>
      </View>
    );
  }
};
