import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  Alert,
  TouchableOpacity,
  TextInput,
  ScrollView,
  TouchableHighlight,
} from 'react-native';
import sha1 from 'sha1';
import {firebaseApp} from '../App';
import {LoginManager, AccessToken} from 'react-native-fbsdk';
import VideoComponent from '../mainFeedComponents/videoComponent';

export default class PinnedPosts extends Component<{}>{
  userRef = firebaseApp.database().ref('/Users/' + this.props.navigation.state.params.emailHashPinnedPosts + "/");
  emailHash = this.props.navigation.state.params.emailHashPinnedPosts;
  videosArr = [];

  componentWillMount(){
    console.log("this.videosArr");
    console.log(this.videosArr);
    //Before showing screen, need to populate videosArr with videos that user has pinned
    var pinnedVideos = []; //Will serve as 2d array where 1st element is name of video, and second is name of city associated with video
    this.setState({loading: true});
    this.userRef.once("value").then((snap) => {
      if(snap.hasChild("Pinned")){
        //for each pinned video get video name and associated city for later lookup
        snap.child("Pinned").forEach((secondChild) => {
          var videoInfo = [];
          videoInfo.push(secondChild.key);
          videoInfo.push(secondChild.val());
          console.log("pinnedVideos:");
          console.log(pinnedVideos);
          pinnedVideos.push(videoInfo);
        })
      }
    }).then(() => {
      firebaseApp.database().ref('/videos/').once("value").then((snap) => {
        for(var i=0; i<pinnedVideos.length; i++){
          var video = snap.child(pinnedVideos[i][1]).child(pinnedVideos[i][0]);
          var city = pinnedVideos[i][1];
          var videoUrl = video.val().urlvideo;
          var picUrl = video.val().urlpic;
          var videoName = pinnedVideos[i][0];
          this.videosArr.push(<VideoComponent navigation={this.props.navigation} videoCity={city} videoUrl={videoUrl} picUrl={picUrl} videoName={videoName} emailHash={this.emailHash}/>)
        }
      }).then(() => {
        this.setState({loading: false});
      })
    })
  }

  goBack = () => {
    this.props.navigation.navigate('MainFeed', {emailhashmain: this.emailHash});
  }

  render() {
    if (this.state.loading) {
      return (<Text>Loading...</Text>)
    }

    return (
      <View style={{flex: 1}}>
      <View style={styles.stepzTop}>
        <View style={{flex:1}}>
          <View style={styles.pickContainerz}>

            <TouchableHighlight onPress={this.logout}  style={{flex:1, marginRight: 75}}>
              <View style={styles.pickWrapperz}>
                <View style={styles.circlesTop}>
                  <Image
                    source={{uri: 'https://user-images.githubusercontent.com/18129905/37560140-6b94e5a2-2a09-11e8-9705-6fbb8681a2f2.png'}}
                    style={styles.topIcons}
                  />
                </View>
              </View>
            </TouchableHighlight>


            <Image
              style={{width: 57, height: 40, marginTop: 20}}
              source={{uri: 'https://user-images.githubusercontent.com/18129905/35842080-0e87b16e-0ace-11e8-9fc0-151043ca61fe.png'}}
            />


            <TouchableHighlight onPress={this.updateProfile}  style={{flex:1, marginLeft: 75}}>
              <View style={styles.pickWrapperz}>
                <View style={styles.circlesTop}>
                  <Image
                    source={{uri: 'https://user-images.githubusercontent.com/18129905/37560135-5cd45bd8-2a09-11e8-8af5-fd98c2900ae8.png'}}
                    style={styles.topIcons}
                  />
                </View>
              </View>
            </TouchableHighlight>
          </View>
        </View>
      </View>





      <ScrollView>
         <View style={styles.space}></View>
         <View style={styles.space}></View>
         <Text style={{fontSize: 14, textAlign: 'center'}}>This page allows for you to view your personal feedback for previously viewed videos.</Text>
         <View style={styles.space}></View>
         <View style={styles.container}>{this.videosArr}</View>
         <View style={styles.space}></View>
	 <View style={styles.container}>
         <View style={styles.buttonzRed}>
           <TouchableOpacity onPress={this.goBack}>
             <Text style={{fontSize: 16, textAlign: 'center'}}>Back</Text>
           </TouchableOpacity>
         </View>
         </View>
	 <View style={styles.space2}></View>
	 </ScrollView>





      <View style={styles.stepz}>
        <View style={{flex:1}}>
          <View style={styles.pickContainerz}>
            <TouchableHighlight onPress={this.goToCouncil} style={{flex:1}}>
              <View style={styles.pickWrapperz}>
                <View style={styles.circlesTwo}>
                  <Image
                    source={{uri: 'https://user-images.githubusercontent.com/18129905/37560127-4e64b318-2a09-11e8-9a2e-5d16e6241b7a.png'}}
                    style={styles.arrowWinz}
                  />
                </View>
              </View>
            </TouchableHighlight>

            <TouchableHighlight onPress={this.updateProfile}  style={{flex:1}}>
              <View style={styles.pickWrapperz}>
                <View style={styles.circlesTwo}>
                  <Image
                    source={{uri: 'https://user-images.githubusercontent.com/18129905/37560135-5cd45bd8-2a09-11e8-8af5-fd98c2900ae8.png'}}
                    style={styles.arrowDrawz}
                  />
                </View>
              </View>
            </TouchableHighlight>

            <Image
              style={{width: 100, height: 100, marginTop: 10, marginBottom: 20}}
              source={{uri: 'https://user-images.githubusercontent.com/18129905/35187343-734d21b4-fdf0-11e7-8799-761570dea412.png'}}
            />

            <TouchableHighlight onPress={this.updateFeedback}  style={{flex:1}}>
              <View style={styles.pickWrapperz}>
                <View style={styles.circlesTwo}>
                  <Image
                    source={{uri: 'https://user-images.githubusercontent.com/18129905/37560114-018fe792-2a09-11e8-91d3-22d8f6e49c82.png'}}
                    style={styles.arrowDrawz}
                  />
                </View>
              </View>
            </TouchableHighlight>

            <TouchableHighlight onPress={this.logout}  style={{flex:1}}>
              <View style={styles.pickWrapperz}>
                <View style={styles.circlesTwo}>
                  <Image
                    source={{uri: 'https://user-images.githubusercontent.com/18129905/37560140-6b94e5a2-2a09-11e8-9705-6fbb8681a2f2.png'}}
                    style={styles.arrowWinz}
                  />
                </View>
              </View>
            </TouchableHighlight>
          </View>
        </View>
      </View>
      </View>
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
  space: {
    height: 30,
  },
  stepzTop: {
    backgroundColor: '#49C7E3',
    borderRadius: 1,
    flex: 1,
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 25,
    paddingBottom: 25,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 3,
    shadowOpacity: 0.2,
    shadowColor: 'black',
    textAlign: 'center',
  },
  stepz: {
    backgroundColor: '#ffffff',
    borderRadius: 1,
    flex: 1,
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 25,
    paddingBottom: 35,
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowRadius: 3,
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
  circles: {
    height: 33,
    borderRadius: 30,
    width: 33,
    backgroundColor: '#A2A1A1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circlesTwo: {
    height: 55,
    borderRadius: 0,
    width: 55,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circlesTop: {
    height: 30,
    borderRadius: 0,
    width: 30,
    backgroundColor: '#49C7E3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circlesThree: {
    height: 33,
    borderRadius: 30,
    width: 33,
    backgroundColor: '#A2A1A1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleActivez: {
    backgroundColor: 'red',
  },
  arrowWinz: {
    width: 30,
    height: 30,
  },
  arrowDrawz: {
    width: 30,
    height: 30,
  },
  topIcons: {
    width: 22,
    height: 22,
  },
  buttonzRed: {
    height: 40,
    borderRadius: 4,
    width: 320,
    marginBottom: 30,
    backgroundColor: '#EE4C50',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
