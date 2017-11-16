export const actions = {
    NEW_POST_REQUEST: "NEW_POST_REQUEST"
}


const post =  (state = {}, action) => {
    switch (action.type) {
      case actions.NEW_POST_REQUEST :
        const { recipe } = action
  
        return {
          ...state,
          [recipe.label]: recipe,
        }
      default :
        return state
    }
  }

export default post