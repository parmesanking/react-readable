import { actionTypes } from '../actions/'
const initialState={
  categories: [],
  posts: [],
}

const post =  (state = initialState, action) => {
    let posts = []
    switch (action.type) {
      case actionTypes.POSTLIST :
        return {
          ...state,
          posts: action.posts ? action.posts.sort((a,b) => a.timestamp < b.timestamp) : []
        }
      case actionTypes.CATEGORYLIST :
        return {
          ...state,
          categories: action.categories ? action.categories : []
        }
      case actionTypes.COMMENTS :
        posts = state.posts.map(p => {
          if (p.id === action.postid){
            p.comments = action.comments ? action.comments.sort((a,b) => a.timestamp < b.timestamp) : []
          }
          return p
        }
        )
        return {
          ...state,
          posts: posts.sort((a,b) => a.timestamp < b.timestamp)
        }  
      case actionTypes.POST :   //Adding or updating the post
      posts = state.posts.slice(0)
      let postIx = posts.findIndex(p => p.id === action.post.id)
      if (postIx >= 0){
        posts[postIx].voteScore = action.post.voteScore
      }else{
        posts.push(action.post)
      }
      return {
        ...state,
        posts: posts.sort((a,b) => a.timestamp < b.timestamp)
      }
      default :
        return state  
    }
  }

 

export default post