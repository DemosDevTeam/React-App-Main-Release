import React, { Component } from 'react';
import {  
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  TextInput,
  Picker,
  Alert
} from 'react-native';
import {firebaseApp} from '../App'

export default class RegistrationScreen2 extends Component<{}>{
  userRef = firebaseApp.database().ref('/Users/' + this.props.navigation.state.params.username + "/");
  
  state = {
    race: '',
    income: '',
    age: '',
    occupation: '',
  }
  //On submit verify inputs and navigate to next registration screen
  submit = () => {
    //TODO: validate inputs and write to database
    if(this.state.race != "" && this.state.income != "" && this.state.age != "" && this.state.occupation != ""){
      this.userRef.child("race").set(this.state.race);
      this.userRef.child("income").set(this.state.income);
      this.userRef.child("age").set(this.state.age);
      this.userRef.child("occupation").set(this.state.occupation);
      this.props.navigation.navigate('RegistrationScreen3', {username: this.props.navigation.state.params.username});
    }else{
      Alert.alert("Please ensure that all fields are filled in correctly.");
    }
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
  render() {
    //All picker items with values we wouldn't want to store have value of "placeholder"
    return (
      <View>
        <Text>This is why we ask for your demographic info...(Tai help here).</Text>
        <Picker 
          selectedValue={this.state.race}
          onValueChange={(itemValue, itemIndex) => this.handleRace(itemValue)}>
          <Picker.Item label="Select Race" value="placeholder"/>
          <Picker.Item label="African American" value="African-American"/>
          <Picker.Item label="Caucasian" value="Caucasian"/>
          <Picker.Item label="Asian" value="Asian"/>
          <Picker.Item label="Latino/Hispanic" value="Latino/Hispanic"/>
        </Picker>
        <Picker 
          selectedValue={this.state.income}
          onValueChange={(itemValue, itemIndex) => this.handleIncome(itemValue)}>
          <Picker.Item label="Select Household income range" value="placeholder"/>
          <Picker.Item label="0-20,000" value="0-20,000"/>
          <Picker.Item label="20,000-40,000" value="20,000-40,000"/>
          <Picker.Item label="40,000-60,000" value="40,000-60,000"/>
          <Picker.Item label="60,000-80,000" value="60,000-80,000"/>
          <Picker.Item label="80,000-100,000" value="80,000-100,000"/>
          <Picker.Item label="100,000+" value="10,000+"/>
        </Picker>
        <Picker
          selectedValue={this.state.age}
          onValueChange={(itemValue, itemIndex) => this.handleAge(itemValue)}>
          <Picker.Item label="Select age range" value="placeholder"/>
          <Picker.Item label="0-18" value="0-18"/>
          <Picker.Item label="18-21" value="18-21"/>
          <Picker.Item label="21-25" value="21-25"/>
          <Picker.Item label="25-30" value="25-30"/>
          <Picker.Item label="30-40" value="30-40"/>
          <Picker.Item label="40+" value="40+"/>
        </Picker>
        <Picker
          selectedValue={this.state.occupation}
          onValueChange={(itemValue, itemIndex) =>this.handleOccupation(itemValue)}>
          <Picker.Item label="Select Occupation area" value="placeholder"/>
          <Picker.Item label="Villain" value="Villain"/>
          <Picker.Item label="Superhero" value="Superhero"/>
        </Picker>
        <TouchableOpacity onPress={this.submit}><Text>Submit and continue</Text></TouchableOpacity>
      </View>
    )
  }
}
