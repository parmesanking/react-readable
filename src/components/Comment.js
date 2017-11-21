import React from "react";
import { View, Button, Text } from "react-native";
import moment from "moment";
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
      <Text style={{ fontStyle: "italic" }}>{props.body}</Text>
      <Text>
        <Text style={{ fontSize: 10, fontStyle: "bold", color: "gray" }}>{props.author}</Text>
        <Text style={{ fontSize: 10, fontStyle: "regular", color: "gray" }}>
          {" "}
          on {moment(props.timestamp).format("LL")}
        </Text>
      </Text>
    </View>
  );
};

export default Comment;
