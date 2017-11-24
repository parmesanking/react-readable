import React, { Component } from "react";
import { Link } from "react-router-dom";
import { View, Button, Text } from "react-native";
import { connect } from "react-redux";

import CategoryList from "./CategoryList";
import Post from "./Post";
import NewPost from "./NewPost";
import NewComment from "./NewComment";
import { SortButton, HomeButton } from "./Utils";
import * as BlogAPI from "../server/dbApi";
import { sortPost } from "../actions/index";


class App extends Component {
  state = {
    category: "",
    modalType: "",
    objectToEditContainer: null,
    objectToEdit: null,
    isModalOpen: false
  };

  componentDidMount() {
    this.props.getCategories()
    this.props.getPosts(this.props.match.params.category, this.props.match.params.postid);
  }

  componentWillReceiveProps(nextProps){
    if (this.props.match.params.category !== nextProps.match.params.category || this.props.match.params.postid !== nextProps.match.params.postid){
      this.props.getPosts(nextProps.match.params.category, nextProps.match.params.postid);
    }
  }

  onCategorySelect(category) {
    this.setState({ category: category }, () => this.props.getPosts(category));
  }

  toggleModal() {
    this.setState(
      { isModalOpen: !this.state.isModalOpen },
      () =>
        !this.state.isModalOpen &&
        this.setState({
          modalType: "",
          objectToEdit: null,
          objectToEditContainer: null
        })
    );
  }

  onCommentEdit(post, comment) {
    this.setState(
      {
        modalType: "comment",
        objectToEdit: comment,
        objectToEditContainer: post
      },
      () => this.toggleModal()
    );
  }

  onPostEdit(post) {
    this.setState({ modalType: "post", objectToEdit: post }, () =>
      this.toggleModal()
    );
  }

  onMessageDelete(type, message) {
    return type === "post"
      ? window.confirm("Do you wanna remove that post with all child comments?")
        ? this.props.deletePost(message)
        : null
      : window.confirm("Do you wanna remove that comment?")
        ? this.props.deleteComment(message)
        : null;
  }

  onSort(column, direction) {
    this.props.sortPost(column, direction);
  }

  render() {
    return (
      <View
        style={{
          backgroundColor: "#E8E8E8",
          borderColor: "transparent",
          position: "absolute",
          left: 0,
          top: 0,
          right: 0,
          bottom: 0
        }}
      >
        <View
          style={{
            marginLeft: 100,
            marginRight: 100
          }}
        >
          {this.props.match.params.postid  ?
            <Link to="/"><View style={{marginLeft: 10}}><HomeButton /></View></Link>
            :
          <View
            style={{
              flex: 1,
              alignItems: "center",
              flexDirection: "row",
              margin: 10
            }}
          >
            <Button
              style={{ marginRight: 50 }}
              title="New post"
              onPress={() => this.onPostEdit()}
            />
            <View style={{ marginRight: 50 }} />
            <CategoryList
              categories={this.props.categories}
              value={this.state.category}
              onCategorySelect={cat => this.onCategorySelect(cat)}
            />
            <Text>Sort by:{"   "}</Text>
            <SortButton
              column="score"
              direction={
                this.props.sortBy === "score" ? this.props.sortDirection : ""
              }
              onPress={(col, dir) => this.onSort(col, dir)}
            />
            <View style={{ marginRight: 10 }} />
            <SortButton
              column="date"
              direction={
                this.props.sortBy === "date" ? this.props.sortDirection : ""
              }
              onPress={(col, dir) => this.onSort(col, dir)}
            />
          </View>
            }
          <View>
            {this.props.posts.length > 0 ? (
              this.props.posts.map(post => (
                <Post
                  key={post.id}
                  post={post}
                  compactView={this.props.match.params.postid ? false : true}
                  onAddPost={post => this.onPostEdit(post)}
                  onAddComment={(post, comment) =>
                    this.onCommentEdit(post, comment)}
                  onDelete={(type, msg) => this.onMessageDelete(type, msg)}
                />
              ))
            ) : (
              <View
                style={{
                  flex: 1,
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center", 
                  marginTop: 20
                }}
              >
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                  No posts found :(
                </Text>
              </View>
            )}
          </View>
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
              height: "50%"
            }}
          >
            {this.state.modalType === "post" ? (
              <NewPost
                categories={this.props.categories}
                post={this.state.objectToEdit}
                editMode={this.state.objectToEdit ? true : false}
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
const mapStateToProps = ({ categories, posts, sort }) => {
  return {
    categories: categories ? categories : [],
    posts: posts ? posts : [],
    sortBy: sort.by,
    sortDirection: sort.order
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getPosts: (category, postid) => dispatch(BlogAPI.doGetPosts(category, postid)),
    getCategories: () => dispatch(BlogAPI.doGetCategories()),
    addPost: post => dispatch(BlogAPI.doAddPost(post)),
    editPost: post => dispatch(BlogAPI.doEditPost(post)),
    deletePost: post => dispatch(BlogAPI.doDeletePost(post)),
    addComment: comment => dispatch(BlogAPI.doAddComment(comment)),
    editComment: comment => dispatch(BlogAPI.doEditComment(comment)),
    deleteComment: comment => dispatch(BlogAPI.doDeleteComment(comment)),
    sortPost: (sortby, sortorder) => dispatch(sortPost(sortby, sortorder))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
