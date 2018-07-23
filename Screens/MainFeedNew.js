/**
 * Main Feed (smart)
 * Molecule
 * Displays list of relevant articles to the user
 * requires authentication
 */

import React from 'react'

import { View, ScrollView, Text, AsyncStorage } from 'react-native'

import firebaseApp from '../firebaseApp'

import { FeedItem } from '../components'
import { to } from '../components/util';

class MainFeed extends React.Component {
    static navigationOptions = {
        visible: false
    }

    state = {
        articles: { }
    }

    componentDidMount = async () => {
        // Fetch all recent articles
        let err, articles;
        [err, articles] = await to(this.fetchArticles());

        if (!articles && err) {
            throw new Error("Failed to fetch articles")
        }

        this.setState({ articles });
    }

    fetchArticles = async () => {
      var userCities = [];
      var articles = {};
      var userPreferences = [];
      var videos = [];

      const res = await AsyncStorage.getItem('user');

            //Get all cities user is interested in to populate userCities
          await firebaseApp.database().ref('/Users/' + res + '/cities/').once("value").then( (snap) => {
              snap.forEach((child) => {
                userCities.push(child.key);

              })
            })
            await firebaseApp.database().ref('/videos/').once("value").then((snap) => {
              //Get snapshot of database and populate video information for videos in cities user has subscribed to.
              snap.forEach(child => {

                let cityName;
                if(userCities.includes(child.key)){
                  cityName = child.key;
                }

                child.forEach(secondChild => {
                  let videoURL = secondChild.val().urlvideo;
                  let picURL = secondChild.val().urlpic;
                  let videoName = secondChild.val().name;
                  //console.log(videoName);
                  var tags = [];
                  secondChild.child("tags").forEach(tag => {
                    tags.push(tag.key);
                  })
                  let matchScore = 0;
                  var video = [secondChild.val(), tags, matchScore, cityName, secondChild.key];
                  videos.push(video);
                })
              })
            })

          return await firebaseApp.database().ref('/Users/' + res + '/').once("value").then(snap => {
            //Get list of user preferences
            let interests = snap.child("interests");
            interests.forEach(child => {
              userPreferences.push(child.key);
            })
          })

            .then(() => {
              //Generate match score for every video
              for(var i=0; i<videos.length; i++){//Loop through every video once
                for(var k=0; k<userPreferences.length; k++){//For every user preference, check if the video has that tag.
                  for(var j=0; j<videos[i][1].length; j++){
                    if(userPreferences[k] == videos[i][1][j]){
                      videos[i][2] = videos[i][2] + 1;
                    }
                  }
                }
              }

              //Sort videos based on match score
              for(var i=0; i<videos.length; i++){
                for(var k=0; k<videos.length-1; k++){
                  if(videos[k][2] < videos[k+1][2]){
                    var temp = videos[k];
                    videos[k] = videos[k+1];
                    videos[k+1] = temp;
                  }
                }
              }

              //returned articles will be an entire video json object with the additional attribute of city
              for(var i=0; i < videos.length; i++){
                articles[videos[i][4]] = videos[i][0];
                articles[videos[i][4]].city = videos[i][3];
                articles[videos[i][4]].id = videos[i][4];
              }
              return articles;
            })
    }

    render() {


        const { articles } = this.state;

        let articlesJsx;

        // Empty check
        if (!articles || Object.entries(articles).length == 0) {
            articlesJsx = (
                <View>
                    <Text>Oh no! The political sphere is ruminating... (No articles available)</Text>
                </View>
            )
        } else {
            const { navigation } = this.props

            articlesJsx = Object.entries(articles).map(([articleId, article]) => (
                <FeedItem
                    key={articleId}
                    article={article}
                    onPress={() => navigation.navigate('Article', {
                        articleId,
                        article: {
                            'id': articleId,
                            ...article
                        }
                    })}
                />
            ))
        }

        return (
            <ScrollView styles={{flex: 1, justifyContent: 'space-between'}}>
                {articlesJsx}
            </ScrollView>
        );

    }
}

export default MainFeed
