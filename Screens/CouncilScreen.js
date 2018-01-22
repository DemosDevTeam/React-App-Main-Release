import React, { Component } from 'react';
import {  
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {firebaseApp} from '../App'

export default class CouncilScreen extends Component<{}>{
  
  //on click See my council button, navigate to CouncilScreen
  goToCouncil = () => {
    this.props.navigation.navigate('CouncilScreen');
  }
  
  render() {
    return (
      <View>
        <Image
          style={{width: 400, height: 1200}}
          source={{uri: 'https://user-images.githubusercontent.com/18129905/35191600-6ddc0580-fe4d-11e7-8f30-26c6929a44c7.png'}}
        />
        <Text>Note: We are in the process of updating this page to include the councilmembers of Greensboro.</Text>
      </View>
    )
  }
}
