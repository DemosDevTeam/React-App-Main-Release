import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  TouchableHighlight,
  ScrollView,
  TextInput,
  Linking,
  Image
} from 'react-native';
import {firebaseApp} from '../App'

export default class VideoComponent extends Component<{}>{
  userRef = firebaseApp.database().ref('/Users/' + this.props.emailHash + "/");
  emailHash = this.props.emailHash;
  videoName = this.props.videoName; //Set to a local var so that it is accessible within functions
  city = this.props.videoCity;
  //This component will take a url as a prop argument when created that will redirect to the youtube video corresponding to this news piece on the feed
  //Will also get url for youtube thumbnail, the video name and a reference to a user node in firebase for use in functionality

  positiveReaction = () => {
    //Need to increment a reactions node for the actual video corresponding to positive reactions
    var reactionChanged = false;
    this.userRef.once("value").then((snap) => {
      if(snap.hasChild("Reactions")){
        if(snap.child("Reactions").hasChild(this.videoName)){
          var reaction = snap.child("Reactions").child(this.videoName).val().reaction;
          if(reaction == "negative"){
            reactionChanged = true;
            firebaseApp.database().ref('/Users/' + this.emailHash + '/Reactions/' + this.videoName + '/reaction/').set("positive");
            firebaseApp.database().ref('/Users/' + this.emailHash + '/Reactions/' + this.videoName + '/city/').set(this.city);
          }
        }else{
          firebaseApp.database().ref('/Users/' + this.emailHash + '/Reactions/' + this.videoName + '/reaction/').set("positive");
          firebaseApp.database().ref('/Users/' + this.emailHash + '/Reactions/' + this.videoName + '/city/').set(this.city);
        }
      }else{
        firebaseApp.database().ref('/Users/' + this.emailHash + '/Reactions/' + this.videoName + '/reaction/').set("positive");
        firebaseApp.database().ref('/Users/' + this.emailHash + '/Reactions/' + this.videoName + '/city/').set(this.city);
      }

    }).then(() => {
      firebaseApp.database().ref('/videos/' + this.city + '/' + this.videoName + '/').once("value").then((snap) => {
        if(snap.hasChild("Positive Reactions")){
          if(reactionChanged){
            var currentPositiveVal = snap.child("Positive Reactions").val();
            currentPositiveVal = currentPositiveVal + 1;
            firebaseApp.database().ref('/videos/' + this.city + '/' + this.videoName + '/Positive Reactions/').set(currentPositiveVal);

            var currentNegativeVal = snap.child("Negative Reactions").val();
            currentNegativeVal = currentNegativeVal - 1;
            firebaseApp.database().ref('/videos/' + this.city + '/' + this.videoName + '/Negative Reactions/').set(currentNegativeVal);
          }

        }else{
          if(reactionChanged){
            var currentNegativeVal = snap.child("Negative Reactions").val();
            currentNegativeVal = currentNegativeVal - 1;
            firebaseApp.database().ref('/videos/' + this.city + '/' + this.videoName + '/Negative Reactions/').set(currentNegativeVal);
          }
          firebaseApp.database().ref('/videos/' + this.city + '/' + this.videoName + '/Positive Reactions/').set(1);
        }
      }).then(() => {
        firebaseApp.database().ref('/Users/' + this.emailHash + '/Reactions/' + this.videoName + '/reaction/').set("positive");
        firebaseApp.database().ref('/Users/' + this.emailHash + '/Reactions/' + this.videoName + '/city/').set(this.city);
      })
    })
  }

  negativeReaction = () => {
    //Need to increment a reactions node for the actual video corresponding to negative reactions
    console.log("inside positiveReaction listener");
    var reactionChanged = false;
    this.userRef.once("value").then((snap) => {
      if(snap.hasChild("Reactions")){
        if(snap.child("Reactions").hasChild(this.videoName)){
          var reaction = snap.child("Reactions").child(this.videoName).val().reaction;
          if(reaction == "positive"){
            reactionChanged = true;
            firebaseApp.database().ref('/Users/' + this.emailHash + '/Reactions/' + this.videoName + '/reaction/').set("negative");
            firebaseApp.database().ref('/Users/' + this.emailHash + '/Reactions/' + this.videoName + '/city/').set(this.city);
          }

        }else{
          firebaseApp.database().ref('/Users/' + this.emailHash + '/Reactions/' + this.videoName + '/reaction/').set("negative");
          firebaseApp.database().ref('/Users/' + this.emailHash + '/Reactions/' + this.videoName + '/city/').set(this.city);
        }
    }else{
      firebaseApp.database().ref('/Users/' + this.emailHash + '/Reactions/' + this.videoName + '/reaction/').set("negative");
      firebaseApp.database().ref('/Users/' + this.emailHash + '/Reactions/' + this.videoName + '/city/').set(this.city);
    }

    }).then(() => {
      firebaseApp.database().ref('/videos/' + this.city + '/' + this.videoName + '/').once("value").then((snap) => {
        if(snap.hasChild("Negative Reactions")){
          if(reactionChanged){
            var currentPositiveVal = snap.child("Positive Reactions").val();
            currentPositiveVal = currentPositiveVal - 1;
            firebaseApp.database().ref('/videos/' + this.city + '/' + this.videoName + '/Positive Reactions/').set(currentPositiveVal);

            var currentNegativeVal = snap.child("Negative Reactions").val();
            currentNegativeVal = currentNegativeVal + 1;
            firebaseApp.database().ref('/videos/' + this.city + '/' + this.videoName + '/Negative Reactions/').set(currentNegativeVal);
          }

        }else{
          if(reactionChanged){
            var currentPositiveVal = snap.child("Positive Reactions").val();
            currentPositiveVal = currentPositiveVal - 1;
            firebaseApp.database().ref('/videos/' + this.city + '/' + this.videoName + '/Negative Reactions/').set(currentPositiveVal);
          }
          firebaseApp.database().ref('/videos/' + this.city + '/' + this.videoName + '/Positive Reactions/').set(1);
        }
      }).then(() => {
        firebaseApp.database().ref('/Users/' + this.emailHash + '/Reactions/' + this.videoName + '/reaction/').set("negative");
        firebaseApp.database().ref('/Users/' + this.emailHash + '/Reactions/' + this.videoName + '/city/').set(this.city);
      })
    })
  }

  pin = () => {
    firebaseApp.database().ref('/Users/' + this.emailHash + '/Pinned/' + this.videoName + '/').set(this.city);
  }

  openVideoPlayer = () => {
    var vidIdStartIndex = this.props.videoUrl.indexOf("=");
    var videoID = this.props.videoUrl.slice(vidIdStartIndex+1, this.props.videoUrl.length);
    this.props.navigation.navigate('VideoPlayer', {VideoPlayerVideoId: videoID, VideoPlayerEmailHashVideoPlayer: this.props.emailHash, VideoPlayerVideoName: this.videoName, VideoCity: this.city});
  }


  //() => Linking.openURL(this.props.videoUrl) - former onPress for whole component
  render() {
    return (
      <ScrollView style={styles.containerz}>
        <View style={styles.stepz}>
          <View style={{flex:1}}>
          <View style={styles.container}>
            <TouchableOpacity onPress={this.openVideoPlayer}>
              <Text style={{fontSize: 13, marginLeft: 7, marginTop: -7, marginBottom: 3}}>{this.props.videoName}</Text>
              <Image source={{uri: this.props.picUrl}} style={{width: 348, height: 196}}/>
            </TouchableOpacity>
          </View>
            <View style={styles.pickContainerz}>
              <TouchableHighlight onPress={this.pin} style={{flex:1}}>
                <View style={styles.pickWrapperz}>
                  <View style={styles.circ}>
                    <Image
                      source={{uri: 'https://user-images.githubusercontent.com/18129905/37549920-b3cc89f0-295b-11e8-9c7d-4128f639ddb2.png'}}
                      style={styles.arrowWinz}
                    />
                  </View>
                </View>
              </TouchableHighlight>

              <TouchableHighlight onPress={this.positiveReaction}  style={{flex:1}}>
                <View style={styles.pickWrapperz}>
                  <View style={styles.circ}>
                    <Image
                      source={{uri: 'https://user-images.githubusercontent.com/18129905/37549908-9838279e-295b-11e8-92cf-ee3de1972d5b.png'}}
                      style={styles.arrowDrawz}
                    />
                  </View>
                </View>
              </TouchableHighlight>

              <TouchableHighlight onPress={this.negativeReaction}  style={{flex:1}}>
                <View style={styles.pickWrapperz}>
                  <View style={styles.circ}>
                    <Image
                      source={{uri: 'https://user-images.githubusercontent.com/18129905/37549914-a6982960-295b-11e8-9493-f24db3c1e13a.png'}}
                      style={styles.arrowWinz}
                    />
                  </View>
                </View>
              </TouchableHighlight>
            </View>
          </View>
        </View>
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
  },
  containerz: {
  flex: 1,
  backgroundColor: '#e1e1e1'
},
stepz: {
  backgroundColor: '#ffffff',
  borderRadius: 4,
  flex: 1,
  marginLeft: 5,
  marginRight: 5,
  marginBottom: 10,
  paddingLeft: 0,
  paddingRight: 0,
  paddingTop: 10,
  paddingBottom: 10,
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowRadius: 2,
  shadowOpacity: 0.2,
  shadowColor: 'black',
  textAlign: 'center',
},
headingz: {
  textAlign: 'center',
  fontWeight: 'bold',
  fontSize: 15,
  color: '#333333',
},
pickContainerz: {
  flex:1,
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
},
pickWrapperz: {
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'space-around',
  alignItems: 'center',
  marginTop: 10,
},
circ: {
  height: 33,
  borderRadius: 30,
  width: 33,
  backgroundColor: '#ffffff',
  alignItems: 'center',
  justifyContent: 'center',
},
circlePin: {
  height: 33,
  borderRadius: 30,
  width: 33,
  backgroundColor: '#A2A1A1',
  alignItems: 'center',
  justifyContent: 'center',
},
circlePositive: {
  height: 33,
  borderRadius: 30,
  width: 33,
  backgroundColor: '#49C7E3',
  alignItems: 'center',
  justifyContent: 'center',
},
circleNegative: {
  height: 33,
  borderRadius: 30,
  width: 33,
  backgroundColor: '#EE4C50',
  alignItems: 'center',
  justifyContent: 'center',
},
circleActivez: {
  backgroundColor: 'red',
},
arrowWinz: {
  width: 20,
  height: 20,
},
arrowDrawz: {
  width: 20,
  height: 20,
},
});
