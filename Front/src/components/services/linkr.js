import axios from "axios";

//const BASE_URL = "http://localhost:4000";
const BASE_URL = "https://linkrs.herokuapp.com";


function postLink(link, postAuth) {
  const promise = axios.post(`${BASE_URL}/timeline`, link, postAuth);
  return promise;
}

function getLink(token) {
  const header = { headers: { Authorization: `Bearer ${token}` } };
  const promise = axios.get(`${BASE_URL}/timeline`, header);
  return promise;
}
function deleteLink(linkId, postAuth) {
  const promise = axios.delete(
    `${BASE_URL}/deleteTimeline/${linkId}`,
    postAuth
  );
  return promise;
}

function updateLink(textEdited, linkId, postAuth) {
  const promise = axios.put(
    `${BASE_URL}/updateTimeline/${linkId}`,
    textEdited,
    postAuth
  );
  return promise;
}

function postComment(commentObj, postAuth) {
  const promise = axios.post(`${BASE_URL}/comment`, commentObj, postAuth);
  return promise;
}

function getCommentsCount(linkId) {
  const promise = axios.get(`${BASE_URL}/commentCount/${linkId}`);
  return promise;
}

function getComments(linkId) {
  const promise = axios.get(`${BASE_URL}/comment/${linkId}`);
  return promise;
}

function postCreat(obj) {
  const promise = axios.post(`${BASE_URL}/signup`, obj);
  return promise;
}

function postLogin(obj) {
  const promise = axios.post(`${BASE_URL}/signin`, obj);
  return promise;
}

function postDisLike(body, token) {
  const header = { headers: { Authorization: `Bearer ${token}` } };
  const promise = axios.post(`${BASE_URL}/dislike`, body, header);
  return promise;
}

function postLike(body, token) {
  const header = { headers: { Authorization: `Bearer ${token}` } };
  const promise = axios.post(`${BASE_URL}/like`, body, header);
  return promise;
}
function getUserValidation(token) {
  const header = { headers: { Authorization: `Bearer ${token}` } };
  const promise = axios.get(`${BASE_URL}/signvalid`, header);
  return promise;
}

function getTrending(token) {
  const header = { headers: { Authorization: `Bearer ${token}` } };
  const promise = axios.get(`${BASE_URL}/trending`, header);
  return promise;
}

function getLinksFilteredByHashtag(hashtag, token) {
  const header = { headers: { Authorization: `Bearer ${token}` } };
  const promise = axios.get(`${BASE_URL}/hashtag/${hashtag}`, header);
  return promise;
}

function relationateLinkWithHashtag(linkId, hashtagId, token) {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const body = {
    linkId: linkId,
    hashtagId: hashtagId,
  };
  const promise = axios.post(
    `${BASE_URL}/relationateLinkWithHashtag`,
    body,
    config
  );
  return promise;
}

function postHashtag(hashtag, token) {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const body = {
    hashtag: hashtag,
  };
  const promise = axios.post(`${BASE_URL}/hashtag`, body, config);
  return promise;
}

function getLastLinkId(token) {
  const header = { headers: { Authorization: `Bearer ${token}` } };
  const promise = axios.get(`${BASE_URL}/lastLink`, header);
  return promise;
}

function getHashtagId(hashtag, token) {
  const header = { headers: { Authorization: `Bearer ${token}` } };
  const promise = axios.get(`${BASE_URL}/oneHashtag/${hashtag}`, header);
  return promise;
}

function getLinksFilteredByUser(token, userId) {
  const header = { headers: { Authorization: `Bearer ${token}` } };
  const promise = axios.get(`${BASE_URL}/userPosts/${userId}`, header);
  return promise;
}

function getUsersFiltered(token, usernameSearched) {
  const header = { headers: { Authorization: `Bearer ${token}` } };
  const promise = axios.get(
    `${BASE_URL}/users/search/${usernameSearched}`,
    header
  );
  return promise;
}

function getUserName(token, userId) {
  const header = { headers: { Authorization: `Bearer ${token}` } };
  const promise = axios.get(`${BASE_URL}/userInfo/${userId}`, header);
  return promise;
}

function postFollow(token, id) {
  const header = { headers: { Authorization: `Bearer ${token}` } };
  const promise = axios.post(`${BASE_URL}/follow/${id}`, {}, header);
  return promise;
}

function getAllFollow(token) {
  const header = { headers: { Authorization: `Bearer ${token}` } };
  const promise = axios.get(`${BASE_URL}/follow`, header);
  return promise;
}

function getFollow(token, id) {
  const header = { headers: { Authorization: `Bearer ${token}` } };
  const promise = axios.get(`${BASE_URL}/follow/${id}`, header);
  return promise;
}

function postShare(token, body) {
  const header = { headers: { Authorization: `Bearer ${token}` } };
  const promise = axios.post(`${BASE_URL}/shares`, body, header);
  return promise;
}

function deletShare(token,id) {
  const header = { headers: { Authorization: `Bearer ${token}` } };
  const promise = axios.delete(`${BASE_URL}/shares/${id}`, header);
  return promise;
}



export {
  deletShare,
  postShare,
  getAllFollow,
  getUsersFiltered,
  getFollow,
  postFollow,
  postLike,
  postDisLike,
  postLink,
  getLink,
  deleteLink,
  updateLink,
  postComment,
  getCommentsCount,
  getComments,
  getUserValidation,
  postLogin,
  postCreat,
  getTrending,
  getLinksFilteredByHashtag,
  relationateLinkWithHashtag,
  getLastLinkId,
  getHashtagId,
  postHashtag,
  getLinksFilteredByUser,
  getUserName,
};
