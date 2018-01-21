import React, { Component } from 'react';
import {  
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  TextInput,
  Alert
} from 'react-native';
import {firebaseApp} from '../App'

export default class RegistrationScreen3 extends Component<{}>{
  userRef = firebaseApp.database().ref('/Users/' + this.props.navigation.state.params.username2 + "/"); //this.props.naviagation.state.params.username is undefined :/ need to find workaround
  preferences = [];
  //On submit verify inputs and navigate to next registration screen
  submit = () => {
    for(var i=0; i<this.preferences.length; i++){
      this.userRef.child("interests").child(this.preferences[i]).set("");
    }
    this.props.navigation.navigate('RegistrationScreen4', {username3: this.props.navigation.state.params.username2});
  }

  handleSelection = (text) => {
    //Check array to see if value has already been added; if it hasn't been then write to the array using 'text' variable
    if(this.preferences.indexOf(text) < 0){
      this.preferences.push(text);
    }
  }
  //TODO: Add handlers for all buttons, in our case acting more as selectors
  render() {
    return (
      <View>
        <Button title="Education" onPress={() => this.handleSelection("Education")}/>
        <Button title="Healthcare" onPress={() => this.handleSelection("Healthcare")}/>
        <Button title="LGBTQIA+" onPress={() => this.handleSelection("LGBTQIA+")}/>
        <Button title="Housing" onPress={() => this.handleSelection("Housing")}/>
        <Button title="Lifestyle" onPress={() => this.handleSelection("Lifestyle")}/>
        <Button title="UNC" onPress={() => this.handleSelection("UNC")}/>
        <Button title="Democratic Party" onPress={() => this.handleSelection("Democratic Party")}/>
        <Button title="Republican Party" onPress={() => this.handleSelection("Republican Party")}/>
        <Button title="Food" onPress={() => this.handleSelection("Food")}/>
        <Button title="Social Justice" onPress={() => this.handleSelection("Social Justice")}/>
        <Button title="Security" onPress={() => this.handleSelection("Security")}/>
        <Button title="Women's Rights" onPress={() => this.handleSelection("Women's Rights")}/>
        <Button title="Environment" onPress={() => this.handleSelection("Environment")}/>
        <TouchableOpacity onPress={this.submit}><Text>Submit and continue</Text></TouchableOpacity>
      </View>
    )
  }
}
