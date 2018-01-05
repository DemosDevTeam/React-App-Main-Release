import React, { Component } from 'react';
import {  
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  TextInput,
} from 'react';

export default class MainFeed extends Component<{}>{
  
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
