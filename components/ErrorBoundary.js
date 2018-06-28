import React from 'react'

import { Text } from 'react-native'

export default function catchComponent(WrappedComponent) {
  return class extends React.Component {
    constructor(props) {
      super(props);

      // Move to static state
      this.state = { hasError: false };
    }
  
    componentDidCatch(error, info) {
      // Display fallback UI
      this.setState({ hasError: true });

      console.error(error, info);
      // You can also log the error to an error reporting service
      // logErrorToMyService(error, info);
    }
  
    render() {
      if (this.state.hasError) {
        // You can render any custom fallback UI
        return <Text>Something went wrong.</Text>;
      }
      return <WrappedComponent {...this.props} />;
    }
  };
}