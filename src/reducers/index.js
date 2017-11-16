import { actionTypes } from '../actions/'

const post =  (state = {}, action) => {
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
          
      default :
        return state
    }
  }

export default post