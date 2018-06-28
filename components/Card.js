/**
 * Card Component
 * Molecule
 */

import React from 'react'

import {View} from 'react-native'

export default class Card extends React.Component {
    render() {
        return (
            <View>
                {/* Header */}
                <View>
                </View>
                {/* Body */}
                <View>
                    {this.props.children}
                </View>
                {/* Footer */}
                <View>
                </View>
            </View>
        );
    }
} 