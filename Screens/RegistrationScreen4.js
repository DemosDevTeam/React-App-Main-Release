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
import sha1 from 'sha1';
import {firebaseApp} from '../App'

export default class RegistrationScreen4 extends Component<{}>{
  userRef = firebaseApp.database().ref('/Users/' + this.props.navigation.state.params.hashemail3 + "/");
  preferences = [];
  //On submit verify inputs and navigate to next registration screen
  submit = () => {
    for(var i=0; i<this.preferences.length; i++){
      this.userRef.child("engagement").child(this.preferences[i]).set("");
    }
    this.props.navigation.navigate('RegistrationScreen5', {hashemail4: this.props.navigation.state.params.hashemail3});
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
        <Text>What do you want your engagement level to look like?</Text>
        <Text>(Choose as many as you'd like)</Text>
        <Button title="Taking online polls" onPress={() => this.handleSelection("online polls")}/>
        <View style={styles.space}></View>
        <Button title="Learning about local government" onPress={() => this.handleSelection("learn about local gov")}/>
        <View style={styles.space}></View>
        <Button title="Contacting your council" onPress={() => this.handleSelection("contact council")}/>
        <View style={styles.space}></View>
        <Button title="Meeting with your council" onPress={() => this.handleSelection("meet with council")}/>
        <View style={styles.space}></View>
        <Button title="Attending an event" onPress={() => this.handleSelection("events")}/>
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
