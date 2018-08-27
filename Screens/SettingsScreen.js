import React from 'react'
import { View, StyleSheet, Text, AsyncStorage, Image, ScrollView, TouchableOpacity } from 'react-native'
import { to } from '../components/util'
import FeedbackFeedItem from '../components/FeedbackFeedItem'
import firebaseApp from '../firebaseApp'

export default class SettingsScreen extends React.Component {
  state = {
    loading: true,
    keyTwo: 0,
  }


  constructor(props) {
    super(props);
  }

  componentDidMount = async () => {
    this.sub = this.props.navigation.addListener('didFocus', () => {
      console.log("MainFeed came into focus");
      let keyTwo = this.state.keyTwo;
      keyTwo = keyTwo+1;
      this.setState({'keyTwo':keyTwo});
    })
    const user = await AsyncStorage.getItem('user');
    const database = firebaseApp.database();


    await database.ref('/Users/' + user + '/').once('value').then(snap => {
      let snapVal = snap.val();
      //Set demographic info as state properties
      this.setState({'gender': snapVal.gender});
      this.setState({'race': snapVal.race});
      this.setState({'income': snapVal.income});
      this.setState({'age': snapVal.age});
      this.setState({'occupation': snapVal.occupation});
      this.setState({'education': snapVal.education});
      this.setState({'children': snapVal.children});
      this.setState({'marital': snapVal.marital});

      //Set engagement preferences as state properties
      let engagement = [];
      snap.child('engagement').forEach(child => {
        engagement.push(child.key);
      })
      this.setState({'engagement': engagement});

      //Set interest preferences as state properties
      let interests = [];
      snap.child('interests').forEach(child => {
        interests.push(child.key);
      })
      this.setState({'interests': interests});

      //Set update preferences as state properties
      let updatePreferences = [];
      snap.child('update preferences').forEach(child => {
        updatePreferences.push(child.key);
      })
      this.setState({'updatePreferences': updatePreferences});
    })
    //set loading state var to false so that page will render correctly
    this.setState({'loading': false});
  }

  componentWillUnmount() {
    this.sub.remove();
  }

  updateDemographics = () => {
    this.props.navigation.navigate('ChangeDemographics');
  }

  updateEngagement = () => {
    this.props.navigation.navigate('ChangeEngagement');
  }

  updateInterests = () => {
    this.props.navigation.navigate('ChangeInterests');
  }

  updateUpdatePreferences = () => {
    this.props.navigation.navigate('ChangeUpdatePreferences');
  }

  signOut = async () => {
    console.log('called signOut');
    await AsyncStorage.setItem('user', '');
    this.props.navigation.navigate('Home');
  }

  render() {
    if(this.state.loading){
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      )
    } else {
      const gender = <View><Text>{this.state.gender}</Text></View>
      const race = <View><Text>{this.state.race}</Text></View>
      const income = <View><Text>{this.state.income}</Text></View>
      const age = <View><Text>{this.state.age}</Text></View>
      const occupation = <View><Text>{this.state.occupation}</Text></View>
      const education = <View><Text>{this.state.education}</Text></View>
      const children = <View><Text>{this.state.children}</Text></View>
      const marital = <View><Text>{this.state.children}</Text></View>

      console.log("engagement obj:");
      console.log(this.state.engagement);
      const engagementJsx = this.state.engagement.map((engagementType) => (
        <View><Text>{engagementType}</Text></View>
      ))

      const interestsJsx = this.state.interests.map((interestType) => (
        <View><Text>{interestType}</Text></View>
      ))

      const updatePreferencesJsx = this.state.updatePreferences.map((updatePref) => (
        <View><Text>{updatePref}</Text></View>
      ))
      console.log(this.state);
      return (
        <ScrollView styles={{flex: 1, justifyContent: 'space-between'}}>

        <View style={{marginLeft: 19, marginRight: 19, marginBottom: 5, borderRadius: 5, alignItems: 'center'}}>
          <Text style={{marginLeft: 19, marginRight: 19, marginBottom: 5, fontWeight: 'bold', fontSize: 14, borderRadius: 5, width: 400, backgroundColor: '#49C7E3', textAlign: 'center', justifyContent: 'center', paddingTop: 12, paddingBottom: 12}}>SETTINGS AND PREFERENCES</Text>
          <View style={styles.space}></View>
          <Text style={{fontWeight: 'bold'}}>My Demographic Information</Text>
        </View>
        <View style={{marginLeft: 19, marginRight: 19, marginTop: 5, marginBottom: 5, borderRadius: 5, alignItems: 'center'}}>
          <Text style={{fontWeight: 'bold'}}>Gender:</Text>
          <View>{gender}</View>
          <View style={{height: 10}}></View>
          <Text style={{fontWeight: 'bold'}}>Race:</Text>
          <View>{race}</View>
          <View style={{height: 10}}></View>
          <Text style={{fontWeight: 'bold'}}>Household Income Range:</Text>
          <View>{income}</View>
          <View style={{height: 10}}></View>
          <Text style={{fontWeight: 'bold'}}>Age Range:</Text>
          <View>{age}</View>
          <View style={{height: 10}}></View>
          <Text style={{fontWeight: 'bold'}}>Employment Area:</Text>
          <View>{occupation}</View>
          <View style={{height: 10}}></View>
          <Text style={{fontWeight: 'bold'}}>Education Level:</Text>
          <View>{education}</View>
          <View style={{height: 10}}></View>
          <Text style={{fontWeight: 'bold'}}>Number of Children:</Text>
          <View>{children}</View>
          <View style={{height: 10}}></View>
          <Text style={{fontWeight: 'bold'}}>Marital Status:</Text>
          <View>{marital}</View>
          <View style={{height: 4}}></View>
          </View>
          <View style={{marginLeft: 30, marginRight: 30, marginTop: 5, marginBottom: 5, borderRadius: 5, alignItems: 'center', backgroundColor: '#F05758', paddingTop: 3, paddingBottom: 3}}>
          <TouchableOpacity onPress={this.updateDemographics}><Text>Update Demographics</Text></TouchableOpacity>
          </View>
          <View style={{height: 10}}></View>
          <View
            style={{
                borderBottomColor: '#A9A9A9',
                borderBottomWidth: 0.75,
            }}
          />
          <View style={{height: 10}}></View>
          <View style={{marginLeft: 19, marginRight: 19, marginTop: 5, marginBottom: 5, borderRadius: 5, alignItems: 'center'}}>
          <Text style={{fontWeight: 'bold'}}>My Engagement Preferences</Text>
          <View style={{height: 3}}></View>
          <View>{engagementJsx}</View>
          </View>
          <View style={{marginLeft: 30, marginRight: 30, marginTop: 5, marginBottom: 5, borderRadius: 5, alignItems: 'center', backgroundColor: '#F05758', paddingTop: 3, paddingBottom: 3}}>
          <TouchableOpacity onPress={this.updateEngagement}><Text>Update Engagement Preferences</Text></TouchableOpacity>
          </View>
          <View style={{height: 10}}></View>
          <View
            style={{
                borderBottomColor: '#A9A9A9',
                borderBottomWidth: 0.75,
            }}
          />
          <View style={styles.space}></View>
          <View style={{marginLeft: 19, marginRight: 19, marginTop: 5, marginBottom: 5, borderRadius: 5, alignItems: 'center'}}>
          <Text style={{fontWeight: 'bold'}}>My Interests</Text>
          <View style={{height: 3}}></View>
          <View>{interestsJsx}</View>
          </View>
          <View style={{marginLeft: 30, marginRight: 30, marginTop: 5, marginBottom: 5, borderRadius: 5, alignItems: 'center', backgroundColor: '#F05758', paddingTop: 3, paddingBottom: 3}}>
          <TouchableOpacity onPress={this.updateInterests}><Text>Change Interests</Text></TouchableOpacity>
          </View>
          <View style={{height: 10}}></View>
          <View
            style={{
                borderBottomColor: '#A9A9A9',
                borderBottomWidth: 0.75,
            }}
          />
          <View style={styles.space}></View>
          <View style={{marginLeft: 19, marginRight: 19, marginTop: 5, marginBottom: 5, borderRadius: 5, alignItems: 'center'}}>
          <Text style={{fontWeight: 'bold'}}>My Update Preferences</Text>
          <View style={{height: 3}}></View>
          <View>{updatePreferencesJsx}</View>
          </View>
          <View style={{marginLeft: 30, marginRight: 30, marginTop: 5, marginBottom: 5, borderRadius: 5, alignItems: 'center', backgroundColor: '#F05758', paddingTop: 3, paddingBottom: 3}}>
          <TouchableOpacity onPress={this.updateUpdatePreferences}><Text>Change Update Preferences</Text></TouchableOpacity>
          </View>
          <View style={{height: 10}}></View>
          <View
            style={{
                borderBottomColor: '#A9A9A9',
                borderBottomWidth: 0.75,
            }}
          />
          <View style={styles.space}></View>
          <View style={{height: 6}}></View>
          <View style={{marginLeft: 30, marginRight: 30, marginTop: 5, marginBottom: 5, borderRadius: 5, alignItems: 'center', backgroundColor: '#C8C8C8', paddingTop: 3, paddingBottom: 3}}>
          <TouchableOpacity onPress={this.signOut}><Text>Sign Out</Text></TouchableOpacity>
          </View>
          <View style={{height: 3}}></View>
          <View style={{marginLeft: 19, marginRight: 19, marginTop: 5, marginBottom: 5, borderRadius: 5, alignItems: 'center'}}>
          <Image
              style={{height: 45, width: 80}}
              source={{ uri: 'https://user-images.githubusercontent.com/18129905/43050902-6fc94544-8dde-11e8-94fd-9bdfa1df6ead.png'}}
          />
          </View>
          <View style={{height: 8}}></View>
        </ScrollView>
      )
    }
  }

}

var styles = StyleSheet.create({
  space: {
    height: 5,
  },
});
