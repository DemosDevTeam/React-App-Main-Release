import React, { Component } from 'react';
import {  
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {firebaseApp} from '../App'

export default class RegistrationScreen5 extends Component<{}>{
  userRef = firebaseApp.database().ref('/Users/' + this.props.navigation.state.params.username4 + "/");
  preferences = [];
  //On submit verify inputs and navigate to next registration screen
  submit = () => {
    for(var i=0; i<this.preferences.length; i++){
      this.userRef.child("update preferences").child(this.preferences[i]).set("");
    }
    this.props.navigation.navigate('MainFeed', {usermain: this.props.navigation.state.params.username4});
  }

  handleSelection = (text) => {
    if(this.preferences.indexOf(text) < 0){
      this.preferences.push(text);
    }
  }
  
  render() {
    return (
      <View>
        <Text>How would you like to recieve updates?</Text>
        <Text>(Choose as many as you'd like)</Text>
        <Button title="Text me!" onPress={() => this.handleSelection("text")}/>
        <Button title="Email me" onPress={() => this.handleSelection("email")}/>
        <Button title="Send me push notifications" onPress={() => this.handleSelection("push notification")}/>
        <Button title="I'll just check the app" onPress={() => this.handleSelection("check app")}/>
        <TouchableOpacity onPress={this.submit}><Text>Submit and continue</Text></TouchableOpacity>
      </View>
    )
  }
}
