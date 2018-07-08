import React from 'react'

import {View, Text } from 'react-native'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      hasError: false,
      error: undefined
    }
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true, error })

    // Log error to service
  }

  render() {
      if (this.state.hasError) {
        return <View><Text>Error: {this.state.error} </Text></View>
      }

      return this.props.children
  }
}

export default ErrorBoundary
