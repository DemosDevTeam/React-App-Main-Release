import React, { Component } from 'react';
import {  
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import sha1 from 'sha1';
import {firebaseApp} from '../App'

export default class RegistrationScreen5 extends Component<{}>{
  userRef = firebaseApp.database().ref('/Users/' + this.props.navigation.state.params.hasheamil4 + "/");
  preferences = [];
  //On submit verify inputs and navigate to next registration screen
  submit = () => {
    for(var i=0; i<this.preferences.length; i++){
      this.userRef.child("update preferences").child(this.preferences[i]).set("");
    }
    this.props.navigation.navigate('MainFeed', {emailhashmain: this.props.navigation.state.params.hashemail4});
  }

  handleSelection = (text) => {
    if(this.preferences.indexOf(text) < 0){
      this.preferences.push(text);
    }
  }
  
  render() {
    console.disableYellowBox = true;
    return (
      <ScrollView>
        <Text>How would you like to recieve updates?</Text>
        <Text>(Choose as many as you'd like)</Text>
        <Button title="Text me!" onPress={() => this.handleSelection("text")}/>
        <View style={styles.space}></View>
        <Button title="Email me" onPress={() => this.handleSelection("email")}/>
        <View style={styles.space}></View>
        <Button title="Send me push notifications" onPress={() => this.handleSelection("push notification")}/>
        <View style={styles.space}></View>
        <Button title="I'll just check the app" onPress={() => this.handleSelection("check app")}/>
        <View style={styles.space}></View>
        <TouchableOpacity onPress={this.submit}><Text>Submit and continue</Text></TouchableOpacity>
      </ScrollView>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
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
  images: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    flex: 0,
    marginBottom: 5,
  },
  space: {
    height: 2,
  }
});
