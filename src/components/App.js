import React, { Component } from "react";
import { View } from "react-native";
import { connect } from "react-redux";

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
      <View style={{ backgroundColor: "lightGray" }}>
        <View style={{ flex: 1, flexDirection: "row", margin: 10 }}>
          {this.props.categories.map(cat => (
            <Category key={cat.path} title={cat.name} />
          ))}
        </View>
        <View>
          {this.props.posts.map(post => <Post key={post.id} {...post} />)}
        </View>
      </View>
    );
  }
}
const mapStateToProps = ({ categories, posts }) => {
  return {
    categories: categories ? categories : [],
    posts: posts ? posts : []
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getPosts: () => dispatch(BlogAPI.doGetPosts()),
    getCategories: () => dispatch(BlogAPI.doGetCategories())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
