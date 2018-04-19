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
  TouchableHighlight,
  Image
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
          console.log("added a video");
          console.log(feedback[i]);
          this.videosArr.push(
            <VideoComponent navigation={this.props.navigation} videoUrl={feedback[i][3]} picUrl={feedback[i][2]} videoName={feedback[i][4]} emailHash={this.emailHashMain}/>
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
