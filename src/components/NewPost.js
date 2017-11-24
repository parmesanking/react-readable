import React from "react";
import { View, Button, Text, TextInput } from "react-native";
import CategoryList from "./CategoryList";
import uuid from "uuid/v4";
import { Margin } from "./Utils";

class NewPost extends React.Component {
  state = this.getInitialState();

  getInitialState() {
    return {
      id: uuid(),
      author: "",
      title: "",
      body: "",
      category: ""
    };
  }

  componentWillReceiveProps(nextProps) {
    nextProps.post
      ? this.setState({
          id: nextProps.post.id,
          author: nextProps.post.author,
          title: nextProps.post.title,
          body: nextProps.post.body,
          category: nextProps.post.category
        })
      : this.setState(this.getInitialState());
  }

  onCategorySelect(category) {
    category && this.setState({ category: category });
  }

  onUserInput(input, value) {
    let newState = this.state;
    newState[input] = value;
    this.setState(newState);
  }

  onPostSave() {
    if (!this.state.author) {
      alert("Please set your name as author");
    } else if (!this.state.title) {
      alert("Please set a post title");
    } else if (!this.state.body) {
      alert("Please set a post content");
    } else if (!this.state.category) {
      alert("Please select a category for your post");
    } else {
      this.props.editMode
        ? this.props.onEditPost({ ...this.state, timestamp: Date.now() })
        : this.props.onAddPost({ ...this.state, timestamp: Date.now() });
      this.props.onClose();
      this.setState(this.getInitialState());
    }
  }

  render() {
    return (
      <View style={{ padding: 10 }}>
        <Text style={{ marginBottom: 20, fontSize: 16, fontWeight: "bold" }}>
          {this.props.editMode ? "Edit this post" : "Insert your new post"}
        </Text>
        <TextInput
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            padding: 5,
            marginBottom: 10
          }}
          editable={!this.props.editMode}
          placeholder="My name here..."
          value={this.state.author}
          onChangeText={text => this.onUserInput("author", text)}
        />
        <TextInput
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            padding: 5,
            marginBottom: 10
          }}
          placeholder="Title..."
          value={this.state.title}
          onChangeText={text => this.onUserInput("title", text)}
        />
        <TextInput
          style={{ borderColor: "gray", borderWidth: 1, padding: 5 }}
          placeholder="Post content..."
          multiline={true}
          numberOfLines={6}
          maxLength={2000}
          value={this.state.body}
          onChangeText={text => this.onUserInput("body", text)}
        />
        <Margin />
        <CategoryList
          categories={this.props.categories}
          value={this.state.category}
          onCategorySelect={cat =>
            this.props.editMode ? "" : this.onCategorySelect(cat)}
        />
        <Margin />
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignSelf: "flex-end"
          }}
        >
          <Button
            title="Cancel"
            color="#d3d3d3"
            onPress={() => this.props.onClose()}
          />
          <View style={{ marginRight: 10 }} />
          <Button title="Save" onPress={() => this.onPostSave()} />
        </View>
      </View>
    );
  }
}

export default NewPost;
