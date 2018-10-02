import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  TextInput,
  Picker,
  Alert,
  ScrollView,
  Image,
  AsyncStorage,
} from 'react-native';
import sha1 from 'sha1';
import firebaseApp from '../firebaseApp';

export default class RegistrationScreen2 extends Component {
  //userRef = firebaseApp.database().ref('/Users/' + this.props.navigation.state.params.hashemail + "/");

  state = {
    gender: '',
    race: '',
    income: '',
    age: '',
    occupation: '',
    education: '',
    children: '',
    marital: '',
  }
  //On submit verify inputs and navigate to next registration screen
  submit = async () => {
    var res;
    AsyncStorage.getItem('user')
    .then(result => res = result)
    .then(() => {
      if(this.state.gender != "" && this.state.race != "" && this.state.income != "" && this.state.age != "" && this.state.occupation != "" && this.state.education != " " && this.state.children != " " && this.state.marital != " "){
        console.log("res is " + res);
        firebaseApp.database().ref('/Users/' + res + "/").child("gender").set(this.state.gender);
        firebaseApp.database().ref('/Users/' + res + "/").child("race").set(this.state.race);
        firebaseApp.database().ref('/Users/' + res + "/").child("income").set(this.state.income);
        firebaseApp.database().ref('/Users/' + res + "/").child("age").set(this.state.age);
        firebaseApp.database().ref('/Users/' + res + "/").child("occupation").set(this.state.occupation);
        firebaseApp.database().ref('/Users/' + res + "/").child("education").set(this.state.education);
        firebaseApp.database().ref('/Users/' + res + "/").child("children").set(this.state.children);
        firebaseApp.database().ref('/Users/' + res + "/").child("marital").set(this.state.marital);
        this.props.navigation.navigate('RegistrationScreen3');
      }else{
        Alert.alert("Please ensure that all fields are filled in correctly.");
      }
    });
  }

  //Store gender as state value based on input from user
  handleGender = (itemValue) => {
    this.setState({gender: itemValue});
  }
  //Store race as state value based on input from user
  handleRace = (itemValue) => {
    this.setState({race: itemValue});
  }
  //Store income as state value based on input from user
  handleIncome = (itemValue) => {
    this.setState({income: itemValue});
  }
  //Store age as state value based on input from user
  handleAge = (itemValue) => {
    this.setState({age: itemValue});
  }
  //Store occupation as state value based on input from user
  handleOccupation = (itemValue) => {
    this.setState({occupation: itemValue});
  }
  //Store occupation as state value based on input from user
  handleEducation = (itemValue) => {
    this.setState({education: itemValue});
  }
  //Store occupation as state value based on input from user
  handleChildren = (itemValue) => {
    this.setState({children: itemValue});
  }
  //Store occupation as state value based on input from user
  handleMarital = (itemValue) => {
    this.setState({marital: itemValue});
  }
  render() {
    console.disableYellowBox = true;
    //All picker items with values we wouldn't want to store have value of "placeholder"
    return (
      <ScrollView>
      <View style={styles.container}>
        <Image
          style={{width: 100, height: 100, marginTop: 40, marginBottom: 20}}
          source={{uri: 'https://user-images.githubusercontent.com/18129905/35187343-734d21b4-fdf0-11e7-8799-761570dea412.png'}}
        />
        <Text style={{marginLeft: 30, marginRight: 30, textAlign: 'center', fontSize: 16}}>The civis team is dedicated to our mission to connect you with unbiased, informative, and relevant local news and updates. We request the demographic information of our users in order to get to know those who are using our platform. The more familiar we are with you and what you value, the more accurate our algorithms are. Please fill in as much information as you feel comfortable sharing with us. We are committed to protecting your privacy.</Text>
      <View>
      <Picker
          style={styles.userInputs}
          selectedValue={this.state.gender}
          onValueChange={(itemValue, itemIndex) => this.handleGender(itemValue)}>
          <Picker.Item label="Select Gender" value="placeholder"/>
          <Picker.Item label="Female" value="Female"/>
          <Picker.Item label="Male" value="Male"/>
          <Picker.Item label="Non-binary" value="Non-binary"/>
          <Picker.Item label="Other" value="Other"/>
          <Picker.Item label="Prefer not to respond" value="NoResponse"/>
        </Picker>
        <Picker
          style={styles.userInputs}
          selectedValue={this.state.race}
          onValueChange={(itemValue, itemIndex) => this.handleRace(itemValue)}>
          <Picker.Item label="Select Race" value="placeholder"/>
          <Picker.Item label="Black / African American" value="African-American"/>
          <Picker.Item label="Caucasian" value="Caucasian"/>
          <Picker.Item label="Asian / Pacific Islander" value="Asian"/>
          <Picker.Item label="Hispanic / Latinx" value="Latino/Hispanic"/>
          <Picker.Item label="Prefer not to respond" value="NoResponse"/>
        </Picker>
        <Picker
          style={styles.userInputs}
          selectedValue={this.state.income}
          onValueChange={(itemValue, itemIndex) => this.handleIncome(itemValue)}>
          <Picker.Item label="Select Household Income Range" value="placeholder"/>
          <Picker.Item label="0-20,000" value="0-20,000"/>
          <Picker.Item label="20,000-40,000" value="20,000-40,000"/>
          <Picker.Item label="40,000-60,000" value="40,000-60,000"/>
          <Picker.Item label="60,000-80,000" value="60,000-80,000"/>
          <Picker.Item label="80,000-100,000" value="80,000-100,000"/>
          <Picker.Item label="100,000+" value="10,000+"/>
        </Picker>
        <Picker
          style={styles.userInputs}
          selectedValue={this.state.age}
          onValueChange={(itemValue, itemIndex) => this.handleAge(itemValue)}>
          <Picker.Item label="Select Age Range" value="placeholder"/>
          <Picker.Item label="0-18" value="0-18"/>
          <Picker.Item label="18-21" value="18-21"/>
          <Picker.Item label="21-25" value="21-25"/>
          <Picker.Item label="25-30" value="25-30"/>
          <Picker.Item label="30-40" value="30-40"/>
          <Picker.Item label="40+" value="40+"/>
        </Picker>
        <Picker
          style={styles.userInputs}
          selectedValue={this.state.occupation}
          onValueChange={(itemValue, itemIndex) => this.handleOccupation(itemValue)}>
          <Picker.Item label="Select Employment Area" value="placeholder"/>
          <Picker.Item label="Unemployed" value="Unemployed"/>
          <Picker.Item label="Employed, part-time" value="Employed-part"/>
          <Picker.Item label="Employed, full-time" value="Employed-full"/>
          <Picker.Item label="Employed, with multiple jobs" value="Employed-multiple"/>
        </Picker>
        <Picker
          style={styles.userInputs}
          selectedValue={this.state.education}
          onValueChange={(itemValue, itemIndex) => this.handleEducation(itemValue)}>
          <Picker.Item label="Select Education Level" value="placeholder"/>
          <Picker.Item label="No degree" value="NoDegree"/>
          <Picker.Item label="High school diploma" value="High-school"/>
          <Picker.Item label="Associate's degree" value="Associates"/>
          <Picker.Item label="Bachelor's degree" value="Bachelors"/>
          <Picker.Item label="Master's degree" value="Masters"/>
          <Picker.Item label="PhD" value="PhD"/>
        </Picker>
        <Picker
          style={styles.userInputs}
          selectedValue={this.state.children}
          onValueChange={(itemValue, itemIndex) => this.handleChildren(itemValue)}>
          <Picker.Item label="Number of Children" value="placeholder"/>
          <Picker.Item label="None" value="NoChildren"/>
          <Picker.Item label="1-2" value="1-2"/>
          <Picker.Item label="3-5" value="3-5"/>
          <Picker.Item label="6+" value="6+"/>
        </Picker>
        <Picker
          style={styles.userInputs}
          selectedValue={this.state.marital}
          onValueChange={(itemValue, itemIndex) => this.handleMarital(itemValue)}>
          <Picker.Item label="Select Marital Status" value="placeholder"/>
          <Picker.Item label="Single, never married" value="Single-no"/>
          <Picker.Item label="Single, divorced" value="Single-divorced"/>
          <Picker.Item label="In a relationship" value="Relationship"/>
          <Picker.Item label="Married" value="Married"/>
          <Picker.Item label="Widowed" value="Widowed"/>
        </Picker>
        </View>
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
    marginTop: 1,
    marginBottom: 1,
    width: 300,
  },
  buttonz: {
    height: 40,
    borderRadius: 4,
    width: 320,
    marginBottom: 30,
    backgroundColor: '#49C7E3',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
