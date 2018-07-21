// Props
// Dumb component
// Does not fetch backend requests
// All data should be passed in
// Props
// Article
//

import React from 'react'
import { Dimensions, View, StyleSheet, TouchableOpacity, TouchableHighlight, Text, WebView, Image } from 'react-native'
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
        const { article, onPress } = this.props;

        const { title, content } = article;
        const videoSource = article.urlvideo;
        const imageSource = article.urlpic;

        const pinned = false

        const width = Dimensions.get('window').width

        return (
            <View style={styles.container}>
              <TouchableOpacity onPress={onPress}>
                  <Image
                      style={{height: 210, width, backgroundColor: 'powderBlue'}}
                      javaScriptEnabled={true}
                      source={{ uri: imageSource }}
                  />
                </TouchableOpacity>
                <View style={{height: 10}}/>
                <View style={{width: 100+"%", height: 35, flexDirection: "row"}}>
                    <View style={{width: 15}}/>
                    <TouchableHighlight>
                        <Ionicons name="ios-thumbs-up-outline" size={35} />
                    </TouchableHighlight>
                    <View style={{width: 17}}/>
                    <TouchableHighlight>
                        <Ionicons name="ios-thumbs-down-outline" size={35} />
                    </TouchableHighlight>
                    <View style={{width: 15}}/>
                    <View style={{position: 'absolute', right: 19}}>
                        <TouchableHighlight>
                            <Ionicons name="ios-bookmark-outline" size={35} />
                        </TouchableHighlight>
                        <View style={{width: 15}}/>
                    </View>
                </View>
                <View style={{height: 10}}/>
                <TouchableOpacity onPress={onPress}>
                    <Text style={{fontSize: 12}}>{title}</Text>
                </TouchableOpacity>
                <View style={{height: 13}}/>
            </View>
        );
    }
}
