import React, { Component } from 'react';
import {  
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {firebaseApp} from '../App'

export default class MainFeed extends Component<{}>{
  userRef = firebaseApp.database().ref('/Users/' + this.props.navigation.state.params.usermain + "/");
  //on click See my council button, navigate to CouncilScreen
  goToCouncil = () => {
    this.props.navigation.navigate('CouncilScreen');
  }
  
  render() {
    return (
      <View>
        <Text>More to come on this page (lol)</Text>
        <Button onPress={this.goToCouncil}title="See my council"/>
      </View>
    )
  }
}
