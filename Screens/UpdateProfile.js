import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  TextInput,
  Alert,
  ScrollView,
} from 'react-native';
import {firebaseApp} from '../App'

export default class UpdateProfile extends Component<{}>{
  userRef = firebaseApp.database().ref('/Users/' + this.props.navigation.state.params.emailHashUpdateProfile + "/");
  emailHash = this.props.navigation.state.params.emailHashUpdateProfile;
  interestsArr = [];
  engagementArr = [];
  updatePrefArr = [];
  demographicsArr = [];

  componentWillMount() {
    //Set loading state to true so that asynchronous calls to db can be made before page loads
    this.setState({loading: true});

    this.userRef.once("value").then((snap) => {
      //Get the users interests and populate interestsArr with relevant information; repeat thsi process with engagement, updatePref, and demographics
      var interests = snap.child("interests");
      interests.forEach((child) => {
        this.interestsArr.push(child.key);
      })

      var engagements = snap.child("engagement");
      engagements.forEach((child) => {
        this.engagementArr.push(child.key);
      })

      var updatePreferences = snap.child("update preferences");
      updatePreferences.forEach((child) => {
        this.updatePrefArr.push(child.key);
      })

      snap.forEach((child) => {
        if(child.key == "age" || child.key == "children" || child.key == "education" || child.key == "income" || child.key == "marital"){
          this.demographicsArr.push(child.val());
        }
      })
    }).then(() => {
      //Need to update the UI with all this info
      if(this.interestsArr.length != undefined){
        for(var i=0; i<this.interestsArr.length; i++){
          this.interestsArr[i] = <View><View style={styles.space}></View><Text>{this.interestsArr[i]}</Text></View>
        }
      }

      if(this.engagementArr != undefined){
        for(var i=0; i<this.engagementArr.length; i++){
          this.engagementArr[i] = <View><View style={styles.space}></View><Text>{this.engagementArr[i]}</Text></View>
        }
      }

      if(this.updatePrefArr != undefined){
        for(var i=0; i<this.updatePrefArr.length; i++){
          this.updatePrefArr[i] = <View><View style={styles.space}></View><Text>{this.updatePrefArr[i]}</Text></View>
        }
      }

      if(this.demographicsArr != undefined){
        for(var i=0; i<this.demographicsArr.length; i++){
          this.demographicsArr[i] = <View><View style={styles.space}></View><Text>{this.demographicsArr[i]}</Text></View>
        }
      }
    }).then(() => {
      this.setState({loading: false});
    });
  }

  updateInterests = () => {
    this.props.navigation.navigate('UpdateInterests', {emailHashUpdateInterests: this.emailHash});
  }

  updateEngagement = () => {
    this.props.navigation.navigate('UpdateEngagement', {emailHashUpdateEngagement: this.emailHash});
  }

  updatePreferences = () => {
    this.props.navigation.navigate('UpdateUpdatePreferences', {emailHashUpdateUpdatePreferences: this.emailHash});
  }

  updateDemographics = () => {
    this.props.navigation.navigate('UpdateDemographics', {emailHashUpdateDemographics: this.emailHash});
  }

  goToCouncil = () => {
    this.props.navigation.navigate('CouncilScreen');
  }

  logout = () => {
    this.props.navigation.navigate('Home');
  }

  back = () => {
    this.props.navigation.navigate('MainFeed', {emailhashmain: this.emailHash})
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
      <View style={styles.space}></View>
      <Text style={{textAlign: 'center', fontSize: 16}}>Your interests: </Text>
      <View style={styles.space}></View>
      <View style={styles.container}>{this.interestsArr}</View>
      <View style={styles.space}></View>
      <View style={styles.container}>
      <View style={styles.buttonz}>
        <TouchableOpacity onPress={this.updateInterests}>
          <Text style={{fontSize: 16, textAlign: 'center'}}>Update Interests</Text>
        </TouchableOpacity>
      </View>
      </View>
      <View style={styles.space}></View>
      <Text style={{textAlign: 'center', fontSize: 16}}>Your engagement settings: </Text>
      <View style={styles.space}></View>
      <View style={styles.container}>{this.engagementArr}</View>
      <View style={styles.space}></View>
      <View style={styles.container}>
      <View style={styles.buttonz}>
        <TouchableOpacity onPress={this.updateEngagement}>
          <Text style={{fontSize: 16, textAlign: 'center'}}>Update Engagement Settings</Text>
        </TouchableOpacity>
      </View>
      </View>
      <View style={styles.space}></View>
      <Text style={{textAlign: 'center', fontSize: 16}}>Your notification information: </Text>
      <View style={styles.space}></View>
      <View style={styles.container}>{this.updatePrefArr}</View>
      <View style={styles.space}></View>
      <View style={styles.container}>
      <View style={styles.buttonz}>
        <TouchableOpacity onPress={this.updatePreferences}>
          <Text style={{fontSize: 16, textAlign: 'center'}}>Update Notification Preferences</Text>
        </TouchableOpacity>
      </View>
      </View>
      <View style={styles.space}></View>
      <Text style={{textAlign: 'center', fontSize: 16}}>Your demographic information: </Text>
      <View style={styles.space}></View>
      <View style={styles.container}>{this.demographicsArr}</View>
      <View style={styles.space}></View>
      <View style={styles.container}>
      <View style={styles.buttonz}>
        <TouchableOpacity onPress={this.updateDemographics}>
          <Text style={{fontSize: 16, textAlign: 'center'}}>Update Demographic Information</Text>
        </TouchableOpacity>
      </View>
      </View>
      <View style={styles.space}></View>
      <View style={styles.container}>
      <View style={styles.buttonzRed}>
        <TouchableOpacity onPress={this.back}>
          <Text style={{fontSize: 16, textAlign: 'center'}}>Back to Feed</Text>
        </TouchableOpacity>
      </View>
      </View>
      <View style={styles.space}></View>
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
buttonz: {
  height: 40,
  borderRadius: 4,
  width: 320,
  marginBottom: 30,
  backgroundColor: '#49C7E3',
  alignItems: 'center',
  justifyContent: 'center',
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
