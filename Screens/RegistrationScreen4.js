import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
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
      <View style={styles.container}>
      <Image
        style={{width: 100, height: 100, marginTop: 40, marginBottom: 20}}
        source={{uri: 'https://user-images.githubusercontent.com/18129905/35187343-734d21b4-fdf0-11e7-8799-761570dea412.png'}}
      />
        <Text>What do you want your engagement level to look like?</Text>
        <Text>(Choose as many as you would like)</Text>
      </View>
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
        <View style={styles.container}>
        <View style={styles.buttonz}>
          <TouchableOpacity onPress={this.submit}>
            <Text style={{fontSize: 16, textAlign: 'center'}}>Submit and Continue</Text>
          </TouchableOpacity>
        </View>
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
  },
  buttonz: {
    height: 40,
    borderRadius: 4,
    width: 320,
    backgroundColor: '#49C7E3',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
