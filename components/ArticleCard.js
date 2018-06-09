import React from 'react'

import { View, StyleSheet, Text } from 'react-native'

class ArticleCardContent extends React.Component {
    render() {
        return (
            <View>
                {/* <small>{this.props.datetime}</small> */}
                {/* <small>by {this.props.author}</small> */}
                <Text>{this.props.content}</Text>
                {/* <small>Source: {this.props.source}</small> */}
            </View>
        );
    }
}

class ArticleCardTitle extends React.Component {
    render() {
        return (
            <h1>this.props.title</h1>
        );
    }
}

export default class ArticleCard extends React.Component {
    render() {
        return (
            <View>
                <ArticleCardTitle title={this.props.title} />
                <View>VIDEO</View>                
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