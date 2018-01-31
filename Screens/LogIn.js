import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  Alert,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import sha1 from 'sha1';
import {firebaseApp} from '../App';


export default class LogIn extends Component<{}>{
  usersRef = firebaseApp.database().ref('/Users/'); //Variable from which calls to and from users firebase node are made
  //on press register new account button, navigate to first registration screen.
  registerAccount = () => {
    this.props.navigation.navigate('RegistrationScreen1');
  };
  //On press login button, validate inputs, then navigate to MainFeed.
  login = () => {
    console.log(sha1(this.state.email));
    console.log(sha1(this.state.password));
      //Take snapshot of users node
      this.usersRef.once("value").then((snap) => {
        //Check hash of email to see if user exists in the database
        if(snap.hasChild(sha1(this.state.email))){
          if(snap.child(sha1(this.state.email)).val().password == sha1(this.state.password)){
            this.props.navigation.navigate('MainFeed', {usermain: this.state.username});
          }else{
            Alert.alert("password incorrect, please check and try again");
          }
        }else{ //Then use the hash of the password to check if the password is correct
          Alert.alert("we have no record of an account with this email");
        }
        
        /*snap.forEach((child) => {
          var email = child.val().email;
          var password = child.val().password;
          var username = child.val().username;
          if(this.state.email == email && this.state.password == password){
            //If email and password match with a user, set username to that accounts username
              this.setState({username: username});
          }
        });*/
      })/*.then(() => {
          if(this.state.username != undefined){
            this.props.navigation.navigate('MainFeed', {emailhashmain: sha1(this.state.email)});
          }else{
            Alert.alert("username is " + this.state.username);
          }
      })*/
    //TODO: Add validation of inputs to/from firebase
    //this.props.navigation.navigate('MainFeed');
  }
  
  //save email input as state var
  handleEmail = (text) => {
    
    this.setState({email: text});
  }
  //Save password input as state var
  handlePassword = (text) => {
    this.setState({password: text});
  }
  
  render() {
    console.disableYellowBox = true;
    return (
      <ScrollView>
        <View style={styles.container}>
        <Image
          style={{width: 325, height: 325}}
          source={{uri: 'https://user-images.githubusercontent.com/18129905/35187343-734d21b4-fdf0-11e7-8799-761570dea412.png'}}
        /></View>
        <Text style={styles.instructions}>
          Welcome to the log in Page.
        </Text>
        <TextInput placeholder="Email" onChangeText={this.handleEmail}/>
        <TextInput placeholder="Password" onChangeText={this.handlePassword}/>
        <Button style={styles.button} onPress={this.login} title="login"/>
        <View style={styles.space}></View>
        <Button onPress={this.registerAccount} title="Register New Account"/>
      </ScrollView>
    );
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
