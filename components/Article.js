import React from 'react'

import {View, Text} from 'react-native'

import VideoPlayer from './VideoPlayer' 

class Article extends React.Component {
    render() {
        const { article } = this.props;

        return (
            <View>
                <Text style={{fontSize: 15}}>{JSON.stringify(article)}</Text>
                {/* 
                <Text>{title}</Text>
                <View>
                    <Text>{date}</Text>
                    <Text>by {author}</Text>
                    <Text>{content}</Text>
                    <Text>Source: {source}</Text>
                </View>
                */}
            </View>
        );
    }
}

export default Article;
