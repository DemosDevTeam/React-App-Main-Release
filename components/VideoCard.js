import React from 'react'

import { View, StyleSheet, Text } from 'react-native'

import { VideoPlayer } from './'

export default class ArticleCard extends React.Component {
    render() {
        return (
            <View>
                <ArticleCardTitle title={this.props.title} />
                <ArticleCardContent 
                    datetime={this.props.datetime} 
                    author={this.props.author} 
                    source={this.props.source || "unknown"}
                    content={this.props.content || ""}    
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({

});