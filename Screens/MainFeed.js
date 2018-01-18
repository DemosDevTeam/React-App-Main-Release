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
    var userPreferences = [];
    //Get snapshot of databse
    videosRef.once("value").then((snap) => {
      //Iterate through each video
      snap.forEach((child) => {
        var videoURL = child.val().urlvideo;
        var picURL = child.val().urlpic;
        var videoName = child.val().name;
        var tags = child.val().tags;//Array with tags pertaining to the interests that the video may encapsulate
        var matchScore = 0; //Represents how closely a given video matches with a users preferences
        var video = [videoURL, picURL, videoName, tags, matchScore];
        videos.push(video);
      })
    }).then(() =>{
      //Need to loop through array of videos and sort them based on their relation to the users preferences
      this.userRef.once("value").then((snap) => {
          var interests = snap.child("interests");
          interests.forEach((child) => {
            console.log(child.key);
            userPreferences.push(child.key);
          })
        })
      }).then(() => {
      //TODO: Debug this section!!
        //Generate values for matchScore value in every video
        for(var i=0; i<videos.length; i++){//Loop through every video once
          for(var k=0; k<userPreferences.length; k++){//For every user preference, check if the video has that tag.
            for(var j=0; j<videos[3].length; j++){
              if(userPreferences[k] == videos[i][3][j]){
                videos[i][4] = videos[i][4] + 1;
              }
            }
          }
        }
      }).then(() => {
        //Need to sort the videos array based on the matchScore.
        for(var i=0; i<videos.length; i++){
          for(var k=0; k<videos.length; k++){
            if(videos[k][4] < videos[k+1][4]){
              var temp = videos[k];
              videos[k] = videos[k+1];
              videos[k+1] = temp;
            }
          }
        }
      }).then(() => {
        /*After each video url and pic url has been added to array and the array has been sorted based on matching with user preferences
        push to global array with relevant component*/
        for(var i=0; i<videos.length; i++){
          this.videosArr.push(
            <VideoComponent  videoUrl={videos[i][0]} picUrl={videos[i][1]} videoName={videos[i][2]}/>
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
