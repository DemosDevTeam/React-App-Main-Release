import React from 'react'

import {View, ActivityIndicator, Text} from 'react-native'

const Loading = ({message = 'Loading'}) => (
    <View>
        <ActivityIndicator />
        <Text>{message}</Text>
    </View>
)

export default Loading