// Props
// Dumb component
// Does not fetch backend requests
// All data should be passed in
// Props
// Article
// 

import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
// import Youtube from 'react-native-youtube'

import { VideoPlayer } from './'

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default class FeedItem extends React.Component {
    // TODO: Prop types have changed in React recently
    // Not necessary but better to have strict type encorcement
    // Keeping for docs
    /*
    static propTypes = {
        title: React.PropTypes.string.isRequired,
        videoId: React.PropTypes.string.isRequired,
        pinned: React.PropTypes.boolean.optional,
        excerpt: React.PropTypes.string.optional,
        tags: React,Propt
    }
    */

    navigateToVideoDetail = () => {
        // this.props.navigation.navigate()
    }
    
    render() {
        // TODO: Change source
        const { title, videoId, pinned, excerpt, tags } = this.props;

        return (
            <View>
                <VideoPlayer uri={videoId} />
                
                {/*}
                <TouchableOpacity onPress={this.navigateToVideoDetail}>
                    <View>
                        <Text>{title}</Text>
                        <Text>{excerpt}</Text>
                    </View>
                </TouchableOpacity>
                */}
            </View>
        );
    }
}
