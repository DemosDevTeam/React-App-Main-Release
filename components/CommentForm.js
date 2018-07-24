import React from 'react'

import { View, Text, StyleSheet, Form, TextInput, TouchableHighlight, Button, TouchableOpacity } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

class AnswerChoice extends React.Component {
  /*constructor(props) {
    super(props);
  }*/
  //function to pass information back up to ArticleScreen to handle logic of incrementing firebase count
  selectAnswer = () => {
    console.log("triggered touchable highlight mc question response");
    const answerString = this.props.answerString;
    const questionString = this.props.questionString;
    console.log("value of question inside of AnswerChoice.selectAnswer is " + questionString);
    this.props.handleMCAnswer(questionString, answerString);
  }

  render() {
    const answerString = this.props.answerString;
    return (
      <View>
        <TouchableHighlight onPress={this.selectAnswer}>
          <Text>{answerString}</Text>
        </TouchableHighlight>
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
        <TextInput
        placeholder='    Put your response here'
        style={{marginLeft: 19, marginRight: 19, backgroundColor: '#55CFE0', borderRadius: 3}}
        editable={true}
        multiline={true}
        onChangeText={this.writeAnswer}/>
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
        console.disableYellowBox = true;
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
              <Text style={{marginLeft: 19, marginRight: 19}}>{question}</Text>
              <TouchableOpacity style={{marginLeft: 19, marginRight: 19, marginTop: 15, marginBottom: 15, borderRadius: 4, padding: 7, activeTintColor: '#EE4C50', inactiveTintColor: '#EDEDED'}}>{answers}</TouchableOpacity>
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
<View style={{height: 13}}/>
                <Text style={{fontSize: 16, textAlign: 'center', fontWeight: 'bold',}}>Share your thoughts and ideas.</Text>
                <View style={{height: 10}}/>
                <Text style={{marginLeft: 19}}>General Comments:</Text>
                <View style={{height: 8}}/>
                <TextInput
                    placeholder='    Share your thoughts here'
                    style={{marginLeft: 19, marginRight: 19, backgroundColor: '#55CFE0', borderRadius: 3}}
                    value={this.state.comment}
                    editable={true}
                    multiline={true}
                    onChangeText={(comment) => this.props.onComment(comment)}
                />
                <View style={{height: 10}}/>
                <View>{mcquestions}</View>
                <View style={styles.space2}></View>
                <View style={styles.space2}></View>
                <View>{frquestions}</View>
                <View style={{width: 100+"%", height: 35, flexDirection: "row"}}>
                    <View style={{width: 15}}/>
                    <TouchableHighlight onPress={this.props.Upvote}>
                        <Ionicons name="ios-thumbs-up-outline" size={30} />
                    </TouchableHighlight>
                    <View style={{width: 17}}/>
                    <TouchableHighlight onPress={this.props.Downvote}>
                        <Ionicons name="ios-thumbs-down-outline" size={30} />
                    </TouchableHighlight>
                    <View style={{width: 15}}/>
                    <View style={{position: 'absolute', right: 20}}>
                        <TouchableHighlight onPress={this.props.onPin}>
                            <Ionicons name="ios-bookmark-outline" size={30} />
                        </TouchableHighlight>
                        <View style={{width: 15}}/>
                    </View>
                </View>
                <Button
                    title="Submit Feedback"
                    onPress={this.props.onSubmit}
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

/*                <Button
                  title="Pin Post"
                  onPress={this.props.onPin}
                />*/

  /*              <Button
                  title="Up Vote"
                  onPress={this.props.Upvote}
                />
                <Button
                  title="Down Vote"
                  onPress={this.props.Downvote}
                />*/
export default CommentForm;
