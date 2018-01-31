import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  Image,
  View,
  Button,
  RectangleButton,
  Alert
} from 'react-native';

export default class Home extends Component<{}>{
  //changeText makes use of the prop provided by this being in a navigation stack 
  //This allows us to navigate to another sheet within the stack
  //The stack is defined in router.js
  
  //When login button is pressed, navigate to 'log in' screen
  loginNav = () => {
    this.props.navigation.navigate('LogIn');
  };
  
  render() {
    console.disableYellowBox = true;
    return (
      <View>
       <Text style={styles.welcome}>
          Welcome to Demos!
        </Text>
        <Image
          style={{width: 375, height: 375}}
          source={{uri: 'https://user-images.githubusercontent.com/18129905/35187343-734d21b4-fdf0-11e7-8799-761570dea412.png'}}
        />
        <Button onPress={this.loginNav} title="Act Now"/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
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
});
