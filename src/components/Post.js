import React from "react";
import { connect } from "react-redux";
import { View, Text, Image, TouchableOpacity } from "react-native";
import moment from "moment";
import * as BlogAPI from "../server/dbApi";
import Comment from "./Comment";
import Voter from "./Voter";
import { Margin } from "./Utils";
import TrashIcon from "../static/trash.png";
import CommentIcon from "../static/comment.jpg";
import EditIcon from "../static/edit.png";

class Post extends React.Component {
  state = { showComment: false };

  componentDidMount() {
    this.props.getComments(this.props.post.id);
  }

  onVote(type, contentId, value) {
    type === "post"
      ? this.props.doVotePost(contentId, value)
      : this.props.doVoteComment(contentId, value);
  }

  render() {
    return (
      <View
        style={{
          backgroundColor: "white",
          padding: 20,
          margin: 10,
          borderRadius: 10,
          borderWidth: 1
        }}
      >
        <Text style={{ fontSize: 12, color: "gray" }}>
          {moment(this.props.post.timestamp).format("LL")}
        </Text>
        <View
          style={{
            marginTop: 5,
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between"
          }}
        >
          <View>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              {this.props.post.title}
            </Text>
            <Text style={{ marginTop: 5, fontSize: 12, color: "gray" }}>
              by {this.props.post.author}
            </Text>
          </View>
        </View>

        <Text style={{ fontSize: 14, paddingTop: 10 }}>
          {this.props.post.body}
        </Text>
        <Margin />
        {this.state.showComment && this.props.post.comments &&
          this.props.post.comments.map(comment => (
            <Comment
              key={comment.id}
              comment={comment}
              post={this.props.post}
              onAddComment={this.props.onAddComment}
              onVote={(type, contentId, value) =>
                this.onVote(type, contentId, value)}
            />
          ))}
        <View
          style={{
            marginTop: 15,
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between"
          }}
        >
          <Voter
            value={this.props.post.voteScore}
            type="post"
            objectid={this.props.post.id}
            onVote={(type, contentId, value) =>
              this.onVote(type, contentId, value)}
          />
          <View
            style={{
              marginTop: 5,
              flex: 1,
              flexDirection: "row",
              justifyContent: "flex-end"
            }}
          >
            {/* Edit post*/}
            <TouchableOpacity
              style={{ marginRight: 10 }}
              onPress={() => this.props.onAddPost(this.props.post)}
            >
              <Image
                style={{
                  width: 30,
                  height: 30,
                  alignItems: "center",
                  justifyContent: "center"
                }}
                source={EditIcon}
              />
            </TouchableOpacity>
            {/* Add a comment*/}
            <TouchableOpacity
              style={{ marginRight: 10 }}
              onPress={() => this.props.onAddComment(this.props.post, null)}
            >
              <Image
                style={{
                  width: 30,
                  height: 30,
                  alignItems: "center",
                  justifyContent: "center"
                }}
                source={CommentIcon}
              >
                <Text
                  style={{ paddingBottom: 6, fontWeight: "bold" }}
                  color="#d6d6d6"
                >
                  +
                </Text>
              </Image>
            </TouchableOpacity>
            {/* Expand/Collapse comments*/}
            {this.props.post.commentCount > 0 && (
              <TouchableOpacity
                style={{ marginRight: 10 }}
                onPress={() => this.setState({showComment: !this.state.showComment})}
              >
                <Image
                  style={{
                    width: 30,
                    height: 30,
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                  source={CommentIcon}
                >
                  <Text style={{ paddingBottom: 6 }} color="#d6d6d6">
                    {this.props.post.commentCount}
                  </Text>
                </Image>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={{ marginRight: 0 }}
              onPress={() => console.log("pino")}
            >
              <Image style={{ width: 30, height: 30 }} source={TrashIcon} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getComments: postid => dispatch(BlogAPI.doGetComments(postid)),
    doVotePost: (postid, value) => dispatch(BlogAPI.doVotePost(postid, value)),
    doVoteComment: (commentid, value) =>
      dispatch(BlogAPI.doVoteComment(commentid, value))
  };
};

export default connect(undefined, mapDispatchToProps)(Post);
