import React from 'react'
import { View, StyleSheet, Text, AsyncStorage, ScrollView } from 'react-native'
import { to } from '../components/util'
import { FeedItem } from '../components'
import firebaseApp from '../firebaseApp'


const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default class AggregateFeedback extends React.Component {
  state = {
    articles: { }
  }

  constructor(props){
    super(props)
  }

  componentDidMount = async () => {
    console.log("inside of componentDidMount");
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
            }
          })
        }
      })
    })

    return articles;

  }


  render() {
    const { articles } = this.state;

    let articlesJsx;

    // Empty check
    if (!articles || Object.entries(articles).length == 0) {
      console.log("inside of empty check for articles");
      articlesJsx = (
        <View>
        <Text>Oh no! The political sphere is ruminating... (No articles available)</Text>
        </View>
      )
    } else {
      console.log("passed the empty check");
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
