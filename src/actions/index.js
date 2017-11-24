
export const actionTypes = {
  POSTDETAIL: "POSTDETAIL", 
  POST: "POST", 
  COMMENT: "COMMENT", 
  POSTLIST: "POSTLIST", 
  CATEGORYLIST: "CATEGORYLIST",
  COMMENTS: "COMMENTS", 
  SORT: "SORT"

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
  export const getComment = (comment) => {
    return {
      type: actionTypes.COMMENT,
      comment: comment
    }
  }

  export const sortPost = (sortby, sortorder) => {
    return {
      type: actionTypes.SORT,
      sort: {by: sortby, order: sortorder}
    }
  }

  export const showPost = (post) => {
    return {
      type: actionTypes.POSTDETAIL,
      post: post
    }
  }