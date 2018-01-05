import React, { Component } from 'react';
import {  
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  TextInput,
} from 'react-native';

export default class CouncilScreen extends Component<{}>{
  
  //on click See my council button, navigate to CouncilScreen
  goToCouncil = () => {
    this.props.navigation.navigate('CouncilScreen');
  }
  
  render() {
    return (
      <View>
        <Text>More to come on this page as well (lol again).</Text>
      </View>
    )
  }
}
