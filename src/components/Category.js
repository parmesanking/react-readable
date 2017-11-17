import React from "react";
import { View, Button } from "react-native";

const Category = props => {
  return (
    <View style={{ marginLeft: 10 }}>
      <Button title={props.title} />
    </View>
  );
};

export default Category;
