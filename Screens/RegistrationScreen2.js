import React, { Component } from 'react';
import {  
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  TextInput,
  Picker,
} from 'react';

export default class RegistrationScreen2 extends Component<{}>{
  
  //On submit verify inputs and navigate to next registration screen
  submit = () => {
    //TODO: validate inputs and write to database
    this.props.navigation.navigate('RegistrationScreen3');
  }
  
  render() {
    return (
      <View>
        <Text>This is why we ask for your demographic info...(Tai help here).</Text>
        <Picker>
          <Picker.Item label="Select Race"/>
          <Picker.Item label="African American"/>
          <Picker.Item label="Caucasian"/>
          <Picker.Item label="Asian"/>
          <Picker.Item label="Latino/Hispanic"/>
        </Picker>
        <Picker>
          <Picker.Item label="Select Household income range"/>
          <Picker.Item label="0-20,000"/>
          <Picker.Item label="20,000-40,000"/>
          <Picker.Item label="40,000-60,000"/>
          <Picker.Item label="60,000-80,000"/>
          <Picker.Item label="80,000-100,000"/>
          <Picker.Item label="100,000+"/>
        </Picker>
        <Picker>
          <Picker.Item label="Select age range"/>
          <Picker.Item label="0-18"/>
          <Picker.Item label="18-21"/>
          <Picker.Item label="21-25"/>
          <Picker.Item label="25-30"/>
          <Picker.Item label="30-40"/>
          <Picker.Item label="40+"/>
        </Picker>
        <Picker>
          <Picker.Item label="Select Occupation area"/>
          <Picker.Item label="Villain"/>
          <Picker.Item label="Superhero"/>
        </Picker>
        <TouchableOpacity onPress={this.submit}><Text>Submit and continue</Text></TouchableOpacity>
      </View>
    )
  }
}
