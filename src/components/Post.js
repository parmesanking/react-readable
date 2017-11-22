import React from "react";
import { connect } from "react-redux";
import { View, Text, Image, TouchableOpacity } from "react-native";
import moment from "moment";
import * as BlogAPI from "../server/dbApi";
import Comment from "./Comment";
import Voter from "./Voter";
import {Margin} from "./Utils";
import TrashIcon from "../static/trash.png";
import CommentIcon from "../static/comment.jpg";

class Post extends React.Component {
  componentDidMount() {
    this.props.getComments(this.props.id);
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
          {moment(this.props.timestamp).format("LL")}
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
              {this.props.title}
            </Text>
            <Text style={{ marginTop: 5, fontSize: 12, color: "gray" }}>
              by {this.props.author}
            </Text>
          </View>
        </View>

        <Text style={{ fontSize: 14, paddingTop: 10 }}>{this.props.body}</Text>
<Margin />
        {this.props.comments &&
          this.props.comments.map(comment => (
            <Comment
              key={comment.id}
              {...comment}
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
            value={this.props.voteScore}
            type="post"
            objectid={this.props.id}
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
          {/* Add a comment*/}
          <TouchableOpacity
          style={{ marginRight: 10 }}
          onPress={() => console.log("comment")}
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
          
            <Text style={{ paddingBottom: 6 , fontWeight:'bold'}} color="#d6d6d6">+</Text>
          
          </Image>
        </TouchableOpacity>
          {/* Expand/Collapse comments*/}
          {  this.props.commentCount > 0 &&
            <TouchableOpacity
              style={{ marginRight: 10 }}
              onPress={() => console.log("comment")}
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
                  {this.props.commentCount}
                </Text>
              
              </Image>
            </TouchableOpacity>
          }
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
