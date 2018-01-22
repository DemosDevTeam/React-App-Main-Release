import React, { Component } from 'react';
import {  
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import {firebaseApp} from '../App'

export default class RegistrationScreen4 extends Component<{}>{
  userRef = firebaseApp.database().ref('/Users/' + this.props.navigation.state.params.username3 + "/");
  preferences = [];
  //On submit verify inputs and navigate to next registration screen
  submit = () => {
    for(var i=0; i<this.preferences.length; i++){
      this.userRef.child("engagement").child(this.preferences[i]).set("");
    }
    this.props.navigation.navigate('RegistrationScreen5', {username4: this.props.navigation.state.params.username3});
  }
  
  handleSelection = (text) => {
    if(this.preferences.indexOf(text) < 0){
      this.preferences.push(text);
    }
  }
  
  render() {
    return (
      <ScrollView>
        <Text>What do you want your engagement level to look like?</Text>
        <Text>(Choose as many as you'd like)</Text>
        <Button title="Taking online polls" onPress={() => this.handleSelection("online polls")}/>
        <Button title="Learning about local government" onPress={() => this.handleSelection("learn about local gov")}/>
        <Button title="Contacting your council" onPress={() => this.handleSelection("contact council")}/>
        <Button title="Meeting with your council" onPress={() => this.handleSelection("meet with council")}/>
        <Button title="Attending an event" onPress={() => this.handleSelection("events")}/>
        <TouchableOpacity onPress={this.submit}><Text>Submit and continue</Text></TouchableOpacity>
      </ScrollView>
    )
  }
}
