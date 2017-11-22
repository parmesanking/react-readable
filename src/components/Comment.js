import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import Voter from './Voter';
import moment from "moment";
import EditIcon from '../static/edit.png'
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
      <Text style={{ fontStyle: "italic" }}>{props.comment.body}</Text>
      <Text>
        <Text style={{ fontSize: 10, fontStyle: "bold", color: "gray" }}>{props.comment.author}</Text>
        <Text style={{ fontSize: 10, fontStyle: "regular", color: "gray" }}>
          {" "}
          on {moment(props.comment.timestamp).format("LL")}
        </Text>
      </Text>
     {/*Edit comment*/}
      <TouchableOpacity
          style={{ marginRight: 10 }}
          onPress={() => props.onAddComment( props.post , {...props.comment, parent: props.post } )}
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

      <Voter value={props.comment.voteScore} onVote={ props.comment.onVote } type="comment" objectid={props.comment.id}/>
    </View>
  );
};

export default Comment;
