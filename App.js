//For code ex. using firebase see https://github.com/davideast/firebase-react-native-sample/blob/master/index.ios.js
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  RectangleButton,
  Alert
} from 'react-native';

import {Root} from './router.js';
import Home from "./Screens/Home";
const firebase = require('firebase');

// Initialize Firebase
const firebaseConfig = {
  apiKey: "<your-api-key>",
  authDomain: "<your-auth-domain>",
  databaseURL: "<your-database-url>",
  storageBucket: "<your-storage-bucket>",,
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

export default class App extends Component<{}> {
  render() {
    return (
        <Root/>
    );
  }
}
