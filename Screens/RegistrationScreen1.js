import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
} from 'react-native';
import sha1 from 'sha1';
import {firebaseApp} from '../App'

export default class RegistrationScreen1 extends Component<{}>{
  usersRef = firebaseApp.database().ref('/Users/'); //Variable from which calls to and from users firebase node are made

  state = {
    name: '',
    username: '',
    password: '',
    email: '',
    phone: '',
  }

  //On submit verify inputs and navigate to next registration screen
  submit = () => {
    //Validate inputs
    //TODO: Improve data check and search database to see if this username already exists
    if(this.state.phone == ''){
      this.state.phone = "none"
    }

    if(this.state.name != '' && this.state.username != '' && this.state.password != '' && this.state.email != ''){
      //Check and make sure user with this email is not already on file
      this.usersRef.once("value").then((snap) => {

        if(snap.hasChild(sha1(this.state.email))){
          Alert.alert("this email is already on file");
        }else{
          //Make a new node and populate with correct info about the user, aquired from this page
          newUserPush = this.usersRef.child(sha1(this.state.email)).set({
            name: this.state.name,
            password: sha1(this.state.password),
            email: this.state.email,
            phone: this.state.phone,
            username: this.state.username,
          });
          //Once new user has been written, navigate to RegistrationScreen2 with the username passed as arg to maintain correct reference in database
          this.props.navigation.navigate('RegistrationScreen2', {hashemail: sha1(this.state.email)});
        }
      });
    }else{
      Alert.alert("Please ensure that all fields are filled in.");
    }
  };

  //Populate appropriate state fields with data as it is recieved
  handleName = (text) => {
    this.setState({name: text});
  }
  handleUsername = (text) => {
    this.setState({username: text});
  }
  handlePassword = (text) => {
    this.setState({password: text});
  }
  handleEmail = (text) => {
    this.setState({email: text});
  }
  handlePhone = (text) => {
    this.setState({phone: text})
  }

  render() {
    console.disableYellowBox = true;
    return (
      <ScrollView>
        <View style={styles.container}>
        <Image
          style={{width: 200, height: 200, marginTop: 75, marginBottom: 20}}
          source={{uri: 'https://user-images.githubusercontent.com/18129905/35187343-734d21b4-fdf0-11e7-8799-761570dea412.png'}}
        />
        <TextInput style={styles.userInputs} onChangeText={this.handleName}placeholder="name"/>
        <TextInput style={styles.userInputs} onChangeText={this.handleUsername} placeholder="username"/>
        <TextInput secureTextEntry={true} style={styles.userInputs} onChangeText={this.handlePassword} placeholder="password"/>
        <TextInput style={styles.userInputs} onChangeText={this.handleEmail} placeholder="email"/>
        <TextInput style={styles.userInputs} onChangeText={this.handlePhone} placeholder="phone number (optional)"/>
        <View style={styles.buttonz}>
          <TouchableOpacity onPress={this.submit}>
            <Text style={{fontSize: 16}}>Continue</Text>
          </TouchableOpacity>
        </View>
        </View>
      </ScrollView>
    );
  }
};

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
  pickWrapperz: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 10,
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

