import React from 'react'
import { View, StyleSheet, Text, AsyncStorage, ScrollView } from 'react-native'
import { to } from '../components/util'
import { FeedItem } from '../components'
import firebaseApp from '../firebaseApp'
import {NavigationActions} from 'react-navigation'

export default class PinnedPosts extends React.Component {
  state = {
    articles: { },
    keyTwo: 0,
  }

  constructor(props){
    super(props);
  }

  componentDidMount = async () => {
    console.log('inside of PinnedPostsNew');
    let err, articles;
    [err, articles] = await to(this.fetchArticles());

    if (!articles && err) {
      throw new Error("Failed to fetch articles")
    }

    this.setState({ articles });
  }

  fetchArticles = async () => {
    console.log("inside of fetchArticles");
    const user = await AsyncStorage.getItem('user');
    const database = firebaseApp.database();
    var articleNames = []; //2d array where each index is article name & city array; 0th index - article name, 1st index - city
    var articles = {};

    //get article names and citys.
    await database.ref("/Users/" + user + "/Pinned").once('value').then(snap => {
      console.log("inside of pinned reading firebase call");
      snap.forEach(child => {
        articleNames.push([child.key, child.val()]);
      })
    })

    await database.ref("/videos/").once('value').then(snap => {
      snap.forEach(city => {
        for(let i=0; i < articleNames.length; i++){
          //check if city is included in a pinned post
          if(articleNames[i][1] == city.key){
            console.log("inside of city key check");
            city.forEach(article => {
              //if article is in pinned posts then add to article json
              if(articleNames[i][0] == article.key){

                articles[article.key] = article.val();
                articles[article.key].city = city.key;
                articles[article.key].id = article.key;
              }
            })
          }
        }
      })
    })
    return articles;
  }

  updatePinnedPosts = async () => {
    //replicate componentDidMount functionality so screen is updated to reflect current pinned posts
    let err, articles;
    [err, articles] = await to(this.fetchArticles());

    if(!articles && err) {
      throw new Error("Failed to fetch articles");
    }

    this.setState({ articles });
  }

  handleScroll = async (event) => {
    console.log("handling scroll!");
    const offsetY = event.nativeEvent.contentOffset.y
    console.log(offsetY)
    if(offsetY < -4){
      await this.componentDidMount();
      let keyTwo = this.state.keyTwo;
      keyTwo = keyTwo+1;
      this.setState({'keyTwo':keyTwo});
    }
  }

  render() {
    console.log("inside of render function");
    console.disableYellowBox = true;
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
        updatePinnedPosts={this.updatePinnedPosts}
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

      console.log("completed mapping to articleJsx");
    }

    console.log("about to return");
    return (
      <ScrollView styles={{flex: 1, justifyContent: 'space-between'}} onScroll={this.handleScroll} key={this.state.keyTwo}>
          {articlesJsx}
      </ScrollView>
    );
    console.log("finished return");
  }
}
