import React, { Component } from "react";
import { View, Button,Text, Modal } from "react-native";
import { connect } from "react-redux";

import Category from "./Category";
import Post from "./Post";

import * as BlogAPI from "../server/dbApi";

class App extends Component {

  state={category:'', 
        isModalOpen: false}
  
  componentDidMount() {
      this.props.getCategories()
      this.props.getPosts(null)
  }

  onCategorySelect(category){
    this.setState({category:category}, () => this.props.getPosts(category))
  }

  onAddPost(){
    debugger
    this.setState({isModalOpen: !this.state.isModalOpen})
  }



  render() {
    return (
      <View style={{ backgroundColor: "lightGray" }}>
        <View style={{ flex: 1, flexDirection: "row", margin: 10 }}>
          <Button title="New post" onPress={() => this.onAddPost()} />
          {this.props.categories.map(cat => 
             <Category key={cat.path} title={cat.name} selected={this.state.category === cat.path} 
             onCategorySelect={() => this.onCategorySelect(this.state.category === cat.path ? '' : cat.path)}/>
           )}
           
        </View>
        <View>
          {this.props.posts.map(post => <Post key={post.id} {...post} />)}
        </View>

        <Modal
          transparent={false}
          visible={this.state.isModalOpen}
          onRequestClose={() => {alert("Modal has been closed.")}}
          ><Text>STACEPPA!</Text></Modal>
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
    getPosts: (category) => dispatch(BlogAPI.doGetPosts(category)),
    getCategories: () => dispatch(BlogAPI.doGetCategories())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
