import React, { Component } from 'react';
import {  
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  TextInput,
} from 'react';

export default class RegistrationScreen4 extends Component<{}>{
  
  //On submit verify inputs and navigate to next registration screen
  submit = () => {
    //TODO: validate inputs and write to database
    this.props.navigation.navigate('RegistrationScreen5');
  }
  
  render() {
    return (
      <View>
        <Text>What do you want your engagement level to look like?</Text>
        <Text>(Choose as many as you'd like)</Text>
        <Button title="Taking online polls"/>
        <Button title="Learning about local government"/>
        <Button title="Contacting your council"/>
        <Button title="Meeting with your council"/>
        <Button title="Attending an event"/>
        <TouchableOpacity onPress={this.submit}><Text>Submit and continue</Text></TouchableOpacity>
      </View>
    )
  }
}
