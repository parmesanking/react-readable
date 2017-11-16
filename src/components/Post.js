import React from 'react';
import { Text } from 'react-native';

const Post = props => {
    return (
      <Text>{props.post.title}</Text>
    );
  };
  
  export default Post;
  