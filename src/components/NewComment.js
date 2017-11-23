import React from "react";
import { View, Button, Text, TextInput } from "react-native";

import uuid from "uuid/v4";

class NewComment extends React.Component {
  state = this.getInitialState();

  getInitialState() {
    return {
      id: uuid(),
      author: "",
      body: "",
      parentId: ""
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.comment) {
      this.setState({
        id: nextProps.comment.id,
        author: nextProps.comment.author,
        body: nextProps.comment.body,
        parentId: nextProps.comment.parentId
      });
    }
  }

  onCategorySelect(category) {
    category && this.setState({ category: category });
  }

  onUserInput(input, value) {
    let newState = this.state;
    newState[input] = value;
    this.setState(newState);
  }

  onCommentSave() {
    if (!this.state.author) {
      alert("Please set your name as author");
    } else if (!this.state.body) {
      alert("Please set a comment");
    } else if ((!this.props.editMode && !this.props.post) || (this.props.editMode && !this.props.comment.parentId)) {
      alert("Invalid post passed!");
    } else {
      this.props.editMode
        ? this.props.onEditComment({
            ...this.state,
            parentId: this.props.comment.parentId,
            timestamp: Date.now()
          })
        : this.props.onAddComment({
            ...this.state,
            parentId: this.props.post.id,
            timestamp: Date.now()
          });
      this.props.onClose();
      this.setState(this.getInitialState());
    }
  }

  render() {
    return (
      <View style={{ padding: 10 }}>
        <Text style={{ marginBottom: 20, fontSize: 16, fontWeight: "bold" }}>
          {this.props.editMode
            ? "Edit this comment"
            : `Insert your comment for "${this.props.post &&
                this.props.post.title}"`}
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
          style={{ borderColor: "gray", borderWidth: 1, padding: 5 }}
          placeholder="Comment here..."
          multiline={true}
          numberOfLines={6}
          maxLength={2000}
          value={this.state.body}
          onChangeText={text => this.onUserInput("body", text)}
        />

        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignSelf: "flex-end",
            marginTop: 20
          }}
        >
          <Button
            title="Cancel"
            color="#d3d3d3"
            onPress={() => this.props.onClose()}
          />
          <View style={{marginRight:10}} />
          <Button title="Save" onPress={() => this.onCommentSave()} />
        </View>
      </View>
    );
  }
}

export default NewComment;
