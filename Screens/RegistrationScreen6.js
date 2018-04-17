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

export default class RegistrationScreen6 extends Component<{}>{
  usersRef = firebaseApp.database().ref('/Users/' + this.props.navigation.state.params.hashemail5 + '/'); //Variable from which calls to and from users firebase node are made
  emailHash = this.props.navigation.state.params.hashemail5;
  cityComponents = []; //Array of js components to be written to page after loading
  citiesChosen = []; //Array of cities chosen by user, to be written to firebase on submit

  state = {
    cityChosen: false,
    loading: true,
  }

  //Before page loads, get list of cities and append all options to feed
  componentWillMount = () => {
    cities = [];
    firebaseApp.database().ref('/videos/').once("value").then((snap) => {
      snap.forEach((child) => {
        cities.push(child.key);
        console.log("video child key:");
        console.log(child.key);
      })
    }).then(() => {
      for(var i=0; i<cities.length; i++){
        //Debugging the following line
        this.cityComponents.push(<View><View style={styles.space}></View><TouchableOpacity onPress={this.addCity(cities[i])}>{cities[i]}</TouchableOpacity></View>);
      }
    }).then(() => {
      this.setState({loading: false});
    })
  }

  addCity = (text) => {
    this.setState({cityChosen: true})
    this.citiesChosen.push(text);
  }

  submit = () => {
    if(this.state.cityChosen == false){
      Alert.alert("Please choose at least one city");
    }else{
      firebaseApp.database().ref('/Users/' + emailHash + '/cities/').set(" ");
      for(var i=0; i<this.citiesChosen.length; i++){
        firebaseApp.database().ref('/Users/' + emailHash + '/cities/').child(this.citiesChosen[i]).set(" ");
      }
      this.props.navigation.navigate('MainFeed', {emailhashmain: this.emailHash});
    }

  }

  render() {
    console.disableYellowBox = true;
    if (this.state.loading) {
      return (<Text>Loading...</Text>)
    }
    return (
      <ScrollView>
        <View style={styles.container}>
        <Image
          style={{width: 200, height: 200, marginTop: 75, marginBottom: 20}}
          source={{uri: 'https://user-images.githubusercontent.com/18129905/35187343-734d21b4-fdf0-11e7-8799-761570dea412.png'}}
        />


        <View>{this.cityComponents}</View>

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
