import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { View, Text } from "react-native";
import moment from "moment";
import * as BlogAPI from "../server/dbApi";
import Comment from "./Comment";
import Voter from "./Voter";
import { Margin } from "./Utils";

import {
  AddCommentButton,
  CommentsButton,
  EditButton,
  TrashButton
} from "./Utils";
class Post extends React.Component {
  state = { showComment: false };


  /*
  componentDidMount(){
   this.props.getComments(this.props.post.id);
  }

  componentWillReceiveProps(nextProps){
    debugger
    if (this.props.post.id !== nextProps.post.id ){
      this.props.getComments(nextProps.post.id);
    }
  
  }*/

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
              {this.props.compactView ? (
                <Link to={`/${this.props.post.category}/${this.props.post.id}`}>
                  {this.props.post.title}
                </Link>
              ) : (
                this.props.post.title
              )}
            </Text>

            <Text style={{ marginTop: 5, fontSize: 12, color: "gray" }}>
              by {this.props.post.author} - tagged as [{this.props.post.category}]
            </Text>
          </View>
        </View>
        {!this.props.compactView && (
          <Text style={{ fontSize: 14, paddingTop: 10 }}>
            {this.props.post.body}
          </Text>
        )}
        <Margin />
        {this.state.showComment &&
          this.props.post.comments &&
          this.props.post.comments.map(comment => (
            <Comment
              key={comment.id}
              comment={comment}
              post={this.props.post}
              onAddComment={this.props.onAddComment}
              onVote={(type, contentId, value) =>
                this.onVote(type, contentId, value)}
              onDelete={this.props.onDelete}
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
            <EditButton onPress={() => this.props.onAddPost(this.props.post)} />
            {/* Add a comment*/}
            <AddCommentButton
              onPress={() => this.props.onAddComment(this.props.post, null)}
            />
            {/* Expand/Collapse comments*/}
            {this.props.post.commentCount > 0 && (
              <CommentsButton
                onPress={() =>
                  this.setState({ showComment: !this.state.showComment })}
                value={this.props.post.commentCount}
              />
            )}
            {/* DeletePost*/}
            <TrashButton
              onPress={() => this.props.onDelete("post", this.props.post)}
            />
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
