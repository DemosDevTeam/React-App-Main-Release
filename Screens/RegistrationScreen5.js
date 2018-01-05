import React, { Component } from 'react';
import {  
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  TextInput,
} from 'react-native';

export default class RegistrationScreen5 extends Component<{}>{
  
  //On submit verify inputs and navigate to next registration screen
  submit = () => {
    //TODO: validate inputs and write to database
    this.props.navigation.navigate('MainFeed');
  }
  
  render() {
    return (
      <View>
        <Text>How would you like to recieve updates?</Text>
        <Text>(Choose as many as you'd like)</Text>
        <Button title="Text me!"/>
        <Button title="Email me"/>
        <Button title="Send me push notifications"/>
        <Button title="I'll just check the app"/>
        <TouchableOpacity onPress={this.submit}><Text>Submit and continue</Text></TouchableOpacity>
      </View>
    )
  }
}
