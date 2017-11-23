import React from "react";
import { View, TouchableOpacity, Image, Text } from "react-native";
import EditIcon from "../static/edit.png";
import TrashIcon from "../static/trash.png";
import CommentIcon from "../static/comment.jpg";

export const Margin = () => {
  return <View style={{ height: 20, backgroundColor: "transparent" }} />;
};

export const TrashButton = (props) => {
  return (
    <TouchableOpacity
      style={{ marginRight: 0 }}
      onPress={props.onPress}
    >
      <Image style={{ width: 30, height: 30 }} source={TrashIcon} />
    </TouchableOpacity>
  );
};

export const EditButton = props => {
  return (
    <TouchableOpacity style={{ marginRight: 10 }} onPress={props.onPress}>
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
  );
};

export const CommentsButton = props => {
  return (
    <TouchableOpacity style={{ marginRight: 10 }} onPress={props.onPress}>
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
          {props.value}
        </Text>
      </Image>
    </TouchableOpacity>
  );
};

export const AddCommentButton = props => {
  return (
    <TouchableOpacity
    style={{ marginRight: 10 }}
    onPress={props.onPress}
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
      >+</Text>
    </Image>
  </TouchableOpacity>
  );
};