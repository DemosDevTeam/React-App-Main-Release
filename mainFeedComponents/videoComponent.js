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

  openVideoPlayer = () => {
    var vidIdStartIndex = this.props.videoUrl.indexOf("=");
    var videoId = this.props.videoUrl.slice(vidIdStartIndex+1, this.props.videoUrl.length);
    console.log("videoId is" + videoId);
    console.log("emailHashVideoPlayer is " + this.props.emailHash);
    console.log("videoName is " + this.videoName);
    this.props.navigation.navigate('VideoPlayer', {videoId: videoId, emailHashVideoPlayer: this.props.emailHash, videoName: this.videoName});
  }

  
  //() => Linking.openURL(this.props.videoUrl) - former onPress for whole component
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.openVideoPlayer}>
          <Image source={{uri: this.props.picUrl}} style={{width: 300, height: 165}}/>
          <Text>{this.props.videoName}</Text>
        </TouchableOpacity>
        <TouchableHighlight onPress={this.positiveReaction}>
          <Image
            style={styles.button}
            source={{uri: 'https://user-images.githubusercontent.com/18129905/37549908-9838279e-295b-11e8-92cf-ee3de1972d5b.png'}}
          />
        </TouchableHighlight>
        <TouchableHighlight onPress={this.negativeReaction}>
          <Image
            style={styles.button}
            source={{uri: 'https://user-images.githubusercontent.com/18129905/37549914-a6982960-295b-11e8-9493-f24db3c1e13a.png'}}
          />
        </TouchableHighlight>
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
