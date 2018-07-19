import React from 'react'

import { Dimensions, StyleSheet, View, Text, ScrollView, ActivityIndicator, AsyncStorage, WebView } from 'react-native'

import Article  from '../components/Article'

import CommentForm from '../components/CommentForm'

import firebaseApp from '../firebaseApp'

class ArticleScreen extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      'article': ''
    }
  }

  componentDidMount = () => {
    const { navigation } = this.props

    const article = navigation.getParam('article', undefined);
    const articleId = navigation.getParam('articleId', undefined);

    console.log(article, articleId)
    this.setState({ "article" : article })
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
              //If there is no change to the reaction, but no reaction was recorded previously, create neg reactions notde and set to one in video
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

  placeholderFunction = async () => {
    const user = await AsyncStorage.getItem('user');

  }

  render() {
    const { article } = this.state
    
    const width = Dimensions.get('window').width
    
    return (
      <ScrollView style={{flex: 1}}>
      <WebView
          style={{height: 210, width, backgroundColor: 'powderBlue'}}
          javaScriptEnabled={true}
          source={{ uri: this.state.article.urlvideo }}
      />
      <Text>{JSON.stringify(article)}</Text>
      <CommentForm
      Upvote={this.upvote}
      Downvote={this.downvote}
      onSubmit={this.placeholderFunction}
      onPin={this.pin}
      onComment={this.onComment}
      ></CommentForm>
      </ScrollView>
    );
  }
}

export default ArticleScreen;
