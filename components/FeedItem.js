// Props
// Dumb component
// Does not fetch backend requests
// All data should be passed in
// Props
// Article
//

/* for reflecting previous responses just change Ionicons name="ios-thumbs-down-outline" to Ionicons name="ios-thumbs-down" */
//Need to write componentDidMount to get current status

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
    constructor(props) {
      super(props);

      this.state = {
        upVoteIcon: "ios-thumbs-up-outline",
        downVoteIcon: "ios-thumbs-down-outline",
        pinIcon: "ios-bookmark-outline"
      }
    }

    //Need to populate correct icons on mount to reflect users previous interactions with app
    componentDidMount = async () => {
      console.log("inside of FeedItem componentDidMount");
      const user = await AsyncStorage.getItem('user');
      let articleId = this.props.article.id;
      let city = this.props.article.city;
      let database = firebaseApp.database();

      //if user hasn't reacted then userRection = undefined, otherwise it holds value for reaction
      let userReaction = await database.ref('/Users/' + user + '/').once('value').then(snap => {

        if(snap.hasChild('Reactions')){
          if(snap.child('Reactions').hasChild(articleId)){
            if(snap.child('Reactions').child(articleId).hasChild('reaction')){
              return snap.child('Reactions').child(articleId).child('reaction').val();
            }
          }
        }
        return undefined;
      })

      //return true or false depending on whether the user has pinned this video or not
      let userPinned = await database.ref('/Users/' + user + '/').once('value').then(snap => {
        if(snap.hasChild('Pinned')){
          if(snap.child('Pinned').hasChild(articleId)){
            return true;
          }
        }
        return false;
      })

      if(userPinned){
        this.setState({'pinIcon': "ios-bookmark"})
      }

      if(userReaction === 'negative'){
        this.setState({'downVoteIcon': "ios-thumbs-down"});
      } else if (userReaction === 'positive') {
        this.setState({'upVoteIcon':"ios-thumbs-up"});
      }
    }

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

      this.updateIcons('positive');
    }

    downVote = async () => {
      console.log("inside of downVote function");
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
        }  else {
          //Need to increment count for this video of negative reactions and set user reaction to "positive"
          database.ref('/Users/' + user + '/Reactions/' + articleId + '/reaction/').set("negative");
          await database.ref('/videos/' + city + '/' + articleId + '/Negative Reactions/').once('value').then((snap) => {
            let currentNegativeReviews = snap.val();
            currentNegativeReviews = currentNegativeReviews+1;
            database.ref('/videos/' + city + '/' + articleId + '/Negative Reactions/').set(currentNegativeReviews);
          })
        }
      })

      this.updateIcons('negative');
    }

    pin = async () => {
      const user = await AsyncStorage.getItem('user');
      let articleId = this.props.article.id;
      let city = this.props.article.city;
      let database = firebaseApp.database();

      await database.ref('/Users/' + user + '/').once('value').then(async snap => {
        if(snap.hasChild('Pinned')){
          if(snap.child('Pinned').hasChild(articleId)){
            await database.ref('/Users/' + user +'/Pinned/' + articleId + '/').remove();
          } else {
            await database.ref('/Users/' + user + '/Pinned/' + articleId + '/').set(city);
          }
        } else {
          await database.ref('/Users/' + user + '/Pinned/' + articleId + '/').set(city);
        }
      })

      if(this.props.updatePinnedPosts != undefined){
        await this.props.updatePinnedPosts();
      }

      this.updateIcons('pin');
    }

    updateIcons = (input) => {
      //helper function for updating downvote/upvote/pin actions
      if(input === 'negative'){
        if(this.state.downVoteIcon === "ios-thumbs-down"){
          //update state for upVoteIcon
          this.setState({'upVoteIcon':"ios-thumbs-up-outline"});
        } else {
          //need to update state for downVoteIcon and upVoteIcon
          this.setState({'downVoteIcon':"ios-thumbs-down"});
          this.setState({'upVoteIcon':"ios-thumbs-up-outline"});
        }
      }

      if(input === 'positive'){
        if(this.state.upVoteIcon === "ios-thumbs-up"){
          //updaate state for downVoteIcon
          this.setState({'downVoteIcon':"ios-thumbs-down-outline"});
        } else {
          //need to update state for upVoteIcon and downVoteIcon
          this.setState({'upVoteIcon':"ios-thumbs-up"})
          this.setState({'downVoteIcon':"ios-thumbs-down-outline"});
        }
      }

      if(input === 'pin'){
        if(this.state.pinIcon === "ios-bookmark-outline"){
          this.setState({'pinIcon':"ios-bookmark"})
        } else {
          this.setState({'pinIcon':"ios-bookmark-outline"})
        }

      }
    }

    render() {
        // TODO: Change source
        const { article, onPress } = this.props;

        const { title, content } = article;
        const videoSource = article.urlvideo;
        const imageSource = article.urlpic;
        const articleName = article.id;

        const pinned = false

        const width = Dimensions.get('window').width;
        const height = Dimensions.get('window').width * 0.562;

        return (
            <View style={styles.container}>
            <TouchableOpacity onPress={onPress}>
                <Text style={{fontSize: 1}}>{title}</Text>
            </TouchableOpacity>
            <View style={{marginLeft: 10}}>
            <Text style={{fontSize: 16}}>{articleName}</Text>
            </View>
            <View style={{height: 6}}/>
              <TouchableOpacity onPress={onPress}>
                  <Image
                      style={{height, width}}
                      javaScriptEnabled={true}
                      source={{ uri: imageSource }}
                  />
                </TouchableOpacity>
                <View style={{height: 10}}/>
                <View style={{width: 100+"%", height: 35, flexDirection: "row"}}>
                    <View style={{width: 15}}/>
                    <TouchableHighlight onPress={this.upVote}>
                        <Ionicons name={this.state.upVoteIcon} color={'#F05758'} size={30} />
                    </TouchableHighlight>
                    <View style={{width: 17}}/>
                    <TouchableHighlight onPress={this.downVote}>
                        <Ionicons name={this.state.downVoteIcon} color={'#51585E'} size={30} />
                    </TouchableHighlight>
                    <View style={{width: 15}}/>
                    <View style={{position: 'absolute', right: 20}}>
                        <TouchableHighlight onPress={this.pin}>
                            <Ionicons name={this.state.pinIcon} color={'#49C7E3'} size={30} />
                        </TouchableHighlight>
                        <View style={{width: 15}}/>
                    </View>
                </View>
                <View style={{height: 10}}/>
                <View style={{height: 2}}/>
                <View style={{alignItems: 'center'}}>
                <Image
                    style={{height: 0.5, width: 330}}
                    source={{ uri: 'https://user-images.githubusercontent.com/18129905/43154762-80b0b606-8f43-11e8-9fed-21922ca2ac85.png'}}
                />
                </View>
            </View>
        );
    }
}
