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
  Image,
} from 'react-native';
import sha1 from 'sha1';
import {firebaseApp} from '../App'

export default class UpdateUpdatePreferences extends Component<{}>{
  userRef = firebaseApp.database().ref('/Users/' + this.props.navigation.state.params.emailHashUpdateUpdatePreferences + "/");
  emailHash = this.props.navigation.state.params.emailHashUpdateUpdatePreferences;
  preferences = [];

  //On submit verify inputs and navigate back to UpdateProfile page
  submit = () => {
    this.userRef.child("update preferences").set(" ");
    for(var i=0; i<this.preferences.length; i++){
      this.userRef.child("update preferences").child(this.preferences[i]).set("");
    }
    this.props.navigation.navigate('UpdateProfile', {emailHashUpdateProfile: this.emailHash});
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
        <Text>How would you like to recieve updates?</Text>
        <Text>(Choose as many as you would like)</Text>
      </View>
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
