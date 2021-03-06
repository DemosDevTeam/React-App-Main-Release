import React from 'react'
import { View, StyleSheet, Text, AsyncStorage, ScrollView, Image } from 'react-native'
import { to } from '../components/util'
import FeedbackFeedItem from '../components/FeedbackFeedItem'
import firebaseApp from '../firebaseApp'


const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default class AggregateFeedback extends React.Component {
  state = {
    articles: { },
    keyTwo: 0
  }

  constructor(props){
    super(props)
  }

  componentDidMount = async () => {
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
    console.log("Inside of fetchArticles");
    const user = await AsyncStorage.getItem('user');
    const database = firebaseApp.database();
    var articles = {};
    var articleTitles = [];
    var cities = [];

    console.log("getting all article titles");
    //get titles of all articles to display
    await database.ref('/Users/' + user + '/Reactions/').once('value').then(snap => {
      snap.forEach(child => {
        articleTitles.push(child.key);
      })
      return articleTitles;
    })

    console.log("getting user cities");
    //get cities that user is interested inspect
    await database.ref('/Users/' + user + '/cities/').once('value').then(snap => {
      snap.forEach(child => {
        cities.push(child.key);
      })
    })

    console.log("getting actual article");
    //get json associated with each articleTitle
    await database.ref('/videos/').once('value').then(snap => {
      //iterate thorugh cities, check cities that user subscribes to.
      snap.forEach(city => {
        if(cities.includes(city.key)){

          //iterate through videos for city and check if user provided feedback on those cities.
          city.forEach(video => {
            if(articleTitles.includes(video.key)){
              //set json object associated with this video to be video JSON
              //add city name to the json object we write
              articles[video.key] = video.val();
              articles[video.key].city = city.key;
              articles[video.key].id = video.key;
            }
          })
        }
      })
    })

    return articles;

  }

  handleScroll = async (event) => {
    console.log("handling scroll!");
    const offsetY = event.nativeEvent.contentOffset.y
    console.log(offsetY)
    if(offsetY < -4){
      let keyTwo = this.state.keyTwo;
      keyTwo = keyTwo+1;
      this.setState({'keyTwo':keyTwo});
    }
  }

  componentWillUnmount() {
    this.sub.remove();
  }

  render() {
    const { articles } = this.state;
    console.disableYellowBox = true;

    let articlesJsx;

    // Empty check
    if (!articles || Object.entries(articles).length == 0) {
      console.log("inside of empty check for articles");
      articlesJsx = (
        <View>
        <Text style={{fontSize: 15}}>Oh no! The political sphere is ruminating... (No articles available)</Text>
        </View>
      )
    } else {
      console.log("passed the empty check");
      const { navigation } = this.props

      articlesJsx = Object.entries(articles).map(([articleId, article]) => (
        <FeedbackFeedItem
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
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <View style={{height: 10}}></View>
          <Image
              style={{height: 45, width: 80}}
              source={{ uri: 'https://user-images.githubusercontent.com/18129905/43050902-6fc94544-8dde-11e8-94fd-9bdfa1df6ead.png'}}
          />
          <View style={{height: 10}}></View>
          </View>
      </ScrollView>
    );
  }
}
