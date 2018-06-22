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
  //This component will serve as a popup from which we can play youtube videos using an npm open source module "react-native-youtube-player"
  //Should have the video id passed as a prop and be allowed to use from there
  userRef = firebaseApp.database().ref('/Users/' + this.props.navigation.state.params.emailHashVideoPlayer + "/");
  videoId = this.props.navigation.state.params.VideoPlayerVideoId;
  emailHash = this.props.navigation.state.params.VideoPlayerEmailHashVideoPlayer;
  videoName = this.props.navigation.state.params.VideoPlayerVideoName;
  city = this.props.navigation.state.params.VideoCity; //city associated with video is passed to video component from feed


  componentWillMount() {
    this.setState({
      videoId: this.videoId,
      emailHash: this.emailHash,
      videoName: this.videoName,
      embeddedUrl: "https://www.youtube.com/embed/" + this.videoId,
      feedback: "",
    })
  }

  componentDidMount(){
    //Use this for debugging navigation values that should be passed into the component when nav.ed to
  }

  storeFeedback = (text) => {
    //Store feedback in state variable so it is ready to write when user hits submit
    this.setState({feedback: text});
  }

  submitFeedback = () => {
    //feedback to firebase node on submit
    var emailHash = this.state.emailHash;
    var videoName = this.state.videoName;
    if(this.state.feedback != ""){
      firebaseApp.database().ref('/Users/' + emailHash + '/Reactions/' + videoName + '/feedback/').set(this.state.feedback);
      firebaseApp.database().ref('/videos/' + this.city + '/' + videoName + '/feedback/' + emailHash + '/').set(this.state.feedback);
    }
  }

  submitPositiveReaction = () => {
    console.log("inside of submitPositiveReaction handler")
    //Check if this video has any positive reactions; if not, make node, else increment node
    //Check if user has reactions for this video; then check if that reaction was postive or negative and decrament/increment appropriately
    firebaseApp.database().ref('/Users/' + this.emailHash + '/Reactions/').once("value").then((snap) => {
      if(snap.hasChild(this.videoName)){
        if(snap.child(this.videoName).hasChild("reaction")){
          //need to update the reaction val in firebase for this user, and update this val for the video in firebase
          var currentReaction = "";
          var reactionChanged = false;
          firebaseApp.database().ref('/Users/' + this.emailHash + '/Reactions/' + this.videoName + '/reaction/').once("value").then((snap) => {
            currentReaction = snap.val();
            if(currentReaction != "positive"){
              reactionChanged = true;
            }
            firebaseApp.database().ref('/Users/' + this.emailHash + '/Reactions/' + this.videoName + '/reaction/').set("positive");
          }).then(() => {
            //If the reaction changed we need to decrement negative reactions and increment positive reactions
            if(reactionChanged){
              firebaseApp.database().ref('/videos/' + this.city + '/' + this.videoName + '/').once('value').then((snap) => {
                var currentNegativeReviews = snap.child("Negative Reactions").val();
                currentNegativeReviews = currentNegativeReviews - 1;

                //Increment the count for negative feedback
                firebaseApp.database().ref('/videos/' + this.city + '/' + this.videoName + '/Negative Reactions/').set(currentNegativeReviews);
                if(snap.hasChild("Positive Reactions")){

                  var currentPositiveReviews = snap.child("Positive Reactions").val();
                  currentPositiveReviews = currentPositiveReviews +1;
                  firebaseApp.database().ref('/videos/' + this.city + '/' + this.videoName + '/Positive Reactions/').set(currentPositiveReviews);
                }else{
                  firebaseApp.database().ref('/videos/' + this.city + '/' + this.videoName + '/Positive Reactions/').set(1);
                }
              })
          }else{
            firebaseApp.database().ref('/videos/' + this.city + '/' + this.videoName + '/').once("value").then((snap) => {
              //If there is no change to the reaction, but no reaction was recorded previously, we should create positive reactions node and set to one in video
              if(!snap.hasChild('Positive Reactions')){
                firebaseApp.database().ref('/videos/' + this.city + '/' + this.videoName + '/Positive Reactions/').set(1);
              }
            })
          }
        })
      }else{
        //Need to create value for reaction under user in firebase
        firebaseApp.database().ref('/Users/' + this.emailHash + '/Reactions/' + this.videoName + '/reaction/').set("positive");
        //Need to update value for reaction under video in firebase
        firebaseApp.database().ref('/videos/' + this.city + '/' + this.videoName + '/Positive Reactions/').once('value').then((snap) => {
          var currentPositiveReviews = snap.val();
          currentPositiveReviews = currentPositiveReviews+1;
          firebaseApp.database().ref('/videos/' + this.city + '/' + this.videoName + '/Positive Reactions/').set(currentPositiveReviews);
        })
      }
    }else{
      //Need to increment the count for this video of positive reactions and set the user reaction to "postiive"
      firebaseApp.database().ref('/Users/' + this.emailHash + '/Reactions/' + this.videoName + '/reaction/').set("positive");
      firebaseApp.database().ref('/videos/' + this.city + '/' + this.videoName + '/Positive Reactions/').once('value').then((snap) => {
        var currentPositiveReviews = snap.val();
        currentPositiveReviews = currentPositiveReviews+1;
        firebaseApp.database().ref('/videos/' + this.city + '/' + this.videoName + '/Positive Reactions/').set(currentPositiveReviews);
      })
    }
  })
}

  submitNegativeReaction = () => {
    console.log("inside of submitNegativeReaction handler")
    //Check if this video has any negative reaction; if not, make node, else increment node
    //Check if user has reactions for this video; then check if that reaction was postive or negative and decrament/increment appropriately
    firebaseApp.database().ref('/Users/' + this.emailHash + '/Reactions/').once("value").then((snap) => {
      if(snap.hasChild(this.videoName)){
        if(snap.child(this.videoName).hasChild("reaction")){
          //need to update the reaction val in firebase for this user, and update this val for the video in firebase
          var currentReaction = "";
          var reactionChanged = false;
          firebaseApp.database().ref('/Users/' + this.emailHash + '/Reactions/' + this.videoName + '/reaction/').once("value").then((snap) => {
            currentReaction = snap.val();
            if(currentReaction != "negative"){
              reactionChanged = true;
            }
            firebaseApp.database().ref('/Users/' + this.emailHash + '/Reactions/' + this.videoName + '/reaction/').set("negative");
          }).then(() => {
            //If the reaction changed we need to decrement positive reactions and increment negative reactions
            if(reactionChanged){
              firebaseApp.database().ref('/videos/' + this.city + '/' + this.videoName + '/').once('value').then((snap) => {
                var currentPositiveReviews = snap.child("Positive Reactions").val();
                currentPositiveReviews = currentPositiveReviews - 1;

                //Increment the count for negative feedback
                firebaseApp.database().ref('/videos/' + this.city + '/' + this.videoName + '/Positive Reactions/').set(currentPositiveReviews);
                if(snap.hasChild("Negative Reactions")){

                  var currentNegativeReviews = snap.child("Negaitve Reactions").val();
                  currentNegativeReviews = currentNegativeReviews +1;
                  firebaseApp.database().ref('/videos/' + this.city + '/' + this.videoName + '/Negative Reactions/').set(currentNegativeReviews);
                }else{
                  firebaseApp.database().ref('/videos/' + this.city + '/' + this.videoName + '/Negative Reactions/').set(1);
                }
              })
          }else{
            firebaseApp.database().ref('/videos/' + this.city + '/' + this.videoName + '/').once("value").then((snap) => {
              //If there is no change to the reaction, but no reaction was recorded previously, we should create negative reactions node and set to one in video
              if(!snap.hasChild('Negative Reactions')){
                firebaseApp.database().ref('/videos/' + this.city + '/' + this.videoName + '/Negative Reactions/').set(1);
              }
            })
          }
        })
      }else{
        //Need to create value for reaction under user in firebase
        firebaseApp.database().ref('/Users/' + this.emailHash + '/Reactions/' + this.videoName + '/reaction/').set("negative");
        //Need to update value for reaction under video in firebase
        firebaseApp.database().ref('/videos/' + this.city + '/' + this.videoName + '/Negative Reactions/').once('value').then((snap) => {
          var currentNegativeReviews = snap.val();
          currentNegativeReviews = currentNegativeReviews+1;
          firebaseApp.database().ref('/videos/' + this.city + '/' + this.videoName + '/Negative Reactions/').set(currentNegativeReviews);
        })
      }
    }else{
      //Need to increment the count for this video of negative reactions and set the user reaction to "negative"
      firebaseApp.database().ref('/Users/' + this.emailHash + '/Reactions/' + this.videoName + '/reaction/').set("negative");
      firebaseApp.database().ref('/videos/' + this.city + '/' + this.videoName + '/Negative Reactions/').once('value').then((snap) => {
        var currentNegativeReviews = snap.val();
        currentNegativeReviews = currentNegativeReviews+1;
        firebaseApp.database().ref('/videos/' + this.city + '/' + this.videoName + '/Negative Reactions/').set(currentNegativeReviews);
      })
    }
  })
}

  goBack = () => {
    this.props.navigation.navigate('MainFeed', {emailhashmain: this.emailHash})
  }

  render() {
    console.log("embedded url is:" + this.state.embeddedUrl);
    return (
      <View style={{flex: 1,}}>
        <WebView
          source={{uri: this.state.embeddedUrl }}
          // style={{marginTop: 20, width:400, height:200,}}
        />
        <TextInput placeholder="Comments/feedback" onChangeText={this.storeFeedback}/>
        <Button onPress={this.submitFeedback} title="Submit Feedback"/>
        <Button onPress={this.submitPositiveReaction} title="I loved it!"/>
        <Button onPress={this.submitNegativeReaction} title="Not a fan"/>
        <Button onPress={this.goBack} title="Back to main feed"/>
      </View>
    )
  }

//"<html><body>Look Ma' a video! <br /> <iframe width='560' height='315' src=" + this.state.embeddedUrl + "frameborder='0' allowfullscreen></iframe></body></html>"
//uri: 'https://github.com/facebook/react-native'
}
