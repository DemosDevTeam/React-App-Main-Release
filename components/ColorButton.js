import React from 'react'

import { View, TouchableOpacity, StyleSheet, Text } from 'react-native'

export default class ColorButton extends React.Component {
  render() {
    return (
        <TouchableOpacity onPress={this.props.onPress} style={[styles.buttonz2, {backgroundColor: this.props.color}, this.props.style]}>
                <Text style={{fontSize: 13, textAlign: 'center'}}>{this.props.children}</Text>
        </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
   buttonz2: {
        height: 40,
        borderRadius: 4,
        width: 320,
        marginTop: 3,
        marginBottom: 3,
        backgroundColor: '#c9c9c9',
        alignItems: 'center',
        justifyContent: 'center',
    }
})