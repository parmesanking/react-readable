import * as BlogAPI from "../server/dbApi";


export const actionTypes = {
  NEWPOST: "NEWPOST", 
  POSTLIST: "POSTLIST", 
  CATEGORYLIST: "CATEGORYLIST"

}


export const getCategories = (categories) => {
  debugger
  return {
    type: actionTypes.CATEGORYLIST,
    categories: categories
  }
}

export const getPosts = (posts) => {
  return {
    type: actionTypes.POSTLIST,
    posts: posts
  }
}



/*
export const doPost = ({ post }) => {
    return {
      type: NEW_POST,
      post
    }
  }
*/

