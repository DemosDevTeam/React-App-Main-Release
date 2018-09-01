import React from 'react'

import { View, ScrollView, Text, AsyncStorage } from 'react-native'

import firebaseApp from '../firebaseApp'

import { FeedItem } from '../components'
import { to } from '../components/util';

class MainFeed extends React.Component {

    state = {
        articles: { },
        keyTwo:0,
    }

    componentWillReceiveProps = () => {
      console.log("componentWillRecieveProps was called");
    }

    handleScroll = (event) => {
      console.log("handling scroll!");
      const offsetY = event.nativeEvent.contentOffset.y
      console.log(offsetY)
      if(offsetY < -4){
        let keyTwo = this.state.keyTwo;
        keyTwo = keyTwo+1;
        this.setState({'keyTwo':keyTwo});
      }
    }

    componentDidMount = async () => {
      console.log("running test of isWithinTwoWeeks");
      console.log("expected output - false");
      testResult = this.isWithinTwoWeeks(2018, 8, 10, 2018, 9, 20)
      console.log("actual output:");
      console.log(testResult);

        this.sub = this.props.navigation.addListener('didFocus', () => {
          console.log("MainFeed came into focus");
          let keyTwo = this.state.keyTwo;
          keyTwo = keyTwo+1;
          this.setState({'keyTwo':keyTwo});
        })
        // Fetch all recent articles
        let err, articles;
        [err, articles] = await to(this.fetchArticles());

        if (!articles && err) {
            throw new Error("Failed to fetch articles")
        }

        this.setState({ articles });
    }

    fetchArticles = async () => {
      var today = new Date();

      var currentDay = today.getDate();
      var currentMonth = parseInt(today.getMonth()+1);
      var currentYear = today.getFullYear();
      var currentHour = today.getHours();
      console.log(currentYear + "/" + currentMonth + "/" + currentDay + ":" + currentHour);

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
                  //parse date string from db into year, month, day and hour
                  let date = secondChild.val().date;
                  let dateArr = date.split("/");
                  let year = dateArr[0];
                  let month = dateArr[1];
                  let dayArr = dateArr[2].split(":");
                  let day = dayArr[0];
                  let hour = dayArr[1];

                  //ignore any uploads that were made outside of the past two weeks.
                  if(this.isWithinTwoWeeks(currentYear, currentMonth, currentDay, year, month, day)){
                    let videoURL = secondChild.val().urlvideo;
                    let picURL = secondChild.val().urlpic;
                    let videoName = secondChild.val().name;
                    var tags = [];
                    secondChild.child("tags").forEach(tag => {
                      tags.push(tag.key);
                    })
                    let matchScore = 0;
                    var video = [secondChild.val(), tags, matchScore, cityName, secondChild.key];
                    videos.push(video);
                  }


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

    /*function for checking if two dates are more than 14 days apart. args are in form of year, month, day, year, month, day*/
    isWithinTwoWeeks = (currentYear, currentMonth, currentDay, argYear, argMonth, argDay) => {
      //when currentYear and argYear are different not within two weeks
      if(currentYear != argYear){
        return false;
      }
      //when currentMonth and argMonth are the same need to check days
      if(currentMonth == argMonth){
        //If currentDay - argDay is greater than 14 return false else return true
        if(currentDay - argDay > 14) {
          return false;
        } else {
          return true;
        }

      } else if (currentMonth - argMonth < 2){
        let difference = currentDay + (31 - argDay);
        //if diff is > 14 return false otherwise return true
        if(difference > 14) {
          return false;
        } else {
          return true;
        }
      } else {
        //when difference between currentMonth and argMonth is > 1 always return false
        return false;
      }
    }

    componentWillUnmount() {
      this.sub.remove();
    }

    render() {
      console.log("inside of render function");
      console.disableYellowBox = true;

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
            <ScrollView styles={{flex: 1, justifyContent: 'space-between'}} onScroll={this.handleScroll} key={this.state.keyTwo}>
                {articlesJsx}
            </ScrollView>
        );

    }
}

export default MainFeed
