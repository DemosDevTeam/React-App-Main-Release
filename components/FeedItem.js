// Props
// Dumb component
// Does not fetch backend requests
// All data should be passed in
// Props
// Article
// 

import React from 'react'
import { Dimensions, View, StyleSheet, TouchableOpacity, TouchableHighlight, Text, WebView } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
// import Youtube from 'react-native-youtube'

import { VideoPlayer } from './'

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    title: {

    },
    excerpt: {

    }
})

export default class FeedItem extends React.Component {
    // TODO: Prop types have changed in React recently
    // Not necessary but better to have strict type encorcement
    // Keeping for docs
    /*
    static propTypes = {
        title: React.PropTypes.string.isRequired,
        videoUri: React.PropTypes.string.isRequired,
        pinned: React.PropTypes.boolean.optional,
        excerpt: React.PropTypes.string.optional,
        tags: React,Propt
    }
    */
    
    render() {
        // TODO: Change source
        const { article, onPress } = this.props

        const { title, content } = article
        const videoSource = article.urlvideo

        const pinned = false

        const width = Dimensions.get('window').width

        return (
            <View style={styles.container}>
                <WebView
                    style={{height: 210, width, backgroundColor: 'powderBlue'}}
                    javaScriptEnabled={true}
                    source={{ uri: videoSource }}
                />
                <TouchableOpacity onPress={onPress}>
                    <Text>{JSON.stringify(article)}</Text>
                    <Text style={styles.title}>{title}</Text>
                </TouchableOpacity>
                <TouchableHighlight>
                    <Ionicons name="ios-star-outline" size={25} />
                </TouchableHighlight>
            </View>
        );
    }
}
