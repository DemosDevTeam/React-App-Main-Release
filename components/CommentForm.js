import React from 'react'

import { View, Text, StyleSheet, Form, TextInput, TouchableHighlight, Button, TouchableOpacity } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

class AnswerChoice extends React.Component {
  /*constructor(props) {
    super(props);
  }*/
  //function to pass information back up to ArticleScreen to handle logic of incrementing firebase count
  selectAnswer = () => {
    const answerString = this.props.answerString;
    const questionString = this.props.questionString;
    console.log("value of question inside of AnswerChoice.selectAnswer is " + questionString);
    this.props.handleMCAnswer(questionString, answerString);
  }

  render() {
    const answerString = this.props.answerString;
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
  /*constructor(props) {
    super(props);
  }*/

  writeAnswer = (answer) => {
    const questionString = this.props.questionString;
    console.log("value of answer inside of Answer component is " + answer);
    console.log("value of question inside of Answer component is " + questionString);
    this.props.handleFRAnswer(questionString, answer);
  }

  render () {
    return (
      <View>
        <TextInput onChangeText={this.writeAnswer}/>
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

        for(question in article.mcquestions){
          console.log("question val in article.mcquestions");
          console.log(question);
          let answers = [];
          const questionString = question.toString();
          for(answer in article.mcquestions[question]){
            const answerString = answer.toString();
            //create answerChoice component that holds reference to question and answerchoice
            answers.push(<AnswerChoice
               questionString={questionString}
               handleMCAnswer={this.props.handleMCAnswer}
               answerString={answerString}/>)
          }

          mcquestions.push(
            <View>
              <Text>{question}</Text>
              <View>{answers}</View>
            </View>
          )
        }

        for(question in article.frquestions) {
          console.log("question val in article.frquestions")
          console.log(question);
          const questionString = question.toString();
          frquestions.push(
            <View>
              <Text>{question}</Text>
              <Answer handleFRAnswer={this.props.handleFRAnswer} questionString={questionString}/>
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
                    onChangeText={(comment) => this.props.onComment(comment)}
                />
                <View>{mcquestions}</View>
                <View style={styles.space2}></View>
                <View style={styles.space2}></View>
                <View>{frquestions}</View>
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
