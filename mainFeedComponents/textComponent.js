import React, { Component } from 'react';
import {  
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  TextInput,
  Linking,
  Image
} from 'react-native';

export default class TextComponent extends Component<{}>{
  //This component will take a url as a prop argument when created that will redirect to the youtube video corresponding to this news piece on the feed
  //Need to get youtube thumbnail urls as well as redirect urls for the demos videos
  render() {
    return (
      <View onPress={() => Linking.openURL(this.props.textUrl)}>
        <Image source={{uri: this.props.picURL}} style={{width: 100, height: 100}}/>
        <Text>{this.props.textName}</Text>
      </View>
    )
  }
  
  
}