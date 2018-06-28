import React, { Component } from 'react';
// import ButtonComponent, { CircleButton, RoundButton, RectangleButton } from 'react-native-button-component';
import {
  Platform,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  View,
  Button,
  Alert, 
  ImageBackground,
} from 'react-native';

import { ColorButton } from '../components'

export default class Home extends Component {
  //changeText makes use of the prop provided by this being in a navigation stack
  //This allows us to navigate to another sheet within the stack
  //The stack is defined in router.js

  //When login button is pressed, navigate to 'log in' screen
  loginNav = () => {
    const { navigation } = this.props; 

    navigation.navigate('LogIn');
  };

  render() {
    console.disableYellowBox = true;
    // console.log("Successfully reached the home.js render function");
    return (
      <ImageBackground source={{uri: 'https://user-images.githubusercontent.com/18129905/37871334-c108bd32-2fb9-11e8-9d65-a5692497386b.png'}}
      style={styles.backgroundImage}>
          <Image
            style={{width: 170, height: 170}}
            source={{uri: 'https://user-images.githubusercontent.com/18129905/35187343-734d21b4-fdf0-11e7-8799-761570dea412.png'}}
          />
          <Image
            style={{width: 200, height: 120}}
            source={{uri: 'https://user-images.githubusercontent.com/18129905/35842080-0e87b16e-0ace-11e8-9fc0-151043ca61fe.png'}}
          />
          <Text style={styles.welcome2}>
          Your voice, your local government.
          </Text>
          <Button 
            title="Act Now"
            color="#49c7e3" 
            onPress={this.loginNav}
          />
      </ImageBackground>
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
    paddingBottom: 90,
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
