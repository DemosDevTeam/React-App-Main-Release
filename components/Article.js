import React from 'react'

import {View, Text} from 'react-native'

import VideoPlayer from './VideoPlayer' 

class Article extends React.Component {
    render() {
        const {
            title,
            date,
            author,
            content,
            source 
        } = this.props;

        return (
            <View>
                <Text>{title}</Text>
                <VideoPlayer />
                <View>
                    <Text>{date}</Text>
                    <Text>by {author}</Text>
                    <Text>{content}</Text>
                    <Text>Source: {source}</Text>
                </View>
            </View>
        );
    }
}

export default Article;