import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import Youtube from 'react-native-youtube'

/**
 * Takes in a video, card_title, summary,
 */
export default class FeedCard extends React.Component {
    render() {
        // const tags = this.props.tags.map(tag => <)

        return (
            <View style={styles.container}>
                <Youtube 
                    videoId={this.props.videoId}
                />
                <View>
                    <Text style={styles.cardTitle}>{this.props.title}</Text>
                    <Text style={styles.summary}>{this.props.summary}</Text>
                    <View>
                        <Button>Read More...</Button>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    cardTitle: {

    }
})