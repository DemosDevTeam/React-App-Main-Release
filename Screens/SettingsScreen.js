import React from 'react'
import { View, StyleSheet, Text, AsyncStorage, ScrollView, TouchableOpacity } from 'react-native'
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
          <Text>SETTINGS AND PREFERENCES</Text>
          <View style={styles.space}></View>
          <Text>Demographic Information</Text>
          <View>{gender}</View>
          <View>{race}</View>
          <View>{income}</View>
          <View>{age}</View>
          <View>{occupation}</View>
          <View>{education}</View>
          <View>{children}</View>
          <View>{marital}</View>
          <TouchableOpacity onPress={this.updateDemographics}><Text>Update demographics</Text></TouchableOpacity>
          <View style={styles.space}></View>

          <Text>Your engagement preferences</Text>
          <View>{engagementJsx}</View>
          <TouchableOpacity onPress={this.updateEngagement}><Text>Update engagement preferences</Text></TouchableOpacity>
          <View style={styles.space}></View>

          <Text>Your interests</Text>
          <View>{interestsJsx}</View>
          <TouchableOpacity onPress={this.updateInterests}><Text>Change interests</Text></TouchableOpacity>
          <View style={styles.space}></View>

          <Text>Your update preferences</Text>
          <View>{updatePreferencesJsx}</View>
          <TouchableOpacity onPress={this.updateUpdatePreferences}><Text>Change update preferences</Text></TouchableOpacity>
          <View style={styles.space}></View>

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
