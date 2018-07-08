// Usage
// Simple embedded Video player component
// Props
//  Videoid string 


import React from 'react';
import {
  View,
  Text,
  WebView
} from 'react-native';

import { catchComponent } from './'

class VideoPlayer extends React.Component {
  //This component will serve as a popup from which we can play youtube videos using an npm open source module "react-native-youtube-player"
  //Should have the video id passed as a prop and be allowed to use from there
  
  /*
  userRef = firebaseApp.database().ref('/Users/' + this.props.navigation.state.params.emailHashVideoPlayer + "/");
  videoId = this.props.navigation.state.params.VideoPlayerVideoId;
  emailHash = this.props.navigation.state.params.VideoPlayerEmailHashVideoPlayer;
  videoName = this.props.navigation.state.params.VideoPlayerVideoName;
  city = this.props.navigation.state.params.VideoCity; //city associated with video is passed to video component from feed
  */

  render() {
    const { uri } = this.props || "";

    return (
      <View style={{flex: 1}}>
        <Text>Video URI: {uri}</Text>
        <WebView
          style={{flex: 1}}
          javaScriptEnabled={true}
          source={{ uri }}
        />
      </View>
    )
  }
}

export default VideoPlayer
// export default catchComponent(VideoPlayer)