import React from "react";
import { View, Button } from "react-native";
//

const Category = props => {
  return (
    <View style={{ marginLeft: 10 }}>
      <Button title={props.title}  color={props.selected ? '#841584':'red'} onPress={() => props.onCategorySelect() } />    
    </View>
  );
};

export default Category;
