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
      <ScrollView style={styles.containerz}>
        <View style={styles.stepz}>
          <View style={{flex:1}}>
          <View style={styles.container}>
            <TouchableOpacity onPress={this.openVideoPlayer}>
              <Image source={{uri: this.props.picUrl}} style={{width: 300, height: 168}}/>
              <Text>{this.props.videoName}</Text>
            </TouchableOpacity>
          </View>
            <View style={styles.pickContainerz}>
              <TouchableHighlight onPress={this.positiveReaction} style={{flex:1}}>
                <View style={styles.pickWrapperz}>
                  <View style={styles.circlePin}>
                    <Image
                      source={{uri: 'https://user-images.githubusercontent.com/18129905/37549920-b3cc89f0-295b-11e8-9c7d-4128f639ddb2.png'}}
                      style={styles.arrowWinz}
                    />
                  </View>
                </View>
              </TouchableHighlight>

              <TouchableHighlight onPress={this.positiveReaction}  style={{flex:1}}>
                <View style={styles.pickWrapperz}>
                  <View style={styles.circlePositive}>
                    <Image
                      source={{uri: 'https://user-images.githubusercontent.com/18129905/37549908-9838279e-295b-11e8-92cf-ee3de1972d5b.png'}}
                      style={styles.arrowDrawz}
                    />
                  </View>
                </View>
              </TouchableHighlight>

              <TouchableHighlight onPress={this.negativeReaction}  style={{flex:1}}>
                <View style={styles.pickWrapperz}>
                  <View style={styles.circleNegative}>
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
  marginLeft: 10,
  marginRight: 10,
  marginBottom: 10,
  paddingLeft: 15,
  paddingRight: 10,
  paddingTop: 15,
  paddingBottom: 15,
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
