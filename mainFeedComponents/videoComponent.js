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
import {firebaseApp} from '../App'

export default class VideoComponent extends Component<{}>{
  userRef = firebaseApp.database().ref('/Users/' + this.props.emailHash + "/");
  videoName = this.props.videoName; //Set to a local var so that it is accessible within functions
  //This component will take a url as a prop argument when created that will redirect to the youtube video corresponding to this news piece on the feed
  //Will also get url for youtube thumbnail, the video name and a reference to a user node in firebase for use in functionality
  
  positiveReaction = () => {
  //Need to increment a reactions node for the actual video corresponding to positive reactions
    firebaseApp.database().ref('/Users/' + this.props.emailHash + '/Reactions/' + this.videoName + '/').set({
      reaction: "positive",
    })
  }

  negativeReaction = () => {
    //Need to increment a reactions node for the actual video corresponding to negative reactions
    firebaseApp.database().ref('/Users/' + this.props.emailHash + '/Reactions/' + this.videoName + '/').set({
      reaction: "negative",
    })
  }
  
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => Linking.openURL(this.props.videoUrl)}>
          <Image source={{uri: this.props.picUrl}} style={{width: 100, height: 100}}/>
          <Text>{this.props.videoName}</Text>
        </TouchableOpacity>
        <Button onPress={this.positiveReaction} title="Loved this! (icon to come)"/>
        <Button onPress={this.negativeReaction} title="Not a fan (icon to come)"/>
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