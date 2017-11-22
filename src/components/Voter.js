import React from "react";
import { View, Button, Text } from "react-native";




const Voter = props => {
  return (
    <View
      style={{
        marginLeft: 10,
        flex: 1,
        flexDirection: "row"
      }}
    >
      <Button title="-" onPress={() => props.onVote(-1)}/>
      <Text>{props.value}</Text>
      <Button title="+" onPress={() => props.onVote(1)} />
    </View>
  );
};

export default Voter;
