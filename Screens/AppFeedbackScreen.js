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
  AsyncStorage,
} from 'react-native';
import firebaseApp from '../firebaseApp'

export default class AppFeedbackScreen extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      'feedback': ''
    }
  }



  storeFeedback = (feedback) => {
    this.state.feedback = feedback;
    console.log("value of feedback is");
    console.log(this.state.feedback);
  }

  submit = async () => {
    const user = await AsyncStorage.getItem('user');
    await firebaseApp.database().ref('/Users/' + user + '/App Feedback/').set(this.state.feedback);
    this.props.navigation.navigate('Settings');
  }

  render() {
    return (
      <ScrollView>
      <View style={{alignItems: 'center', justifyContent: 'center', marginTop: 20, marginLeft: 20, marginRight: 20}}>
      <Image
      style={{width: 120, height: 120, marginTop: 20, marginBottom: 20}}
      source={{uri: 'https://user-images.githubusercontent.com/18129905/35187343-734d21b4-fdf0-11e7-8799-761570dea412.png'}}
      />
      <View style={{height: 20}}></View>
      <Text>The main purpose of Acta is to increase the transparency and communication between you and your local government. We intend for this app to serve as an accessible, easy-to-use outlet to empower you with information and let your voice be heard by the decision-makers.
      </Text>
      </View>
      <View style={{height: 20}}></View>
      <View style={{alignItems: 'center', justifyContent: 'center', marginLeft: 20, marginRight: 20}}>
      <Text>We want your feedback! What do you like and dislike about the app? How can we improve it to fit your individual needs and support your voice?
      </Text>
      <View style={{height: 20}}></View>
        <TextInput
        placeholder='   Please add your feedback here'
        style={{marginLeft: 19, marginRight: 19, backgroundColor: '#DFDFE2', borderRadius: 3}}
        editable={true}
        multiline={true}
        onChangeText={this.storeFeedback}/>
        <View style={{height: 10}}></View>
        <View style={{marginLeft: 30, marginRight: 30, marginTop: 5, marginBottom: 5, borderRadius: 5, alignItems: 'center', backgroundColor: '#55CFE0', paddingTop: 3, paddingBottom: 3, paddingLeft: 3, paddingRight: 3}}>
        <TouchableOpacity onPress={this.submit}><Text>Submit feedback</Text></TouchableOpacity>
        </View>
        <View style={{height: 20}}></View>
        <Image
            style={{height: 45, width: 80}}
            source={{ uri: 'https://user-images.githubusercontent.com/18129905/43050902-6fc94544-8dde-11e8-94fd-9bdfa1df6ead.png'}}
        />
        </View>
      </ScrollView>
    )
  }


}
