import React from 'react'

import { View, Text, StyleSheet, Form, TextInput, TouchableHighlight, Button, Image, TouchableOpacity } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

class AnswerChoice extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      backgroundColor: '#DFDFE2'
    }
  }
  //function to pass information back up to ArticleScreen to handle logic of incrementing firebase count
  selectAnswer = () => {
    console.log("triggered touchable highlight mc question response");
    this.state.backgroundColor='#F05758';
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
        <View style={{marginTop: 4, marginBottom: 4, borderRadius: 5, alignItems: 'center', backgroundColor: this.state.backgroundColor}}>
          <Text style={{fontSize: 15}}>{answerString}</Text>
        </View>
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
        style={{marginLeft: 19, marginRight: 19, marginTop: 15, marginBottom: 15, backgroundColor: '#55CFE0', borderRadius: 3, fontSize: 15}}
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
            <View style={{alignItems: 'center'}}>
            <Image
                style={{height: 9, width: 330}}
                source={{ uri: 'https://user-images.githubusercontent.com/18129905/43182624-11b1b79c-8fb0-11e8-9e05-4a4696346581.png'}}
            />
            </View>
            <View style={{height: 10}}/>
              <Text style={{marginLeft: 19, marginRight: 19, fontSize: 15}}>{question}</Text>
              <TouchableOpacity style={{marginLeft: 19, marginRight: 19, marginTop: 10, marginBottom: 10, borderRadius: 4, padding: 7, activeTintColor: '#EE4C50', inactiveTintColor: '#EDEDED'}}>{answers}</TouchableOpacity>
            </View>
          )
        }

        for(question in article.frquestions) {
          console.log("question val in article.frquestions")
          console.log(question);
          const questionString = question.toString();
          frquestions.push(
            <View>
              <Text style={{fontSize: 15}}>{question}</Text>
              <Answer handleFRAnswer={this.props.handleFRAnswer} questionString={questionString}/>
            </View>
          )
        }

        return (
         <View>
            <View style={{height: 10}}/>
            <View style={{width: 100+"%", height: 35, flexDirection: "row"}}>
                <View style={{width: 15}}/>
                <TouchableHighlight onPress={this.props.Upvote}>
                    <Ionicons name="ios-thumbs-up-outline" color={'#F05758'} size={30} />
                </TouchableHighlight>
                <View style={{width: 17}}/>
                <TouchableHighlight onPress={this.props.Downvote}>
                    <Ionicons name="ios-thumbs-down-outline" color={'#51585E'} size={30} />
                </TouchableHighlight>
                <View style={{width: 15}}/>
                <View style={{position: 'absolute', right: 20}}>
                    <TouchableHighlight onPress={this.props.onPin}>
                        <Ionicons name="ios-bookmark-outline" color={'#49C7E3'} size={30} />
                    </TouchableHighlight>
                    <View style={{width: 15}}/>
                </View>
            </View>
            <View style={{width: 100+"%", height: 30, flexDirection: "row", backgroundColor: '#DFDFE2'}}>
            <View style={{width: 19}}/>
             <TouchableHighlight onPress={this.props.goBack}>
              <Ionicons name="ios-arrow-back" color={'#51585E'} size={30} />
             </TouchableHighlight>
            <View style={{textAlign: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 15, textAlign: 'center', paddingLeft: 22, paddingTop: 7}}>Main Feed</Text>
           </View>
           </View>
                <View style={{height: 10}}/>
                <Text style={{fontSize: 16, textAlign: 'center', fontWeight: 'bold'}}>Share your thoughts and ideas.</Text>
                <View style={{height: 10}}/>
                <Text style={{marginLeft: 19, fontSize: 15}}>General Comments:</Text>
                <View style={{height: 8}}/>
                <TextInput
                    placeholder='    Share your thoughts here'
                    style={{marginLeft: 19, marginRight: 19, backgroundColor: '#55CFE0', borderRadius: 3, fontSize: 15}}
                    value={this.state.comment}
                    editable={true}
                    multiline={true}
                    onChangeText={(comment) => this.props.onComment(comment)}
                />
                <View style={{height: 15}}/>
                <Text style={{fontSize: 15, textAlign: 'center', fontWeight: 'bold',}}>Please select one answer for each of the following questions.</Text>
                <View style={{height: 10}}/>
                <View>{mcquestions}</View>
                <View style={styles.space2}></View>
                <View>{frquestions}</View>
                <View style={{alignItems: 'center'}}>
                <Image
                    style={{height: 9, width: 330}}
                    source={{ uri: 'https://user-images.githubusercontent.com/18129905/43182624-11b1b79c-8fb0-11e8-9e05-4a4696346581.png'}}
                />
                </View>
                <View style={{height: 10}}/>
                <View style={{marginLeft: 30, marginRight: 30, marginTop: 5, marginBottom: 5, borderRadius: 5, alignItems: 'center', backgroundColor: '#55CFE0', paddingTop: 6, paddingBottom: 6}}>
                  <TouchableOpacity onPress={this.props.onSubmit}><Text style={{fontSize: 16}}>Submit Feedback</Text></TouchableOpacity>
                </View>
                <View style={{height: 10}}/>

                <View style={{alignItems: 'center'}}>
                <Image
                    style={{height: 45, width: 80}}
                    source={{ uri: 'https://user-images.githubusercontent.com/18129905/43050902-6fc94544-8dde-11e8-94fd-9bdfa1df6ead.png'}}
                />
                </View>
                <View style={{height: 10}}/>
            </View>
          /*
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
            */
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
