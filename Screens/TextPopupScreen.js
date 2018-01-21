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
  //Button to return to the main feed
  goBack = () => {
    this.props.navigation.navigate('MainFeed');
  }
  
  //Just need to pass in text to be displayed for article into the article.
  render() {
    return (
      <View>
        <Text>{this.props.text}</Text>
        <Button onPress={this.goBack} title="Continue"/>
      </View>
    );
  }
};
