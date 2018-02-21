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

export default class UpdateProfile extends Component<{}>{
  userRef = firebaseApp.database().ref('/Users/' + this.props.navigation.state.params.emailHashUpdateProfile + "/");
  emailHash = this.props.navigation.state.params.emailHashUpdateProfile;
  interestsArr = [];
  engagementArr = [];
  upadatePrefArr = [];
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
      for(var i=0; i<this.interestsArr.length; i++){
        this.interestsArr[i] = <View><View style={styles.space}></View><Text>{this.interestsArr[i]}</Text></View>
      }
      
      for(var i=0; i<this.engagementArr.length; i++){
        this.engagementArr[i] = <View><View style={styles.space}></View><Text>{this.engagementArr[i]}</Text></View>
      }
      
      for(var i=0; i<this.updatePrefArr.length; i++){
        this.updatePrefArr[i] = <View><View style={styles.space}></View><Text>{this.updatePrefArr[i]}</Text></View>
      }
      
      for(var i=0; i<this.demographicsArr.length; i++){
        this.demographicsArr[i] = <View><View style={styles.space}></View><Text>{this.demographicsArr[i]}</Text></View>
      }
    });
  }
  
  updateInterests = () => {
    this.props.navigation.navigate('UpdateInterests', {emailHashUpdateInterests: this.emailHash});
  }
  
  updateEngagement = () => {
    this.props.navigation.navigate('UpdateEngagement', {emailHashUpdateEngagement: this.emailHash});
  }
  
  updatePreferences = () => {
    this.props.navigation.navigate('UpdateDemographics', {emailHashUpdateDemographics: this.emailHash});
  }
  
  updateDemographics = () => {
    this.props.navigation.navigate('UpdateUpdatePreferences', {emailHashUpdateUpdatePreferences: this.emailHash});
  }
  
  goToCouncil = () => {
    this.props.navigation.navigate('CouncilScreen');
  }
  
  logout = () => {
    this.props.navigation.navigate('Home');
  }
  
  render() {
    console.disableYellowBox = true;
    if (this.state.loading) {
      return (<Text>Loading...</Text>)
    }
    return (
      <ScrollView>
        <View style={styles.space}></View>
        <View style={styles.container}>{this.interestsArr}</View>
        <Button onPress={this.updateInterests} title="Update interests"/>
        <View style={styles.space}></View>
        <View style={styles.container}>{this.engagementArr}</View>
        <Button onPress={this.updateEngagement} title="Update engagement settings"/>
        <View style={styles.space}></View>
        <View style={styles.container}>{this.updatePrefArr}</View>
        <Button onPress={this.updatePreferences} title="Update notification preferences"/>
        <View style={styles.space}></View>
        <View style={styles.container}>{this.demographicsArr}</View>
        <Button onPress={this.updateDemographcis} title="Update demographic information"/>
        <View style={styles.space}></View>
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