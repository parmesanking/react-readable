import React, { Component } from "react";
import { View, Button, Text } from "react-native";
import { connect } from "react-redux";

import CategoryList from "./CategoryList";
import Post from "./Post";
import NewPost from "./NewPost";
import NewComment from "./NewComment";

import * as BlogAPI from "../server/dbApi";

class App extends Component {
  state = {
    category: "",
    postToEdit: null,
    commentToEdit: null,
    isModalOpen: false
  };

  componentDidMount() {
    this.props.getCategories();
    this.props.getPosts(null);
  }

  onCategorySelect(category) {
    this.setState({ category: category }, () => this.props.getPosts(category));
  }

  toggleModal() {
    this.setState(
      { isModalOpen: !this.state.isModalOpen },
      () =>
        !this.state.isModalOpen &&
        this.setState({ postToEdit: null, commentToEdit: null })
    );
  }

  onCommentEdit(postid, comment) {
    this.setState({ postToEdit: post, commentToEdit: comment }, () =>
      this.toggleModal()
    );
  }

  onPostEdit(post) {
    this.setState({ postToEdit: post }, () => this.toggleModal());
  }

  render() {
    return (
      <View style={{ backgroundColor: "lightGray", position: "absolute",
      left: 0,
      top: 0,
      right: 0,
      bottom: 0, }}>
        <View style={{ flex: 1, flexDirection: "row", margin: 10 }}>
          <Button title="New post" onPress={() => this.toggleModal()} />
          <CategoryList
            categories={this.props.categories}
            value={this.state.category}
            onCategorySelect={cat => this.onCategorySelect(cat)}
          />
        </View>
        <View>
          {this.props.posts.map(post => <Post key={post.id} {...post} onAddComment={(post, comment) => this.onCommentEdit(post, comment)}/>)}
        </View>

        <View
          style={{
            backgroundColor: "rgba(0,0,0,.50)",
            borderColor: "transparent",
            position: "absolute",
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            display: this.state.isModalOpen ? "flex" : "none"
          }}
        >
          <View
            style={{
              backgroundColor: "rgb(255,255,255)",
              borderColor: "transparent",
              position: "absolute",
              left: 100,
              top: 100,
              right: 100,
              bottom: 100
            }}
          >
            { this.state.commentToEdit === undefined && 
              <NewPost  categories={this.props.categories} onClose={() => this.toggleModal() } onAddPost={(post) => this.props.addPost(post)} />
            }
            {
              this.state.commentToEdit && <NewComment parentPostId={this.state.postToEdit} onClose={() => this.toggleModal()} onAddComment={(comment) => this.props.addComment(comment)}  />
            }
          </View>
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
    getPosts: category => dispatch(BlogAPI.doGetPosts(category)),
    getCategories: () => dispatch(BlogAPI.doGetCategories()),
    addPost: post => dispatch(BlogAPI.doAddPost(post)),
    addComment: comment => dispatch(BlogAPI.doAddComment(comment))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
