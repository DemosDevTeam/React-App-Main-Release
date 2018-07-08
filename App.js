//For code ex. using firebase see https://github.com/davideast/firebase-react-native-sample/blob/master/index.ios.js
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react';

import Router from './router.js';

import { ErrorBoundary } from './components/util'

export default class App extends React.Component {
  render() {
    return (
        <ErrorBoundary>
          <Router/>
        </ErrorBoundary>
    );
  }
}