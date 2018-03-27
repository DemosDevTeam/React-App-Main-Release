import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import {firebaseApp} from '../App'

export default class UpdateInterests extends Component<{}>{
  userRef = firebaseApp.database().ref('/Users/' + this.props.navigation.state.params.emailHashUpdateInterests + "/");
  emailHash = this.props.navigation.state.params.emailHashUpdateInterests
  interests = []
  //on click See my council button, navigate to CouncilScreen
  goToCouncil = () => {
    this.props.navigation.navigate('CouncilScreen');
  }

  handleSelection = (text) => {
    //Check and see if preference has already been selected
    if(this.interests.indexOf(text) < 0){
      this.interests.push(text);
    }
  }

  submit = () => {
    this.userRef.child("interests").set("");
    for(var i=0; i<this.interests.length; i++){
      this.userRef.child("interests").child(this.interests[i]).set("");
    }
    this.props.navigation.navigate('UpdateProfile', {emailHashUpdateProfile: this.emailHash});
  }

  render() {
    return (
      <ScrollView>
        <View>
          <Text>Please select the interests you are interested</Text>
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
        <TouchableOpacity onPress={this.submit}><Text>Submit!</Text></TouchableOpacity>
        </View>
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
    marginTop: 10,
  },
  space: {
    height: 2,
  },
  space2: {
    height: 20,
  },
  userInputs: {
    marginTop: 15,
    marginBottom: 15,
  }
});
