import React from 'react'

import { View, Text, StyleSheet, Form, TextInput, TouchableHighlight, Button, TouchableOpacity } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

class AnswerChoice extends React.Component {
  constructor(props) {
    super(props);
  }
  //function to pass information back up to ArticleScreen to handle logic of incrementing firebase count
  selectAnswer = () => {
    const answerString = this.props.answerString;
    const questionString = this.props.question
    this.props.handleMCAnswer(question, answerString);
  }

  render() {
    const answerString = this.props.answerString;
    console.log("answerString within AnswerChoice is");
    console.log(answerString);
    return (
      <View>
        <TouchableOpacity onPress={this.selectAnswer}>
          <Text>{answerString}</Text>
        </TouchableOpacity>
      </View>
      )
    }
}

class Answer extends React.Component {
  constructor(props) {
    super(props);
  }

  writeAnswer = () => {

  }

  render () {
    return (
      <View>
        <TextInput onChangeText={this.writeAnswer}
      </View>
    )
  }


}

class CommentForm extends React.Component {
    constructor(props) {
      super(props);
        this.state = {
            reaction: undefined,
            vote: undefined,
            comment: undefined,
        }
      }

    componentDidMount = () => {

    }

    render() {
        const article = this.props.article;
        let mcquestions = [];//will be array of arrays where 0th index is question, all others are answer choices
        let frquestions = [];
        console.log(article.mcquestions);
        console.log(article.frquestions);

        for(question in article.mcquestions){
          let answers = [];
          for(answer in article.mcquestions[question]){
            const answerString = answer.toString();
            //create answerChoice component that holds reference to question and answerchoice
            answers.push(<AnswerChoice question={question} handleMCAnswer={this.props.handleMCAnswer} answerString={answerString}/>)
          }

          mcquestions.push(
            <View>
              <Text>{question}</Text>
              <View>{answers}</View>
            </View>
          )
        }

        for(question in article.frquestions) {
          frquestions.push(
            <View>
              <Text>{question}</Text>
              <TextInput/>
            </View>
          )
        }

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
                    title="Submit Feedback"
                    onPress={this.props.onSubmit}
                />
                <Button
                  title="Pin Post"
                  onPress={this.props.onPin}
                />
                <View>{mcquestions}</View>
                <View style={styles.space2}></View>
                <View style={styles.space2}></View>
                <View>{frquestions}</View>
            </View>
        );
    }
  }

const styles = StyleSheet.create({
  space2 : {
    height: 5,
  }
});
export default CommentForm;
