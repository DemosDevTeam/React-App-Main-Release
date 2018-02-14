import React, { Component } from 'react';
import ButtonComponent, { CircleButton, RoundButton, RectangleButton } from 'react-native-button-component';
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
      <View style = {styles.container}>
        <Image
          style={{width: 170, height: 170, paddingTop: 20}}
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
          onPress={this.loginNav}
          title="Act Now"
          />
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
  welcome2: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    paddingBottom: 80,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
