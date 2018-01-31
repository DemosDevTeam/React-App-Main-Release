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

export default class VideoComponent extends Component<{}>{
  //This component will take a url as a prop argument when created that will redirect to the youtube video corresponding to this news piece on the feed
  //Need to get youtube thumbnail urls as well as redirect urls for the demos videos
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => Linking.openURL(this.props.videoUrl)}>
          <Image source={{uri: this.props.picUrl}} style={{width: 100, height: 100}}/>
          <Text>{this.props.videoName}</Text>
        </TouchableOpacity>
      </View>
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
  },
  space: {
    height: 2,
  }
});