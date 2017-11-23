import React from "react";
import { View } from "react-native";
import Category from './Category'

const CategoryList = props => {
  return (
    <View style={{ flex: 1, flexDirection: "row" }}>
      {props.categories.map(cat => (
        <Category
          key={cat.path}
          {...cat}
          selected={props.value === cat.path}
          onCategorySelect={props.onCategorySelect}
        />
      ))}
    </View>
  );
};

export default CategoryList;
