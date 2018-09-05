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
        <TextInput
        placeholder='Put your feedback on the app here'
        editable={true}
        multiline={true}
        onChangeText={this.storeFeedback}/>
        <TouchableOpacity onPress={this.submit}><Text>Submit feedback</Text></TouchableOpacity>
      </ScrollView>
    )
  }


}
