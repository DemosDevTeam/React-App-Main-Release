// Props
// Dumb component
// Does not fetch backend requests
// All data should be passed in
// Props
// Article
//

import React from 'react'
import { Dimensions, View, StyleSheet, TouchableOpacity, TouchableHighlight, Text, WebView, Image, AsyncStorage } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import firebaseApp from '../firebaseApp'

import { VideoPlayer } from './'

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    title: {

    },
    excerpt: {

    }
})

export default class FeedItem extends React.Component {
    // TODO: Prop types have changed in React recently
    // Not necessary but better to have strict type encorcement
    // Keeping for docs
    /*
    static propTypes = {
        title: React.PropTypes.string.isRequired,
        videoUri: React.PropTypes.string.isRequired,
        pinned: React.PropTypes.boolean.optional,
        excerpt: React.PropTypes.string.optional,
        tags: React,Propt
    }
    */

    upVote = async () => {
      const user = await AsyncStorage.getItem('user');
      let articleId = this.props.article.id;
      let city = this.props.article.city;
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

    downVote = async () => {
      const user = await AsyncStorage.getItem('user');
      let articleId = await this.props.article.id;
      let city = await this.props.article.city;
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
      let articleId = this.props.article.id;
      let city = this.props.article.city;
      let database = firebaseApp.database();

      await database.ref('/Users/' + user + '/Pinned/' + articleId + '/').set(city);
    }

    render() {
        // TODO: Change source
        const { article, onPress } = this.props;

        const { title, content } = article;
        const videoSource = article.urlvideo;
        const imageSource = article.urlpic;

        const pinned = false

        const width = Dimensions.get('window').width;
        const height = Dimensions.get('window').width * 0.562;

        return (
            <View style={styles.container}>
              <TouchableOpacity onPress={onPress}>
                  <Image
                      // style={{height: 210, width, backgroundColor: 'powderBlue'}}
                      style={{height, width, backgroundColor: 'powderBlue'}}
                      javaScriptEnabled={true}
                      source={{ uri: imageSource }}
                  />
                </TouchableOpacity>
                <View style={{height: 10}}/>
                <View style={{width: 100+"%", height: 35, flexDirection: "row"}}>
                    <View style={{width: 15}}/>
                    <TouchableHighlight>
                        <Ionicons name="ios-thumbs-up-outline" size={30} />
                    </TouchableHighlight>
                    <View style={{width: 17}}/>
                    <TouchableHighlight>
                        <Ionicons name="ios-thumbs-down-outline" size={30} />
                    </TouchableHighlight>
                    <View style={{width: 15}}/>
                    <View style={{position: 'absolute', right: 20}}>
                        <TouchableHighlight>
                            <Ionicons name="ios-bookmark-outline" size={30} />
                        </TouchableHighlight>
                        <View style={{width: 15}}/>
                    </View>
                </View>
                <View style={{height: 5}}/>
                <TouchableOpacity onPress={onPress}>
                    <Text style={{fontSize: 12}}>{title}</Text>
                </TouchableOpacity>
                <View style={{height: 4, backgroundColor: '#d8d4d4'}}/>
            </View>
        );
    }
}
