import React from 'react'
import { View, StyleSheet, Text, AsyncStorage, ScrollView, TouchableOpacity, Image } from 'react-native'
import { to } from '../components/util'
import FeedbackFeedItem from '../components/FeedbackFeedItem'
import firebaseApp from '../firebaseApp'


export default class changeUpdatePreferencesScreen extends React.Component {
  state = {
    preferences: [],
  }

  constructor(props) {
    super(props);
  }

  submit = async () => {
    const user = await AsyncStorage.getItem('user');
    const database = firebaseApp.database();

    if(this.state.preferences.length == 0) {
      Alert.alert("Please make sure you have selected at least one update preference before submitting");
    } else {
      await database.ref('/Users/' + user + '/update preferences/').remove();
      for(let i=0; i<this.state.preferences.length; i++){
        console.log("value of preference");
        console.log(this.state.preferences[i]);
        await database.ref('/Users/' + user + '/update preferences/').child(this.state.preferences[i]).set("");
      }

      this.props.navigation.navigate('Settings');
    }
  }

  handleSelection = (text) => {
    console.log(text);
    this.state.preferences.push(text);
    console.log("this.state.preferences");
    console.log(this.state.preferences);
  }

  render() {

    return (
      <ScrollView>
       <View style={styles.container}>
       <Image
         style={{width: 100, height: 100, marginTop: 40, marginBottom: 20}}
         source={{uri: 'https://user-images.githubusercontent.com/18129905/35187343-734d21b4-fdf0-11e7-8799-761570dea412.png'}}
       />
         <Text>How would you like to recieve updates?</Text>
         <Text>(Choose as many as you would like)</Text>
       </View>
       <View style={styles.space}></View>
         <View style={styles.container}>
         <View style={styles.buttonz2}>
           <TouchableOpacity onPress={() => this.handleSelection("text")}>
             <Text style={{fontSize: 13, textAlign: 'center'}}>Text me!</Text>
           </TouchableOpacity>
         </View>
         </View>


         <View style={styles.container}>
         <View style={styles.buttonz2}>
           <TouchableOpacity onPress={() => this.handleSelection("email")}>
             <Text style={{fontSize: 13, textAlign: 'center'}}>Email me</Text>
           </TouchableOpacity>
         </View>
         </View>

         <View style={styles.container}>
         <View style={styles.buttonz2}>
           <TouchableOpacity onPress={() => this.handleSelection("push notification")}>
             <Text style={{fontSize: 13, textAlign: 'center'}}>Send me push notifications</Text>
           </TouchableOpacity>
         </View>
         </View>

         <View style={styles.container}>
         <View style={styles.buttonz2}>
           <TouchableOpacity onPress={() => this.handleSelection("check app")}>
             <Text style={{fontSize: 13, textAlign: 'center'}}>I will just check the app</Text>
           </TouchableOpacity>
         </View>
         </View>
         <View style={styles.space}></View>
         <View style={styles.space}></View>
         <View style={styles.container}>
         <View style={styles.buttonz}>
           <TouchableOpacity onPress={this.submit}>
             <Text style={{fontSize: 16, textAlign: 'center'}}>Submit and Continue</Text>
           </TouchableOpacity>
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
    marginTop: 10,
  },
  space: {
    height: 2,
  },
  bspace: {
    height: 0,
  },
  space2: {
    height: 20,
  },
  userInputs: {
    marginTop: 15,
    marginBottom: 15,
  },
  buttonz: {
    height: 40,
    borderRadius: 4,
    width: 320,
    backgroundColor: '#49C7E3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonz2: {
    height: 29,
    borderRadius: 4,
    width: 320,
    marginTop: 3,
    marginBottom: 3,
    backgroundColor: '#c9c9c9',
    alignItems: 'center',
    justifyContent: 'center',
}
});
