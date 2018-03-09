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
import VideoComponent from '../mainFeedComponents/videoComponent';

export default class AggregateFeedback extends Component<{}>{
  userRef = firebaseApp.database().ref('/Users/' + this.props.navigation.state.params.emailHashAggregateFeedback + "/");
  emailHashMain = this.props.navigation.state.params.emailHashAggregateFeedback;
  videosArr = [];

  componentWillMount() {
    this.setState({loading: true});
    //feedback will be 2d array with each first feedback[i] corresponding to a content piece reacted to by user
    /*for each element (i) of feedback, values are as follows:
      feedback[i][0] = video name
      feedback[i][1] = reaction type
      feedback[i][2] = video pic
      feedback[i][3] = video url
      feedback[i][4] = video name
    */
    var feedback = [];
    this.userRef.child("Reactions").once("value").then((snap) => {
      snap.forEach((child) => {
        var nameOfVideo = child.key;
        var reaction = child.val().reaction;
        var elementArr = [nameOfVideo, reaction];
        feedback.push(elementArr);
      })
    }).then(() => {
      firebaseApp.database().ref('/videos/').once("value").then((snap) => {
        for(var i=0; i<feedback.length; i++){
          if(snap.hasChild(feedback[i][0])){
            var urlpic = snap.child(feedback[i][0]).val().urlpic;
            var urlvideo = snap.child(feedback[i][0]).val().urlvideo;
            var name = snap.child(feedback[i][0]).val().name;

            feedback[i].push(urlpic);
            feedback[i].push(urlvideo);
            feedback[i].push(name);
          }
        }
      }).then(() => {
        for(var i=0; i<feedback.length; i++){
          this.videosArr.push(
            <View>
            <VideoComponent navigation={this.props.navigation} videoUrl={feedback[i][3]} picUrl={feedback[i][2]} videoName={feedback[i][3]} emailHash={this.emailHashMain}/>
            <Text>{feedback[i][1]}</Text>
            </View>
          )
        }
      }).then(() => {
        this.setState({loading: false});
      })
    })
  }

  goBack = () => {
    this.props.navigation.navigate('MainFeed', {emailhashmain: this.emailhashmain});
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
        <View style={styles.space}></View>
        <Button onPress={this.goBack} title="Back"></Button>
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
