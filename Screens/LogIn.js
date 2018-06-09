//https://www.codementor.io/microsem31/react-native-google-and-facebook-authentication-cohpznykf - link to fb and google login implementation
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
import {LoginManager, AccessToken} from 'react-native-fbsdk';

import { ColorButton } from '../components'

export default class LogIn extends Component {
  usersRef = firebaseApp.database().ref('/Users/'); //Variable from which calls to and from users firebase node are made

  componentDidMount() {
    this.setState({
      email: "",
      password: "",
    })
  }
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

            firebaseApp.database().ref('/Users/' + sha1(this.state.email) + '/').once("value").then((snap) => {
              if(!(snap.hasChild('age') && snap.hasChild('children') && snap.hasChild('education') && snap.hasChild('gender') &&
                  snap.hasChild('income') && snap.hasChild('marital') && snap.hasChild('occupation') && snap.hasChild('race'))){
                    //Need to fill out demographic info, redirect to RegistrationScreen2
                    Alert.alert("Please finish filling out your registration information");
                    this.props.navigation.navigate('RegistrationScreen2', {hashemail: sha1(this.state.email)});
              }else if(!snap.hasChild('interests')){
                //Need to fill in interest preferences, redirect to RegistrationScreen3
                Alert.alert("Please finish filling out your registration information");
                this.props.navigation.navigate('RegistrationScreen3', {hashemail2: sha1(this.state.email)});
              }else if(!snap.hasChild('engagement')){
                //Need to fill in engagement preferences, redirect to RegistrationScreen4
                Alert.alert("Please finish filling out your registration information");
                this.props.navigation.navigate('RegistrationScreen4', {hashemail3: sha1(this.state.email)});
              }else if(!snap.hasChild('cities')){
                //Need to fill out what city/cities individual is interested in
                Alert.alert("Please finish filling out your registration information");
                this.props.navigation.navigate('RegistrationScreen6', {hashemail5: sha1(this.state.email)});
              }else{
                console.log("inside of last if statement");
                this.props.navigation.navigate('MainFeed', {emailhashmain: sha1(this.state.email)});
              }

              console.log("outside of if logic in LogIn.js");

            })
          }else{
            Alert.alert("password incorrect, please check and try again");
          }
        }else{ //Then use the hash of the password to check if the password is correct
          Alert.alert("we have no record of an account with this email");
        }
      })
  }

  doNothing = () =>{
    console.log("entered doNothing");
  }

  //Login using facebook login
  fbAuth() {
    console.log(this.usersRef);
    var loginToken;
    LoginManager.logInWithReadPermissions(['public_profile']).then(
       (result) => {
        if (result.isCancelled) {
          console.log('Login was cancelled');
        } else {
          console.log(result);
          AccessToken.getCurrentAccessToken().then((data) => {
            console.log("about to output access token");
            console.log(data);
            console.log("the following is data provided from api");
            console.log(data);
            loginToken = data.userID;
            console.log("after the navigation call");
          })
        }
      },
      function (error) {
        console.log('Login failed with error: ' + error);
      }
    ).then(() => {
      /**After login is complete, wait 2 sec. for asynchronous call to complete
        then if user exists, navigate to main feed; if they don't exist nav to registration2
      **/
        setTimeout(() => {
          console.log("inside of callback for firebase writing");
          console.log("loginToken is as follows:");
          console.log(loginToken);
          console.log(this.usersRef);
          console.log("this:");
          console.log(this);
          this.usersRef.once("value").then((snap) => {
            if(snap.hasChild(loginToken)){
              this.props.navigation.navigate('MainFeed', {emailhashmain: loginToken})
            }else{
              this.usersRef.child(loginToken).set({
                name: "name coming in future",
                password: "using fb login",
                email: "using fb login",
                phone: "using fb login",
                username: "using fb login",
              })
              this.props.navigation.navigate('RegistrationScreen2', {hashemail: loginToken})
            }
          })
      }, 2000);
    })
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
      <View>
        <View style={styles.container}>
        <Image
          style={{width: 200, height: 200, marginTop: 75, marginBottom: 40}}
          source={{uri: 'https://user-images.githubusercontent.com/18129905/35187343-734d21b4-fdf0-11e7-8799-761570dea412.png'}}
        />

        <Text style={styles.instructions}>
          Please log in or choose to make an account.
        </Text>
        <TextInput placeholder="Email" onChangeText={this.handleEmail}/>
        <TextInput secureTextEntry={true} placeholder="Password" onChangeText={this.handlePassword}/>
        <View style={styles.space2}></View>

        <ColorButton color={loginButtonColor} onPress={this.login}>
          Log In
        </ColorButton>

        <View style={styles.space3}></View>

        <Text style={styles.orrr}>
          or
        </Text>

        <View style={styles.space3}></View>

        <ColorButton color={fbButtonColor} onPress={this.fbAuth}>
          Login with Facebook
        </ColorButton>

        <View style={styles.space3}></View>
        <View style={styles.space}></View>
        <Text style={styles.linez}>
          ______________________________________________________________________
        </Text>
        <View style={styles.space3}></View>
        <View style={styles.space3}></View>
        <View style={styles.space3}></View>
        <View style={styles.space3}></View>
        <Text style={styles.orrr}>
          New here?
        </Text>
        <View style={styles.space}></View>
        <View style={styles.space}></View>

        <ColorButton color={registerButtonColor} onPress={this.registerAccount}>
          Register New Account
        </ColorButton>
        </View>
      </View>
    );
  }
}

const loginButtonColor = "#49C7E3";
const fbButtonColor = "#3B5998";
const registerButtonColor = "#EE4C50";

var styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 40,
    // backgroundColor: '#F5FCFF',
  },
  orrr: {
    textAlign: 'center',
    color: '#333333',
    fontSize: 16,
    // backgroundColor: '#F5FCFF',
  },
  linez: {
    textAlign: 'center',
    color: '#A2A1A1',
    fontSize: 10,
    // backgroundColor: '#F5FCFF',
  },
  images: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    flex: 0,
    marginBottom: 5,
    marginTop: 10,
    // backgroundColor: '#F5FCFF',

  },
  space: {
    height: 2,
    // backgroundColor: '#F5FCFF',
  },
  space2: {
    height: 20,
    // backgroundColor: '#F5FCFF',
  },
  space3: {
    height: 4,
    // backgroundColor: '#F5FCFF',
  },
  buttonz: {
    height: 40,
    borderRadius: 4,
    width: 320,
    backgroundColor: '#49C7E3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonzFB: {
    height: 40,
    borderRadius: 4,
    width: 320,
    backgroundColor: '#3B5998',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonzNew: {
    height: 40,
    borderRadius: 4,
    width: 320,
    backgroundColor: '#EE4C50',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
