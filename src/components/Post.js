import React from "react";
import { connect } from 'react-redux';
import { View, Text } from "react-native";
import moment from 'moment'
import * as BlogAPI from "../server/dbApi";
import Comment from './Comment'
import Voter from './Voter'

class Post extends React.Component {
  componentDidMount(){
    this.props.getComments(this.props.id)
  }
  onVote(value){
    debugger
    this.props.doVote(this.props.id, value)

  }

  render (){
  return (
    <View
      style={{
        backgroundColor: "white",
        padding: 20,
        margin: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "lightBlue"
      }}
    >
     <Text style={{ fontSize: 12, color: 'gray' }}>{moment(this.props.timestamp).format('LL')}</Text>
      <View
        style={{
        marginTop:5,
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between"
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>{this.props.title}</Text>
        <Voter value={this.props.voteScore} onVote={(value) => this.onVote(value)}/>
      </View>
      <Text style={{ fontSize: 14, paddingTop: 10 }}>{this.props.body}</Text>

      {this.props.comments && this.props.comments.map(comment => <Comment key={comment.id} {...comment}/>)}
    </View>
      )
    }
}

const mapStateToProps = () => {
};

const mapDispatchToProps = dispatch => {

  return {
    getComments: (postid) => dispatch(BlogAPI.doGetComments(postid)),
    doVote: (postid, value) => dispatch(BlogAPI.doVotePost(postid, value))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
