import React, { Component } from 'react';
import {  
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
} from 'react-native';
import {firebaseApp} from '../App'
import VideoComponent from '../mainFeedComponents/videoComponent'
import TextComponent from '../mainFeedComponents/textComponent'

export default class MainFeed extends Component<{}>{
  userRef = firebaseApp.database().ref('/Users/' + this.props.navigation.state.params.emailhashmain + "/");
  emailHashMain = this.props.navigation.state.params.emailhashmain;
  videosArr = [];
  //on click See my council button, navigate to CouncilScreen
  goToCouncil = () => {
    this.props.navigation.navigate('CouncilScreen');
  }

  logout = () => {
    this.props.navigation.navigate('Home');
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
        var tags = [];//Array with tags pertaining to the interests that the video may encapsulate
        child.child("tags").forEach((child) => {
          tags.push(child.key);
        })
        var matchScore = 0; //Represents how closely a given video matches with a users preferences
        var video = [videoURL, picURL, videoName, tags, matchScore];
        videos.push(video);
      })
    }).then(() =>{
      //Need to loop through array of videos and sort them based on their relation to the users preferences
      this.userRef.once("value").then((snap) => {
        var interests = snap.child("interests");
          interests.forEach((child) => {
            userPreferences.push(child.key);
          })
        }).then(() => {
        //TODO: Debug this section!!
        //Generate values for matchScore value in every video
          for(var i=0; i<videos.length; i++){//Loop through every video once
            for(var k=0; k<userPreferences.length; k++){//For every user preference, check if the video has that tag.
              for(var j=0; j<videos[i][3].length; j++){
                if(userPreferences[k] == videos[i][3][j]){
                  videos[i][4] = videos[i][4] + 1;
                }
              }
            }
          }
        }).then(() => {
          //Need to sort the videos array based on the matchScore.
        console.log("entered sorting of videos array based on the matchScore");
          for(var i=0; i<videos.length; i++){
            for(var k=0; k<videos.length-1; k++){
              console.log("videos[k][4]");
              console.log(videos[k][4]);
              if(videos[k][4] < videos[k+1][4]){
                var temp = videos[k];
                videos[k] = videos[k+1];
                videos[k+1] = temp;
              }
            }
          }
        console.log("finished for loop for sorting videos based on match score");
        }).then(() => {
          /*After each video url and pic url has been added to array and the array has been sorted based on matching with user preferences
          push to global array with relevant component*/
          for(var i=0; i<videos.length; i++){
            console.log("videoName to be inserted into video component is " + videos[i][2]);
            this.videosArr.push(
              <VideoComponent  navigation={this.props.navigation} videoUrl={videos[i][0]} picUrl={videos[i][1]} videoName={videos[i][2]} emailHash={this.emailHashMain}/>
            );
            console.log("successfully added a video!");
          }
        }).then(() => {
          //Once db values have loaded, set "loading" state to false so that rest of page can render
          this.setState({loading: false});
        })
    })
  }

  render() {
    console.disableYellowBox = true;
    if (this.state.loading) {
      return (<Text>Loading...</Text>)
    }
    return (
      <ScrollView>
        <View style={styles.space}></View>
        <View style={styles.container}>{this.videosArr}</View>
        <Button onPress={this.goToCouncil} title="See my council"/>
        <View style={styles.space}></View>
        <Button onPress={this.logout} title="log out"/>
      </ScrollView>
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
