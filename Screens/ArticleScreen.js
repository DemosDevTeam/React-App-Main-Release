import React from 'react'

import { Dimensions, StyleSheet, View, Text, ScrollView, ActivityIndicator, AsyncStorage, WebView, Alert } from 'react-native'

import Article  from '../components/Article'

import CommentForm from '../components/CommentForm'

import firebaseApp from '../firebaseApp'

class ArticleScreen extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      'article': '',
      loading: true,
      'comment': '',
    }
  }

  componentDidMount = () => {
    const { navigation } = this.props

    const article = navigation.getParam('article', undefined);
    const articleId = navigation.getParam('articleId', undefined);

    //console.log(article, articleId)
    this.setState({ "article" : article })
    this.setState({"loading" : false})
  }

  upvote = async () => {
    const user = await AsyncStorage.getItem('user');
    let articleId = this.state.article.id;
    let city = this.state.article.city;
    let database = firebaseApp.database();

    //Check if this video has any positive reactions; if not, make node, else increment node
    await database.ref('/Users/' + user + '/Reactions/').once("value").then(async (snap) => {
      if(snap.hasChild(articleId)){
        if(snap.child(articleId).hasChild("reaction")){
          //need to update the reaction val in firebase for this user, and update this val for the video in firebase
          let currentReaction = "";
          let reactionChanged = false;
          await database.ref('/Users/' + user + '/Reactions/' + articleId + '/reaction/').once("value").then((snap) => {
            currentReaction = snap.val();
            if(currentReaction != "positive"){
              reactionChanged = true;
            }
            database.ref('/Users/' + user + '/Reactions/' + articleId + '/reaction/').set("positive");
          })

          if(reactionChanged){
            console.log("inside of reaction changed if statement");
            await database.ref('/videos/' + city + '/' + articleId + '/').once('value').then((snap) => {
              let currentNegativeReviews = snap.child("Negative Reactions").val();
              console.log("current neg reviews: " + currentNegativeReviews);
              currentNegativeReviews = currentNegativeReviews - 1;
              console.log("new neg reviews: " + currentNegativeReviews);


              database.ref('/videos/' + city + '/' + articleId + '/Negative Reactions/').set(currentNegativeReviews);

              if(snap.hasChild("Positive Reactions")){

                let currentPositiveReviews = snap.child("Positive Reactions").val();
                currentPositiveReviews = currentPositiveReviews + 1;

                database.ref('/videos/' + city + '/' + articleId + '/Positive Reactions/').set(currentPositiveReviews);
              }else{
                database.ref('/videos/' + city + '/' + articleId + '/Positive Reactions/').set(1);
              }
            })

          } else {
            await database.ref('/videos/' + city + '/' + articleId + '/').once("value").then((snap) => {
              //If there is no change to the reaction, but no reaction was recorded previously, we should create positive reactions node and set to one in video
              if(!snap.hasChild('Positive Reactions')){
                database.ref('/videos/' + city + '/' + articleId + '/Positive Reactions/').set(1);
              }
            })
          }

        } else {
          //Need to create value for reaction under user in firebase
          await database.ref('/Users/' + user + '/Reactions/' + articleId + '/reaction/').set("positive");
          //Need to update value for reaction under video in firebase
          await database.ref('/videos/' + city + '/' + articleId + '/Positive Reactions/').once('value').then((snap) => {
            let currentPositiveReviews = snap.val();
            currentPositiveReviews = currentPositiveReviews + 1;
            database.ref('/videos/' + city + '/' + articleId + '/Positive Reactions/').set(currentPositiveReviews);
          })
        }
      } else {
        //Need to increment count for this video of positive reactions and set user reaction to "positive"
        database.ref('/Users/' + user + '/Reactions/' + articleId + '/reaction/').set("positive");
        await database.ref('/videos/' + city + '/' + articleId + '/Positive Reactions/').once('value').then((snap) => {
          let currentPositiveReviews = snap.val();
          currentPositiveReviews = currentPositiveReviews+1;
          database.ref('/videos/' + city + '/' + articleId + '/Positive Reactions/').set(currentPositiveReviews);
        })
      }
    })
  }

  downvote = async () => {
    const user = await AsyncStorage.getItem('user');
    let articleId = this.state.article.id;
    let city = this.state.article.city;
    let database = firebaseApp.database();

    //Check if this video has any negative reaction; if not, make node, else increment node
    //Check if user has reactions for this video; then check if that reaction was postive or negative and decrament/increment appropriately
    await database.ref('/Users/' + user + '/Reactions/').once('value').then(async (snap) => {
      if(snap.hasChild(articleId)){
        if(snap.child(articleId).hasChild("reaction")){
          //need to update the reaction val in firebase for this user, and update this val for the video in firebase
          let currentReaction = "";
          let reactionChanged = false;
          await database.ref('/Users/' + user + '/Reactions/' + articleId + '/reaction/').once('value').then((snap) => {
            currentReaction = snap.val();
            if(currentReaction != "negative"){
              reactionChanged = true;
            }
            database.ref('/Users/' + user + '/Reactions/' + articleId + '/reaction/').set("negative");
          })

          if(reactionChanged){
            console.log("inside of reaction changed if statement");
            database.ref('/videos/' + city + '/' + articleId + '/').once('value').then((snap) => {
              let currentPositiveReviews = snap.child("Positive Reactions").val();
              currentPositiveReviews = currentPositiveReviews - 1;

              //increment count for negative Feedback
              database.ref('/videos/' + city + '/' + articleId + '/Positive Reactions/').set(currentPositiveReviews);
              if(snap.hasChild("Negative Reactions")){

                let currentNegativeReviews = snap.child("Negative Reactions").val();
                currentNegativeReviews = currentNegativeReviews + 1;
                database.ref('/videos/' + city + '/' + articleId + '/Negative Reactions/').set(currentNegativeReviews);

              } else {
                database.ref('/videos/' + city + '/' + articleId + '/Negative Reactions/').set(1);
              }
            })
          } else {
            database.ref('/videos/' + city + '/' + articleId + '/').once("value").then((snap) => {
              //If there is no change to the reaction, but no reaction was recorded previously, create neg reactions node and set to one in video
              if(!snap.hasChild("Negative Reactions")){
                database.ref('/videos/' + city + '/' + articleId + '/Negative Reactions/').set(1);
              }
            })
          }

        } else {
          //Need to create value for reaction under user in firebase
          database.ref('/Users/' + user + '/Reactions/' + articleId + '/reaction/').set("negative");
          //Need to update value for reaction under video in firebase
          await database.ref('/videos/' + city + '/' + articleId + '/Negative Reactions/').once('vale').then((snap) => {
            let currentNegativeReviews = snap.val();
            currentNegativeReviews = currentNegativeReviews + 1;
            database.ref('/videos/' + city + '/' + articleId + '/Negaitve Reactions/').set(currentNegativeReviews);
          })
        }
      }
    })
  }

  pin = async () => {
    const user = await AsyncStorage.getItem('user');
    let articleId = this.state.article.id;
    let city = this.state.article.city;
    let database = firebaseApp.database();

    database.ref('/Users/' + user + '/Pinned/' + articleId + '/').set(city);

  }

  onComment = (comment) => {
    this.setState({"comment": comment})
  }

  submitFunction = async () => {
    const user = await AsyncStorage.getItem('user');
    const article = await this.state.article;
    const mcQuestionsJson = article.mcquestions;
    const frQuestionsJson = article.frquestions;
    const database = firebaseApp.database();

    let hasMCQuestions = true;
    //check if there are mc questions
    if(mcQuestionsJson == null){
      hasMCQuestions = false;
    }

    let hasFRQuestions = true;
    //check if there are fr questions
    if(frQuestionsJson == null){
      hasFRQuestions = false;
    }

    if(!hasMCQuestions && !hasFRQuestions){
      //call function for writing comment to db
      await this.writeCommentToDB();
      this.props.navigation.navigate('MainFeed');
    } else if (hasMCQuestions && hasFRQuestions){
      //check if user has answered all questions
      let answeredMC = true;
      for(question in mcQuestionsJson) {
        if(!this.state.hasOwnProperty(question.toString())){
          console.log("didn't answer the following");
          console.log(question.toString());
          answeredMC = false;
        }
      }

      let answeredFR = true;
      for(question in frQuestionsJson){
        if(!this.state.hasOwnProperty(question.toString())){
          console.log("didn't answer the following");
          console.log(question.toString());
          answeredFR = false;
        }
      }

      if(answeredFR && answeredMC){
        //call functions for writing fr and mc questions to db
        await this.writeFRToDB();
        await this.writeMCToDB();
        //call function for writing commment to db
        await this.writeCommentToDB();
        //nav back to main feed
        this.pops.navigation.navigate('MainFeed');
      } else {
        Alert.alert("please ensure that you've answered all questions before submitting!");
      }

    } else if (hasMCQuestions){

      let answeredMC = true;
      for(question in mcQuestionsJson) {
        if(!this.state.hasOwnProperty(question.toString())){
          console.log("didn't answer the following");
          console.log(question.toString());
          answeredMC = false;
        }
      }
      if(answeredMC){
        //call function for writing mc questions to db
        await this.writeMCToDB();
        //call function for writing comment to db
        await this.writeCommentToDB();
        this.props.navigation.navigate('MainFeed');
      } else {
        Alert.alert("please ensure that you've answered all questions before submitting!");
      }

    } else {

      let answeredFR = true;
      for(question in frQuestionsJson){
        if(!this.state.hasOwnProperty(question.toString())){
          console.log("didn't answer the following");
          console.log(question.toString());
          answeredFR = false;
        }
      }

      if(answeredFR){
        //call function for writing fr questions to db
        await this.writeFRToDB();
        //call function for writing comment to db
        await this.writeCommentToDB();
        this.props.navigation.navigate('MainFeed');
      } else {
        Alert.alert("please ensure that you've answered all questions before submitting!");
      }
    }

    /*
    //check if all mc questions have been answered
    let answeredMC = true;
    for(question in mcQuestionsJson) {
      if(!this.state.hasOwnProperty(question.toString())){
        console.log("didn't answer the following");
        console.log(question.toString());
        answeredMC = false;
      }
    }

    //check if all fr questions have been answered
    let answeredFR = true;
    for(question in frQuestionsJson){
      if(!this.state.hasOwnProperty(question.toString())){
        console.log("didn't answer the following");
        console.log(question.toString());
        answeredFR = false;
      }
    }

    let hasAnswered;
    //if all questions have not been answered then send alert and exit function
    if(!answeredFR || !answeredMC){
      Alert.alert("Please make sure you have answered all questions and submit again!");
    } else {
      //update answers for user and apply to video

      //check if user has responed to this videos questions before
      hasAnswered = await database.ref('/Users/' + user + '/').once('value').then(snap => {
        //check if user has Reactions node
        if(snap.hasChild("Reactions")){
          //check if user has this article in reactions
          if(snap.child("Reactions").hasChild(article.id)){
            //check if user has answered questions for article
            if(snap.child("Reactions").child(article.id).hasChild("answers")){
              return true;
            }else{
              return false;
            }
          } else {
            return false;
          }
        } else {
          return false;
        }
      })
    }

    if(hasAnswered){
      //Need to update mcquestions answer vals to reflect updated information.
    } else {
      //Can just increment mcquestions answer vals to reflect addition of this users information.
      database.ref('/Users/' + user + '/Reactions/' + article.id + '/comment/').set(this.state.comment);
      database.ref('/videos/' + article.city + '/' + article.id + '/feedback/' + user + '/').set(this.state.comment);

      //update user data
      for(question in mcQuestionsJson){
        database.ref('/Users/' + user + '/Reactions/' + article.id + '/answers/mcquestions/' + question.toString() + '/').set(this.state[question.toString()]);
      }
      //update user data and video data for frquestions
      for(question in frQuestionsJson){
        database.ref('/Users/' + user + '/Reactions/' + article.id + '/answers/frquestions/' + question.toString() + '/').set(this.state[questions.toString()]);
        let currentCount = await database.ref('/videos/' + article.city + '/' + article.id + '/answers/frquestions/' + question.toString() + '/count/').once("value").then(snap => {
          return snap.val();
        })
        currentCount = currentCount + 1;
        database.ref('/videos/' + article.city + '/' + article.id + '/frquestions/' + question.toString() + '/count/').set(currentCount);
        database.ref('/videos/' + article.city + '/' + article.id + '/frquestions/' + question.toString() + '/' + user + '/').set(this.state[questions.toString()]);
      }

      //update videos mcquestion data
      await database.ref('/videos/' + article.city + '/' + article.id + '/mcquestions/').once('value').then(async (snap) => {
        //for each mc question update count
        snap.forEach(async question => {
          let answer = this.state[question.key];
          let currentCount = await database.ref('/videos/' + article.city + '/' + article.id + '/mcquestions/' + questions.key + '/' + answer + '/').once("value").then(snap => {
              return snap.val();
          })
          currentCount = currentCount + 1;
          database.ref('/videos/' + article.city + '/' + article.id + '/mcquestions/' + questions.key + '/' + answer + '/').set(currentCount);
        })
      })
    }*/

  }

  writeMCToDB = async () => {
    const user = await AsyncStorage.getItem('user');
    const article = await this.state.article;
    const database = firebaseApp.database();
    const mcQuestionsJson = article.mcquestions;
    console.log("mcQuestionsJson val:");
    console.log(mcQuestionsJson);

    let hasAnswered = await database.ref('/Users/' + user + '/').once('value').then(snap => {
      //check if user has Reactions node
      if(snap.hasChild("Reactions")){
        //check if user has this article in reactions
        if(snap.child("Reactions").hasChild(article.id)){
          //check if user has answered questions for article
          if(snap.child("Reactions").child(article.id).hasChild("answers")){
            if(snap.child("Reactions").child(article.id).child("answers").hasChild("mcquestions")){
              return true;
            } else {
              return false;
            }
          }else{
            return false;
          }
        } else {
          return false;
        }
      } else {
        return false;
      }
    })

    if(hasAnswered){
      //update user and video information
      for(question in mcQuestionsJson){
        //get current user answer choice
        let currentAnswer = await database.ref('/Users/' + user + '/Reactions/' + article.id + '/answers/mcquestions/' + question.toString() + '/').once('value').then(snap => {
          return snap.val();
        })
        //decrement count for currentAnswer in video node
        await database.ref('/videos/' + article.city + '/' + article.id + '/mcquestions/' + question.toString() + '/' + currentAnswer + '/').once('value').then(async snap => {
          let currentCount = snap.val();
          currentCount = currentCount - 1;
          await database.ref('/videos/' + article.city + '/' + article.id + '/mcquestions/' + question.toString() + '/' + currentAnswer + '/').set(currentCount);
        })

        //update answer in user node
        await database.ref('/Users/' + user + '/Reactions/' + article.id + '/answers/mcquestions/' + question.toString() + '/').set(this.state[question.toString()]);
        //increment count for answer in video node
        await database.ref('/videos/' + article.city + '/' + article.id + '/mcquestions/' + question.toString() + '/' + this.state[question.toString()] + '/').once('value').then(async snap => {
          let currentCount = snap.val();
          currentCount = currentCount + 1;
          await database.ref('/videos/' + article.city + '/' + article.id + '/mcquestions/' + question.toString() + '/' + this.state[question.toString()] + '/').set(currentCount);
        })
      }
    } else {
      //write new user info and video information
      for(question in mcQuestionsJson){
        console.log("inside of for loop for mcQuestionsJson in writeMCToDB");
        //write value to user node
        await database.ref('/Users/' + user + '/Reactions/' + article.id + '/answers/mcquestions/' + question.toString() + '/').set(this.state[question.toString()]);
        //increment number of votes for this answer in video node
        await database.ref('/videos/' + article.city + '/' + article.id + '/mcquestions/' + question.toString() + '/' + this.state[question.toString()] + '/').once("value").then(async snap => {
          let currentCount = snap.val();
          currentCount = currentCount + 1;
          await database.ref('/videos/' + article.city + '/' + article.id + '/mcquestions/' + question.toString() + '/' + this.state[question.toString()] + '/').set(currentCount);
        })
      }
    }
    console.log("finished writeMCToDB function");
  }

  writeFRToDB = async () => {
    const user = await AsyncStorage.getItem('user');
    const article = await this.state.article;
    const database = firebaseApp.database();
    const frQuestionsJson = article.frquestions;

    let hasAnswered = await database.ref('/Users/' + user + '/').once('value').then(snap => {
      //check if user has Reactions node
      if(snap.hasChild("Reactions")){
        //check if user has this article in reactions
        if(snap.child("Reactions").hasChild(article.id)){
          //check if user has answered questions for article
          if(snap.child("Reactions").child(article.id).hasChild("answers")){
            if(snap.child("Reactions").child(article.id).child("answers").hasChild("frquestions")){
              return true;
            } else {
              return false;
            }
          }else{
            return false;
          }
        } else {
          return false;
        }
      } else {
        return false;
      }
    })

    //logic to write to db depending on whether or not user has answered questions before
    if(hasAnswered){
      //get current answers for user and update counts in videos
      for(question in frQuestionsJson){
        //write value to user node
        await database.ref('/Users/' + user + '/Reactions/' + article.id + '/answers/frquestions/' + question.toString() + '/').set(this.state[question.toString()]);
        //write value to video node
        await database.ref('/videos/' + article.city + '/' + article.id + '/frquestions/' + question.toString() + '/' + user + '/').set(this.state[question.toString()]);
      }
    } else {
      //write new user info and video information
      for(question in frQuestionsJson){
        //write value to user node
        await database.ref('/Users/' + user + '/Reactions/' + article.id + '/answers/frquestions/' + question.toString() + '/').set(this.state[question.toString()]);
        //write value to video node
        await database.ref('/videos/' + article.city + '/' + article.id + '/frquestions/' + question.toString() + '/' + user + '/').set(this.state[question.toString()]);
        //increment count for number of answers to fr question
        await database.ref('/videos/' + article.city + '/' + article.id + '/frquestions/' + question.toString() +'/count/').once("value").then(async snap => {
          let currentCount = snap.val();
          currentCount = currentCount + 1;
          await database.ref('/videos/' + article.city + '/' + article.id + '/frquestions/' + question.toString() +'/count/').set(currentCount);
        })
      }
    }
    console.log("finished writeFRToDB function");
  }

  writeCommentToDB = async () => {
    const user = await AsyncStorage.getItem('user');
    const article = await this.state.article;
    const database = firebaseApp.database();

    if(!(this.state.comment == '')){
      await database.ref('/videos/' + article.city + '/' + article.id + '/feedback/' + user + '/').set(this.state['comment']);
      await database.ref('/Users/' + user + '/Reactions/' + article.id + '/comment/').set(this.state['comment']);
    } else {
      console.log("no comment was made");
    }
    console.log("finished writeCommentToDB");
  }

  handleMCAnswer = async (question, answer) => {
    //set state to be question:answer
    let questionObj = {};
    questionObj[question] = answer;
    await this.setState( questionObj )
    //can now get state by calling this.state[question.toString()]
  }

  handleFRAnswer = async (question, answer) => {
    //need to write logic for this
    let questionObj = {};
    questionObj[question] = answer;
    await this.setState( questionObj );

    //can now get state by calling this.state[question.toString()]
  }


  render() {
    console.disableYellowBox = true;
    if(this.state.loading){
      return(<Text>Loading...</Text>);
    }else{
      const article = this.state.article

      const width = Dimensions.get('window').width
      return(
        <ScrollView style={{flex: 1}}>
        <WebView
            style={{height: 210, width, backgroundColor: 'powderBlue'}}
            javaScriptEnabled={true}
            source={{ uri: this.state.article.urlvideo }}
        />
        <CommentForm
        Upvote={this.upvote}
        Downvote={this.downvote}
        onSubmit={this.submitFunction}
        onPin={this.pin}
        onComment={this.onComment}
        article={article}
        handleMCAnswer={this.handleMCAnswer}
        handleFRAnswer={this.handleFRAnswer}
        ></CommentForm>
        </ScrollView>
      );
    }
  }
}

export default ArticleScreen;
