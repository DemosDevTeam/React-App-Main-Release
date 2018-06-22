// Usage
// Simple embedded Video player component
// Props
//  Videoid string 


import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  TextInput,
  Linking,
  Image,
  WebView,
} from 'react-native';
import {firebaseApp} from '../App'
import YouTube from 'react-native-youtube';

export default class VideoPlayer extends Component {
  //This component will serve as a popup from which we can play youtube videos using an npm open source module "react-native-youtube-player"
  //Should have the video id passed as a prop and be allowed to use from there
  
  /*
  userRef = firebaseApp.database().ref('/Users/' + this.props.navigation.state.params.emailHashVideoPlayer + "/");
  videoId = this.props.navigation.state.params.VideoPlayerVideoId;
  emailHash = this.props.navigation.state.params.VideoPlayerEmailHashVideoPlayer;
  videoName = this.props.navigation.state.params.VideoPlayerVideoName;
  city = this.props.navigation.state.params.VideoCity; //city associated with video is passed to video component from feed
  */

  constructor(props) {
    super(props);
  }

  render() {
    const uri = `https://www.youtube.com/embed/${this.props.videoId}`;

    console.log("embedded url is:" + uri);
    return (
      <View style={{flex: 1}}>
        <WebView
          source={{uri: uri }}
        />
      </View>
    )
  }
}
