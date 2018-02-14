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

export default class VideoPlayer extends Component<{}>{
  userRef = firebaseApp.database().ref('/Users/' + this.props.navigation.state.params.emailHashVideoPlayer + "/");
  videoId = this.props.navigation.state.params.videoId;
  emailHash = this.props.navigation.state.params.emailHashVideoPlayer;
  videoName = this.props.navigation.state.params.videoName;
  //This component will serve as a popup from which we can play youtube videos using an npm open source module "react-native-youtube-player"
  //Should have the video id passed as a prop and be allowed to use from there

  componentWillMount() {
    this.setState({
      videoId: this.props.navigation.state.params.videoId,
      emailHash: this.props.navigation.state.params.emailHashVideoPlayer,
      videoName: this.props.navigation.state.params.videoName,
      embeddedUrl: "https://www.youtube.com/embed/" + this.videoId,
    })
  }

  storeFeedback = (text) => {
    //Store feedback in state variable so it is ready to write when user hits submit
    this.setState({feedback: text});
  }

  submitFeedback = () => {
    //feedback to firebase node on submit
    var emailHash = this.state.emailHash;
    var videoName = this.state.videoName;
    firebaseApp.database().ref('/Users/' + emailHash + '/Reactions/' + videoName + '/feedback/').set(this.state.feedback);
    firebaseApp.database().ref('/videos/' + videoName + '/feedback/' + emailHash + '/').set(this.state.feedback);
  }

  submitPositiveReaction = () => {
    //Check if this video has any positive reaction; if not, make node, else increment node
    if(firebaseApp.database().ref('/videos/' + this.videoName).hasChild('Positive Reactions')){
      firebaseApp.database().ref('/videos/' + this.videoName + '/Positive Reactions/').once('value').then(function(snap){
        var currentPositiveReviews = snap.val();
        currentPositiveReviews = currentPositiveReviews+1;
        firebaseApp.database().ref('/videos/' + this.videoName + '/Positive Reactions/').set(currentPositiveReviews);
      })
    }else{
      firebaseApp.database().ref('/videos/' + this.videoName + '/Positive Reactions').set(1);
    }
  }

  submitNegativeReaction = () => {
    //Check if this video has any negative reaction; if not, make node, else increment node
    if(firebaseApp.database().ref('/videos/' + this.videoName).hasChild('Negative Reactions')){
      firebaseApp.database().ref('/videos/' + this.videoName + '/Negative Reactions/').once('value').then(function(snap){
        var currentNegativeReviews = snap.val();
        currentNegativeReviews = currentNegativeReviews+1;
        firebaseApp.database().ref('/videos/' + this.videoName + '/Negative Reactions/').set(currentNegativeReviews);
      })
    }else{
      firebaseApp.database().ref('/videos/' + this.videoName + '/Negative Reactions').set(1);
    }
  }

  render() {
    console.log("embedded url is:" + this.state.embeddedUrl);
    return (
      <View style={{flex: 1,}}>
        <WebView
          source={{html: "<html><body><iframe src=" + this.state.embeddedUrl + "></iframe></body></html>"}}
          style={{marginTop: 20, width:400, height:200,}}
        />
        <TextInput placeholder="Comments/feedback" onChangeText={this.storeFeedback}/>
        <Button onPress={this.submitFeedback} title="Submit Feedback"/>
        <Button onPress={this.submitPositiveReaction} title="I loved it!"/>
        <Button onPress={this.submitNegativeReaction} title="Not a fan"/>
      </View>
    )
  }

//"<html><body>Look Ma' a video! <br /> <iframe width='560' height='315' src=" + this.state.embeddedUrl + "frameborder='0' allowfullscreen></iframe></body></html>"
//uri: 'https://github.com/facebook/react-native'
}
