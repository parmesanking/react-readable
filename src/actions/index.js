export const NEW_POST = 'NEW_POST'


export const doPost = ({ post }) => {
    return {
      type: NEW_POST,
      post
    }
  }
  