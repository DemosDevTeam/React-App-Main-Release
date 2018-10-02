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
  AsyncStorage,
} from 'react-native';
import sha1 from 'sha1';
import firebaseApp from '../firebaseApp'

export default class RegistrationScreen5 extends Component {
  //userRef = firebaseApp.database().ref('/Users/' + this.props.navigation.state.params.hasheamil4 + "/");
  preferences = [];
  //On submit verify inputs and navigate to next registration screen
  submit = async () => {
    var res;
    AsyncStorage.getItem('user')
    .then(result => res = result)
    .then(async () => {
      for(var i=0; i<this.preferences.length; i++){
        await firebaseApp.database().ref('/Users/' + res + '/update preferences/').child(this.preferences[i]).set("");
      }
      this.props.navigation.navigate('RegistrationScreen6');
    })
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
        <Text style={{fontSize: 16}}>How would you like to recieve updates?</Text>
        <Text style={{fontSize: 15}}>(Choose as many as you would like)</Text>
      </View>
      <View style={styles.space}></View>
      <View style={styles.space}></View>
      <View style={styles.space}></View>
        <View style={styles.bspace}></View>
        <View style={styles.container}>
        <View style={styles.buttonz2}>
          <TouchableOpacity onPress={() => this.handleSelection("text")}>
            <Text style={{fontSize: 15, textAlign: 'center'}}>Text me!</Text>
          </TouchableOpacity>
        </View>
        </View>

        <View style={styles.bspace}></View>
        <View style={styles.container}>
        <View style={styles.buttonz2}>
          <TouchableOpacity onPress={() => this.handleSelection("email")}>
            <Text style={{fontSize: 15, textAlign: 'center'}}>Email me</Text>
          </TouchableOpacity>
        </View>
        </View>

        <View style={styles.bspace}></View>
        <View style={styles.container}>
        <View style={styles.buttonz2}>
          <TouchableOpacity onPress={() => this.handleSelection("push notification")}>
            <Text style={{fontSize: 15, textAlign: 'center'}}>Send me push notifications</Text>
          </TouchableOpacity>
        </View>
        </View>

        <View style={styles.bspace}></View>
        <View style={styles.container}>
        <View style={styles.buttonz2}>
          <TouchableOpacity onPress={() => this.handleSelection("check app")}>
            <Text style={{fontSize: 15, textAlign: 'center'}}>I will just check the app</Text>
          </TouchableOpacity>
        </View>
        </View>
        <View style={styles.space}></View>
        <View style={styles.space}></View>
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
  bspace: {
    height: 0,
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
  },
  buttonz2: {
    height: 29,
    borderRadius: 4,
    width: 320,
    marginTop: 3,
    marginBottom: 3,
    backgroundColor: '#c9c9c9',
    alignItems: 'center',
    justifyContent: 'center',
}
});
