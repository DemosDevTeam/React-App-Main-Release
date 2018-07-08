import React from 'react'

import { View, TouchableOpacity, StyleSheet } from 'react-native'

export default class SelectButton extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.buttonz2}>
            <TouchableOpacity onPress={() => this.props.onSelect(this.props.value)}>
            <Text style={{fontSize: 13, textAlign: 'center'}}>{this.props.children}</Text>
            </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonz2: {
        height: 29,
        borderRadius: 4,
        width: 320,
        marginTop: 3,
        marginBottom: 3,
        backgroundColor: '#c9c9c9',
        alignItems: 'center',
        justifyContent: 'center',
    }
})