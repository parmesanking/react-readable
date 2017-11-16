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

export const doGetPosts = () => dispatch =>
  fetch(`${api}/posts`, { headers })
    .then(res => res.json())
    .then(posts => dispatch(acts.getPosts(posts)));
