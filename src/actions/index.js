
export const actionTypes = {
  POST: "POST", 
  POSTLIST: "POSTLIST", 
  CATEGORYLIST: "CATEGORYLIST",
  COMMENTS: "COMMENTS"

}


export const getCategories = (categories) => {
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

export const getComments = (postid, comments) => {
    return {
      type: actionTypes.COMMENTS,
      postid: postid,
      comments: comments
    }
  }

  export const getPost = (post) => {
    return {
      type: actionTypes.POST,
      post: post
    }
  }
