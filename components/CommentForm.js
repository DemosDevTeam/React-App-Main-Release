import React from 'react'

import { View, Text, StyleSheet, Form, TextInput, Button } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
class CommentForm extends React.Component {
    constructor(props) {
      super(props);
        this.state = {
            reaction: undefined,
            vote: undefined,
            comment: undefined
        }
    }

    render() {
        const vote = false;

        return (
            <View>
                <Text>Share your thoughts and ideas.</Text>
                <Text>General Comments:</Text>
                <TextInput
                    value={this.state.comment}
                    editable={true}
                    multiline={true}
                    onChangeText={(comment) => this.props.onComment({ comment })}
                />
                <Button
                  title="Up Vote"
                  onPress={this.props.Upvote}
                />
                <Button
                  title="Down Vote"
                  onPress={this.props.Downvote}
                />
                <Button
                    color="blue"
                    title="Share"
                    onPress={this.props.onSubmit}
                />
                <Button
                  title="Pin Post"
                  onPress={this.props.onPin}
                />
            </View>
        );
    }
  }

const styles = StyleSheet.create({

});
export default CommentForm;
