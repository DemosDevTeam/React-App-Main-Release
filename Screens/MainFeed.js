import React, { Component } from 'react';
import {  
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import {firebaseApp} from '../App'
import VideoComponent from '../mainFeedComponents/videoComponent'
import TextComponent from '../mainFeedComponents/textComponent'

export default class MainFeed extends Component<{}>{
  userRef = firebaseApp.database().ref('/Users/' + this.props.navigation.state.params.usermain + "/");
  videosArr = [];
  //on click See my council button, navigate to CouncilScreen
  goToCouncil = () => {
    this.props.navigation.navigate('CouncilScreen');
  }
  
  componentWillMount() {
    //Set loading state to true so that asynchronous calls to db can be made before page loads
    this.setState({loading: true});
    var videosRef = firebaseApp.database().ref('/videos/');
    var videos = [];
    //Get snapshot of databse
    videosRef.once("value").then((snap) => {
      //Iterate through each video
      snap.forEach((child) => {
        var videoURL = child.val().urlvideo;
        var picURL = child.val().urlpic;
        var video = [videoURL, picURL];
        videos.push(video);
      })
    }).then(() =>{
      //After each video url and pic url has been added to array, push to global array with relevant component
      for(var i=0; i<videos.length; i++){
        this.videosArr.push(
          <VideoComponent  videoUrl={videos[i][0]} picUrl={videos[i][1]} videoName={"baller"}/>
        );
      }
    }).then(() => {
      //Once db values have loaded, set "loading" state to false so that rest of page can render
      this.setState({loading: false});
    })
  }

  render() {
    if (this.state.loading) {
      return <Text>Loading...</Text>
    }
    return (
      <View>
        <Text>More to come on this page (lol)</Text>
        <Button onPress={this.goToCouncil}title="See my council"/>
        {this.videosArr}
      </View>
    )
  }
}
