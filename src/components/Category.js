import React from "react";
import { View, Button } from "react-native";
//

const Category = props => {
  return (
    <View style={{ marginRight: 10 }}>
      <Button title={props.name}  color={props.selected ? '#841584':'red'} onPress={() => props.onCategorySelect(props.selected ? '' : props.path) } />    
    </View>
  );
};

export default Category;
