import React, { Component } from 'react';
import {
  StyleSheet,
  AsyncStorage,
  Text,
  View,
  Button,
  TouchableOpacity,
  TouchableHighlight,
  TextInput,
  Alert,
  ScrollView,
  Image,
} from 'react-native';
import {firebaseApp} from '../App'

// Why are these here?
import VideoComponent from '../mainFeedComponents/videoComponent'
import TextComponent from '../mainFeedComponents/textComponent'

import FeedCard from '../components'

export default class MainFeed extends Component {
  static navigationOptions = {
    title: 'Feed'
  };

  constructor(props) {
    super(props);

    this.state = {
      videos: [],
      loading: false
    };

    this.videosArr = [];
  }

  async componentDidMount() {
    //Set loading state to true so that asynchronous calls to db can be made before page loads
    this.setState({loading: true});

    this.emailHashMain = await AsyncStorage.getItem('userEmailHash');
    this.userRef = firebaseApp.database().ref(`/Users/${this.emailHashMain}/`);

    this.fetchVideos()    
  }

  logout = () => {
    this.props.navigation.navigate('Home');
  }

  fetchVideos = async () => {
    var videosRef = firebaseApp.database().ref('/videos/');
    var videos = [];
    var userPreferences = [];
    var userCities = [];

    firebaseApp.database().ref('/Users/' + this.emailHashMain + '/cities/').once("value").then((snap) => {
      snap.forEach((child) => {
        userCities.push(child.key);
        console.log("just pushed the following to user city");
        console.log(child.key);
      })
    }).then(() => {
      //Get snapshot of databse
      videosRef.once("value").then((snap) => {
        console.log("inside of videosRef call");
        console.log(snap.val());
        //Iterate through each video
        snap.forEach((child) => {
          console.log("inside of snap.forEach loop");
          console.log(child.val());
          console.log(child.key);
          if(userCities.includes(child.key)){
            var cityName = child.key;

            child.forEach((secondChild) => {
              var videoURL = secondChild.val().urlvideo;
              var picURL = secondChild.val().urlpic;
              var videoName = secondChild.val().name;
              console.log(videoName);
              var tags = [];//Array with tags pertaining to the interests that the video may encapsulate
              secondChild.child("tags").forEach((child) => {
                tags.push(child.key);
              })
              var matchScore = 0; //Represents how closely a given video matches with a users preferences
              var video = [videoURL, picURL, videoName, tags, matchScore, cityName];
              videos.push(video);
            })
          }

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
              for(var i=0; i<videos.length; i++){
                for(var k=0; k<videos.length-1; k++){
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
                this.videosArr.push(
                  <VideoComponent  videoCity={videos[i][5]} navigation={this.props.navigation} videoUrl={videos[i][0]} picUrl={videos[i][1]} videoName={videos[i][2]} emailHash={this.emailHashMain}/>
                );
                console.log(videos[i][1]);
                console.log("successfully added a video!");
              }
            }).then(() => {
              //Once db values have loaded, set "loading" state to false so that rest of page can render
              this.setState({loading: false});
            })
        })
    })
  }

  fetchMockVideos = async () => {
  }

  render() {
    // TODO: videos stored in the state should be mapped in the render function into jsx elements
    // const feed = this.state.video.map(video => <<FeedCard /> );
    const videos = this.videosArr.map(video => <FeedItem />);

    console.disableYellowBox = true;
    if (this.state.loading) {
      return (<Text>Loading...</Text>)
    }
    return (
      <View style={{flex: 1}}>
      {/* TODO: this needs to be moved into either its own Header component, or use react-navigation style headers */}
      {/*
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
      */}
      <ScrollView>
        <View style={styles.space2}></View>
        <View style={styles.container}>{this.videosArr}</View>
        <View style={styles.space2}></View>

        {videos}

        {/* <View style={styles.container}><TouchableHighlight onPress={this.pinnedPosts}><Text>go to pinned posts</Text></TouchableHighlight></View> */}
      </ScrollView>
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
  space2: {
    height: 5,
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
    // textAlign: 'center',
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
});
