import { actionTypes } from '../actions/'
const initialState={
  categories: [],
  posts: [],
}

const post =  (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.POSTLIST :
        return {
          ...state,
          posts: action.posts ? action.posts : []
        }
      case actionTypes.CATEGORYLIST :
        return {
          ...state,
          categories: action.categories ? action.categories : []
        }
      case actionTypes.COMMENTS :
        let posts = state.posts.map(p => {
          if (p.id === action.postid){
            p.comments = action.comments ? action.comments.sort((a,b) => a.timestamp < b.timestamp) : []
          }
          return p
        }
        )
        return {
          ...state,
          posts: posts
        }    
      default :
        return state  
    }
  }

export default post