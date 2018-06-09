import React from 'react'

import { View, Text, StyleSheet } from 'react-native'

class Line extends React.Component {
    render() {
        return (
            <View
                style={{
                    borderBottomColor: 'black',
                    borderBottomColor: 1,
                    width: '100%'
                }}
            />
        );
    }
}

export default class CommentCard extends React.Component {
    constructor(props) {
        this.state = {
            reaction: "happy",
            comment: ""
        }
    }

    render() {
        return (
            <View>
                <Text>Share your thoughts and ideas.</Text>
                <Line />
                <View>
                    <Text>Reaction:</Text>
                    {/* Use a horizontal select */}
                    <Button>:)</Button>
                    <Button>:O</Button>
                    <Button>:(</Button>
                    <Button>;(</Button>
                </View>
                <Text>Comments:</Text>
                <TextInput 
                    value={this.state.comment}
                    editable={true}
                    multiline={true}
                    onChangeText={(comment) => this.setState({ comment })}
                />
                <Button 
                    color="blue"
                    title="Share"
                    onPress={this.props.onPress}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({

});