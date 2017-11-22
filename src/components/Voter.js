import React from "react";
import { View, TouchableOpacity, Text, Image } from "react-native";
import VoteUpIcon from '../static/voteup.png'
import VoteDownIcon from '../static/votedown.png'

const Voter = props => {
  return (
    <View>
    <View
      style={{
        flex: 1,
        flexDirection: "row", 
        alignSelf: 'flex-end',

      }}
    >
    <TouchableOpacity style={{marginRight:0}} onPress={() => props.onVote(props.type, props.objectid, -1)}>
    <Image style={{ width: 30, height: 30 }} source={VoteDownIcon} />
  </TouchableOpacity>
      <Text style={{ paddingTop: 5, paddingBottom: 5 }}>{props.value}</Text>
      <TouchableOpacity style={{marginRight:0}} onPress={() => props.onVote(props.type, props.objectid, 1)}>
      <Image style={{ width: 30, height: 30 }} source={VoteUpIcon} />
    </TouchableOpacity>
      
   
    </View>
    </View>
  );
};

export default Voter;
