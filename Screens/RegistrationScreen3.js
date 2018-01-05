import React, { Component } from 'react';
import {  
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  TextInput,
} from 'react';

export default class RegistrationScreen3 extends Component<{}>{
  
  //On submit verify inputs and navigate to next registration screen
  submit = () => {
    //TODO: validate inputs and write to database
    this.props.navigation.navigate('RegistrationScreen4');
  }
  //TODO: Add handlers for all buttons, in our case acting more as selectors
  render() {
    return (
      <View>
        <Button title="Education"/>
        <Button title="Healthcare"/>
        <Button title="LGBTQIA+"/>
        <Button title="Housing"/>
        <Button title="Lifestyle"/>
        <Button title="UNC"/>
        <Button title="Democratic Party"/>
        <Button title="Republican Party"/>
        <Button title="Food"/>
        <Button title="Social Justice"/>
        <Button title="Security"/>
        <Button title="Women's rights"/>
        <Button title="Environment"/>
        <TouchableOpacity onPress={this.submit}><Text>Submit and continue</Text></TouchableOpacity>
      </View>
    )
  }
}
