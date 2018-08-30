import React, { Component } from 'react';
// import ButtonComponent, { CircleButton, RoundButton, RectangleButton } from 'react-native-button-component';
import {
  Platform,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Text,
  Image,
  View,
  Button,
  Alert, 
  ImageBackground,
} from 'react-native';

export default class Home extends Component {
  //changeText makes use of the prop provided by this being in a navigation stack
  //This allows us to navigate to another sheet within the stack
  //The stack is defined in router.js

  render() {
    const { navigation } = this.props; 

    console.disableYellowBox = true;
    
    /**
    return (
      <ImageBackground
        source={{uri: 'https://user-images.githubusercontent.com/18129905/37871334-c108bd32-2fb9-11e8-9d65-a5692497386b.png'}}
        style={styles.backgroundImage}
      >
          <Image
            style={{width: 170, height: 170}}
            source={{uri: 'https://user-images.githubusercontent.com/18129905/35187343-734d21b4-fdf0-11e7-8799-761570dea412.png'}}
          />
          <Image
            style={{width: 200, height: 120}}
            source={{uri: 'https://user-images.githubusercontent.com/18129905/43050902-6fc94544-8dde-11e8-94fd-9bdfa1df6ead.png'}}
          />
          <Text style={styles.welcome2}>
          Your voice, your local government.
          </Text>
          <Button
            title="Act Now"
            color="#49c7e3"
            onPress={() => navigation.navigate('LogIn')}
          />
      </ImageBackground>
    );
    **/
    return (
      <ScrollView>
      <View style={{alignItems: 'center'}}>
          <Image
            style={{width: 200, height: 200, marginTop: 75, marginBottom: 40 }}
            source={{uri: 'https://user-images.githubusercontent.com/18129905/35187343-734d21b4-fdf0-11e7-8799-761570dea412.png'}}
          />
          <Image
            style={{width: 200, height: 120}}
            source={{uri: 'https://user-images.githubusercontent.com/18129905/43050902-6fc94544-8dde-11e8-94fd-9bdfa1df6ead.png'}}
          />
          <Text style={styles.welcome2}>
          Your voice, your local government.
          </Text>

          <View style={{marginLeft: 30, marginRight: 30, marginTop: 5, marginBottom: 5, borderRadius: 5, alignItems: 'center', backgroundColor: '#55CFE0', paddingTop: 6, paddingBottom: 6, paddingRight: 100, paddingLeft: 100}}>
          <TouchableOpacity onPress={() => navigation.navigate('LogIn')}><Text style={{fontSize: 17}}>Act Now</Text></TouchableOpacity>
          </View>

          </View>
        </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF',
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    width: null,
    height: null,
    // Invalid property type
    // resizeMode: 'cover'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  welcome2: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    paddingTop: -20,
    paddingBottom: 70,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  submitButton: {
    backgroundColor: '#49C7E3',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 0.5
  }
});
