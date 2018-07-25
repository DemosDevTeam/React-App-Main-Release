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
  AsyncStorage,
} from 'react-native';
import sha1 from 'sha1';

import firebaseApp from '../firebaseApp'

export default class RegistrationScreen1 extends Component {
  // usersRef = firebaseApp.database().ref('/Users/'); //Variable from which calls to and from users firebase node are made

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      password: '',
      email: '',
      phone: '',
    }
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

  onSubmit = async () => {
    // Submit's current information to firebase
    // Is name and phone numbber necessary
    // Email is usenrame

    const { email, password } = this.state;

    try {
      // LOGIN FORM VALIDATION
      // Valid email
      // PAssword check

      const response = await firebaseApp.auth().createUserWithEmailAndPassword(email, password);
      console.log("response is as follows");
      console.log(response);
      // Does firebase automatically login created user?
      // Successful login user and reroute to app
      const loginResponse = await firebaseApp.auth().signInWithEmailAndPassword(email, password);
      console.log(loginResponse)
      var uid = loginResponse.uid;

      AsyncStorage.setItem('user', loginResponse.uid)
      .then(() => {
        this.props.navigation.navigate('RegistrationScreen2');
      })
      //this.props.navigation.navigate('AuthLoading')

    } catch (error) {
      // TODO: Proper error handling
      const {code, message}  = error;
      console.error(code, message);
      Alert.alert("There was an error in submission, please check your email and password and try again");
    }
  }

  //Populate appropriate state fields with data as it is recieved
  handleName = (text) => {
    this.setState({name: text});
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
      <View style={{flex: 1}}>
        <View style={styles.container}>
          <Image
          style={{width: 200, height: 200, marginTop: 20, marginBottom: 20}}
          source={{uri: 'https://user-images.githubusercontent.com/18129905/35187343-734d21b4-fdf0-11e7-8799-761570dea412.png'}}
          />
        </View>
        <View>
        <View>
        <TextInput style={{marginTop: 15, marginBottom: 10, marginLeft: 75, marginRight: 75, backgroundColor: '#FFFFFF', fontSize: 13, borderRadius: 3}} onChangeText={this.handleName}placeholder="name"/>
        <TextInput style={{marginTop: 15, marginBottom: 10, marginLeft: 75, marginRight: 75, backgroundColor: '#FFFFFF', fontSize: 13, borderRadius: 3}} onChangeText={this.handleEmail} placeholder="email"/>
        <TextInput secureTextEntry={true} style={{marginTop: 15, marginBottom: 10, marginLeft: 75, marginRight: 75, backgroundColor: '#FFFFFF', fontSize: 13, borderRadius: 3}} onChangeText={this.handlePassword} placeholder="password"/>
        <TextInput style={{marginTop: 15, marginBottom: 10, marginLeft: 75, marginRight: 75, backgroundColor: '#FFFFFF', fontSize: 13, borderRadius: 3}} onChangeText={this.handlePhone} placeholder="phone number (optional)"/>
        <Text style={{marginTop: 15, alignItems: 'center', textAlign: 'center', marginLeft: 75, marginRight: 75}}>Please make sure that your password is at least 6 characters long.</Text>  
      </View>
        <View style={{height: 32}}></View>
        <Button onPress={this.onSubmit} title="Register" />

        {/* <View style={styles.buttonz}>
          <TouchableOpacity onPress={this.onSubmit}>
            <Text style={{fontSize: 16}}>Continue</Text>
          </TouchableOpacity>
        </View> */}
        </View>
      </View>
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
