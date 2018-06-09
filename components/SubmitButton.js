import React from 'react'

import { View, StyleSheet, TouchableOpacity } from 'react-native'

export default class SubmitButton extends React.Component {
  render() {
    return (
      <View style={styles.buttonz}>
          <TouchableOpacity onPress={this.props.onSubmit}>
            <Text style={{fontSize: 16, textAlign: 'center'}}>Submit and Continue</Text>
          </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    buttonz: {
        height: 40,
        borderRadius: 4,
        width: 320,
        backgroundColor: '#49C7E3',
        alignItems: 'center',
        justifyContent: 'center',
    }
})