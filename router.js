import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';

//For good example of how to use Navigator classes, see the following link:
//https://github.com/spencercarli/getting-started-react-navigation

import Home from "./Screens/Home"
import SignUp from "./Screens/SignUp"
import LogIn from "./Screens/LogIn"

export const Root = StackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      headerTitleStyle: { alignSelf: 'center' },
      title: 'Welcome!',
    },
  },
  SignUp: {
    screen: SignUp,
    navigationOptions: {
      title: 'Sign Up',
    },
  },
  LogIn: {
    screen: LogIn,
    navigationOptions: {
      title: 'Log In',
    },
  }
})