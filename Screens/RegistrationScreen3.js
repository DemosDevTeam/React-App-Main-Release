import React, { Component } from 'react';
import {  
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
} from 'react-native';
import sha1 from 'sha1';
import {firebaseApp} from '../App'

export default class RegistrationScreen3 extends Component<{}>{
  userRef = firebaseApp.database().ref('/Users/' + this.props.navigation.state.params.hashemail2 + "/"); //this.props.naviagation.state.params.username is undefined :/ need to find workaround
  preferences = [];
  //On submit verify inputs and navigate to next registration screen
  submit = () => {
    for(var i=0; i<this.preferences.length; i++){
      this.userRef.child("interests").child(this.preferences[i]).set("");
    }
    this.props.navigation.navigate('RegistrationScreen4', {hashemail3: this.props.navigation.state.params.hashemail2});
  }

  handleSelection = (text) => {
    //Check array to see if value has already been added; if it hasn't been then write to the array using 'text' variable
    if(this.preferences.indexOf(text) < 0){
      this.preferences.push(text);
    }
  }
  //TODO: Add handlers for all buttons, in our case acting more as selectors
  render() {
    console.disableYellowBox = true;
    return (
      <ScrollView>
        <Button title="Education" onPress={() => this.handleSelection("Education")}/>
        <View style={styles.space}></View>
        <Button title="Healthcare" onPress={() => this.handleSelection("Healthcare")}/>
        <View style={styles.space}></View>
        <Button title="LGBTQIA+" onPress={() => this.handleSelection("LGBTQIA+")}/>
        <View style={styles.space}></View>
        <Button title="Housing" onPress={() => this.handleSelection("Housing")}/>
        <View style={styles.space}></View>
        <Button title="Lifestyle" onPress={() => this.handleSelection("Lifestyle")}/>
        <View style={styles.space}></View>
        <Button title="UNC" onPress={() => this.handleSelection("UNC")}/>
        <View style={styles.space}></View>
        <Button title="Democratic Party" onPress={() => this.handleSelection("Democratic Party")}/>
        <View style={styles.space}></View>
        <Button title="Republican Party" onPress={() => this.handleSelection("Republican Party")}/>
        <View style={styles.space}></View>
        <Button title="Food" onPress={() => this.handleSelection("Food")}/>
        <View style={styles.space}></View>
        <Button title="Social Justice" onPress={() => this.handleSelection("Social Justice")}/>
        <View style={styles.space}></View>
        <Button title="Security" onPress={() => this.handleSelection("Security")}/>
        <View style={styles.space}></View>
        <Button title="Women's Rights" onPress={() => this.handleSelection("Women's Rights")}/>
        <View style={styles.space}></View>
        <Button title="Environment" onPress={() => this.handleSelection("Environment")}/>
        <View style={styles.space}></View>
        <Button title="Economy" onPress={() => this.handleSelection("Economy")}/>
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
