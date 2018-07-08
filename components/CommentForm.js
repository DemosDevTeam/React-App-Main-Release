import React from 'react'

import { View, Text, StyleSheet } from 'react-native'

class Ballot extends React.Component {

}

class ReactionSelect extends React.Component {

}

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

export default class CommentForm extends React.Component {
    constructor(props) {
        this.state = {
            reaction: undefined,
            vote: undefined,
            comment: undefined
        }
    }

    render() {
        const vote = false;

        return (
            <Form>
                <Text>Share your thoughts and ideas.</Text>
                <Line />
                { 
                    (!vote) 
                    ? <ReactionSelect 
                        onChange={(reaction) => this.setState({reaction}) } 
                      />
                    : <Ballot
                        onChange={(vote) => this.setState({ vote }) }
                      />
                    }
                }
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
                    onPress={this.props.onSubmit}
                />
            </Form>
        );
    }
}

const styles = StyleSheet.create({

});