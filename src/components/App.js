import React, { Component } from "react";
import { View } from "react-native";
import { connect } from 'react-redux'

import * as BlogAPI from "../server/dbApi";

import Category from "./Category";
import Post from "./Post";



class App extends Component {
  state = {
    categories: [],
    posts: []
  };
  componentDidMount() {
    BlogAPI.getCategories().then(cat => {
      this.setState({ categories: cat });
    });
    BlogAPI.getPosts().then(posts => {
      this.setState({ posts: posts });
    });
  }
  render() {
    return (
      <View>
        <View>
          {this.state.categories.map(cat => <Category title={cat.name} />)}
        </View>
        <View>{this.state.posts.map(post => <Post post={post} />)}</View>
      </View>
    );
  }
}
const mapStateToProps = ({ categories, posts }) => {
  return {
    categories: categories, 
    posts: posts
  }
}

const mapDispatchToProps  = (dispatch) => {
  return {
    doPost: (data) => dispatch(Post(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
