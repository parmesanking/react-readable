import React from "react";
import { View, Text } from "react-native";
import Voter from "./Voter";
import moment from "moment";
import { EditButton, TrashButton } from "./Utils";

const Comment = props => {
  return (
    <View
      style={{
        padding: 20,
        margin: 10,
        backgroundColor: "#d3d3d3",
        borderRadius: 10,
        borderWidth: 1
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between"
        }}
      >
      <View>
        <Text style={{ fontStyle: "italic" }}>{props.comment.body}</Text>
        <Text>
          <Text style={{ fontSize: 10, fontStyle: "bold", color: "gray" }}>
            {props.comment.author}
          </Text>
          <Text style={{ fontSize: 10, fontStyle: "regular", color: "gray" }}>
            {" "}
            on {moment(props.comment.timestamp).format("LL")}
          </Text>
        </Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "flex-end"
          }}
        >
          {/*Edit comment*/}
          <EditButton width="10" height= "10"
            onPress={() =>
              props.onAddComment(props.post, {
                ...props.comment,
                parent: props.post
              })}
          />
          {/* DeletePost*/}
          <TrashButton onPress={() => props.onDelete('comment', props.comment)}/>
        </View>
      </View>
      <Voter
        value={props.comment.voteScore}
        onVote={props.onVote}
        type="comment"
        objectid={props.comment.id}
      />
    </View>
  );
};

export default Comment;
