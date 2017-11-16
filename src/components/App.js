import React, { Component } from "react";
import { View } from "react-native";
import { connect } from 'react-redux'

import Category from "./Category";
import Post from "./Post";

import * as BlogAPI from "../server/dbApi";


class App extends Component {
  
  componentDidMount() {
      this.props.getCategories()
      this.props.getPosts()

  }
  render() {
    return (
      <View>
        <View>
          {this.props.categories.map(cat => <Category key={cat.path} title={cat.name} />)}
        </View>
        <View>{this.props.posts.map(post => <Post key={post.id} post={post} />)}</View>
      </View>
    );
  }
}
const mapStateToProps = ({ categories, posts }) => {
  return {
    categories: categories ? categories : [], 
    posts: posts ? posts : []
  }
}

const mapDispatchToProps  = (dispatch) => {
  return {
    getPosts: () => dispatch(BlogAPI.doGetPosts()), 
    getCategories: () => dispatch(BlogAPI.doGetCategories()), 
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
