//For code ex. using firebase see https://github.com/davideast/firebase-react-native-sample/blob/master/index.ios.js
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  RectangleButton,
  Alert
} from 'react-native';

import Root from './router.js';
import Home from "./Screens/Home";
const firebase = require('firebase');

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAAERSrXStyHsU889OZGfrCFe1E2Bit_xs",
  authDomain: "demos-5e3db.firebaseapp.com",
  databaseURL: "https://demos-5e3db.firebaseio.com",
  storageBucket: "demos-5e3db.appspot.com",
};
var firebaseApp = firebase.initializeApp(firebaseConfig);

export default class App extends React.Component {
  render() {
    return (
        <Root/>
    );
  }
}
export {firebaseApp};
