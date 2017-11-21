import React from "react";
import { View, Button, Text } from "react-native";
import * as BlogAPI from "../server/dbApi";



const Voter = props => {
  return (
    <View
      style={{
        marginLeft: 10,
        flex: 1,
        flexDirection: "row",
        "marginLeft": "auto"
      }}
    >
      <Button title="-" onPress={() => props.onVote(-1)}/>
      <Text>{props.value}</Text>
      <Button title="+" onPress={() => props.onVote(1)} />
    </View>
  );
};

export default Voter;
