import React, { Component } from "react";
import { View, Button, Text } from "react-native";
import { connect } from "react-redux";

import CategoryList from "./CategoryList";
import Post from "./Post";
import NewPost from "./NewPost";
import NewComment from "./NewComment";
import {Margin} from './Utils'

import * as BlogAPI from "../server/dbApi";

class App extends Component {
  state = {
    category: "",
    modalType: "",
    objectToEditContainer:null,
    objectToEdit:null,
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
        this.setState({ modalType: "", objectToEdit: null, objectToEditContainer: null })
    );
  }

  onCommentEdit(post, comment) {
    this.setState({ modalType: "comment" , objectToEdit:comment, objectToEditContainer:post}, () => this.toggleModal());
  }

  onPostEdit(post) {
    this.setState({ modalType: "post", objectToEdit: post }, () => this.toggleModal());
  }

  render() {
    return (
      <View
        style={{
          backgroundColor: "#E8E8E8",
        }}
      >
        <View style={{ flex: 1,flexDirection: "row", margin: 10 }}>
          <Button title="New post" onPress={() => this.onPostEdit()} />
          <Margin marginRight="20" />
          <CategoryList
            categories={this.props.categories}
            value={this.state.category}
            onCategorySelect={cat => this.onCategorySelect(cat)}
          />
        </View>
        <View>
          {this.props.posts.map(post => (
            <Post
              key={post.id}
              post={post}
              onAddPost={(post) =>
                this.onPostEdit(post)}
              onAddComment={(post,  comment) =>
                this.onCommentEdit(post, comment)}
            />
          ))}
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
            {this.state.modalType === "post" ? (
              <NewPost
                categories={this.props.categories}
                post={this.state.objectToEdit}X
                editMode={this.state.objectToEdit  ? true : false}
                onClose={() => this.toggleModal()}
                onAddPost={post => this.props.addPost(post)}
                onEditPost={post => this.props.editPost(post)}
              />
            ) : (
              <NewComment
                post={this.state.objectToEditContainer}
                comment={this.state.objectToEdit}
                editMode={this.state.objectToEdit ? true : false}
                onClose={() => this.toggleModal()}
                onAddComment={comment => this.props.addComment(comment)}
                onEditComment={comment => this.props.editComment(comment)}
              />
            )}
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
    editPost: post => dispatch(BlogAPI.doEditPost(post)),
    addComment: comment => dispatch(BlogAPI.doAddComment(comment)),
    editComment: comment => dispatch(BlogAPI.doEditComment(comment))
    
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
