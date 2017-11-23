import { actionTypes } from "../actions/";
const initialState = {
  categories: [],
  posts: []
};

const post = (state = initialState, action) => {
  let posts = [];
  switch (action.type) {
    case actionTypes.POSTLIST:
      return {
        ...state,
        posts: action.posts
          ? action.posts.filter(p => !p.deleted).sort((a, b) => a.timestamp < b.timestamp)
          : []
      };
    case actionTypes.CATEGORYLIST:
      return {
        ...state,
        categories: action.categories ? action.categories : []
      };
    case actionTypes.COMMENTS:
      posts = state.posts.map(p => {
        if (p.id === action.postid) {
          p.comments = action.comments
            ? action.comments.filter(c => !c.deleted && !c.parentDeleted).sort((a, b) => a.timestamp < b.timestamp)
            : [];
        }
        return p;
      });
      return {
        ...state,
        posts: posts.filter(p => !p.deleted).sort((a, b) => a.timestamp < b.timestamp)
      };
    case actionTypes.POST: //Adding or updating the post
      posts = state.posts.slice(0);
      let postIx = posts.findIndex(p => p.id === action.post.id);
      if (postIx >= 0) {
        posts[postIx].author = action.post.author;
        posts[postIx].title = action.post.title;
        posts[postIx].body = action.post.body;
        posts[postIx].voteScore = action.post.voteScore;
        posts[postIx].deleted = action.post.deleted;
        posts[postIx].timestamp = action.post.timestamp;
      } else {
        posts.push(action.post);
      }
      return {
        ...state,
        posts: posts.filter(p => !p.deleted).sort((a, b) => a.timestamp < b.timestamp)
      };
    case actionTypes.COMMENT: //Adding or updating the comment
      posts = state.posts.slice(0);
      postIx = posts.findIndex(p => p.id === action.comment.parentId);
      if (postIx >= 0) {
        let comments = posts[postIx].comments.slice(0);
        let commentIx = comments.findIndex(c => c.id === action.comment.id);
        if (commentIx >= 0) {
          comments[commentIx].author = action.comment.author;
          comments[commentIx].body = action.comment.body;
          comments[commentIx].voteScore = action.comment.voteScore;
          comments[commentIx].deleted = action.comment.deleted;
          comments[commentIx].parentDeleted = action.comment.parentDeleted;
          comments[commentIx].timestamp = action.comment.timestamp;
        } else {
          comments.push(action.comment);
        }
        
        posts[postIx].comments = comments.filter(c => !c.deleted && !c.parentDeleted).sort(
          (a, b) => a.timestamp < b.timestamp
        );
        posts[postIx].commentCount = posts[postIx].comments.length
      } else {
        console.log("we've got an orphan comment!");
      }

      return {
        ...state,
        posts: posts.filter(p => !p.deleted).sort((a, b) => a.timestamp < b.timestamp)
      };
    default:
      return state;
  }
};

export default post;
