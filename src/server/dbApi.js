import * as acts from "../actions";

const api = "http://localhost:3001";

//Unique toke generation
let token = localStorage.token;
if (!token)
  token = localStorage.token = Math.random()
    .toString(36)
    .substr(-8);

const headers = {
  Accept: "application/json",
  Authorization: token
};

export const doGetCategories = () => dispatch =>
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(cat => dispatch(acts.getCategories(cat.categories)));

export const doGetPosts = category => dispatch =>
  fetch(category ? `${api}/${category}/posts` : `${api}/posts`, { headers })
    .then(res => res.json())
    .then(posts => dispatch(acts.getPosts(posts)));

export const doGetComments = postid => dispatch =>
  fetch(`${api}/posts/${postid}/comments`, { headers })
    .then(res => res.json())
    .then(comments => dispatch(acts.getComments(postid, comments)));

export const doVotePost = (postid, vote) => dispatch =>
  fetch(`${api}/posts/${postid}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({"option": vote > 0 ? 'upVote' : 'downVote' })
  })
    .then(res => res.json())
    .then(post => dispatch(acts.getPost(post)));
