import * as acts from "../actions";

const api = "http://localhost:3001";

//Unique toke generation
let token = localStorage.token;
if (!token)
  //if (true)
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
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ option: vote > 0 ? "upVote" : "downVote" })
  })
    .then(res => res.json())
    .then(post => dispatch(acts.getPost(post)));

export const doVoteComment = (commentid, vote) => dispatch =>
  fetch(`${api}/comments/${commentid}`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ option: vote > 0 ? "upVote" : "downVote" })
  })
    .then(res => res.json())
    .then(comment => dispatch(acts.getComment(comment)));

export const doAddPost = post => dispatch =>
  fetch(`${api}/posts`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(post)
  })
    .then(res => res.json())
    .then(post => dispatch(acts.getPost(post)));

export const doAddComment = comment => dispatch =>
  fetch(`${api}/comments`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(comment)
  })
    .then(res => res.json())
    .then(comment => dispatch(acts.getComment(comment)));

export const doEditPost = post => dispatch =>
  fetch(`${api}/posts/${post.id}`, {
    method: "PUT",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      timestamp: post.timestamp,
      title: post.title,
      body: post.body
    })
  })
    .then(res => res.json())
    .then(post => dispatch(acts.getPost(post)));

export const doEditComment = comment => dispatch =>
  fetch(`${api}/comments/${comment.id}`, {
    method: "PUT",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ timestamp: comment.timestamp, body: comment.body })
  })
    .then(res => res.json())
    .then(comment => dispatch(acts.getComment(comment)));

export const doDeletePost = post => dispatch =>
  fetch(`${api}/posts/${post.id}`, {
    method: "DELETE",
    headers: {
      ...headers
    }})
    .then(res => res.json())
    .then(post => dispatch(acts.getPost(post)));

export const doDeleteComment = comment => dispatch =>
  fetch(`${api}/comments/${comment.id}`, {
    method: "DELETE",
    headers: {
      ...headers
    }})
    .then(res => res.json())
    .then(comment => dispatch(acts.getComment(comment)));
