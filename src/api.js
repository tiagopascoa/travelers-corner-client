import axios from "axios";
const baseURL = `${process.env.REACT_APP_SERVER_HOSTNAME}/api`;

/* AUTH API ROUTES */

export const signup = (user) => {
    return axios.post(`${baseURL}/signup`, user);
  };
  
  export const login = (user) => {
    return axios.post(`${baseURL}/login`, user, { withCredentials: true });
  };
  export const loggedIn = () => {
    return axios.get(`${baseURL}/loggedin`, { withCredentials: true });
  };
  
  export const logout = () => {
    return axios.post(`${baseURL}/logout`, null, { withCredentials: true });
  };

/* Travel Post ROUTES */

export const uploadFile = (uploadData) => {
  return axios.post(`${baseURL}/upload`, uploadData);
};

export const getAllTravelPosts = () => {
    return axios.get(`${baseURL}/main`)
}

export const newTravelPost = (post) => {
  return axios.post(`${baseURL}/new-travel-post`, post, { withCredentials: true });
}

export const getTravelPost = (travelPostId) => {
  return axios.get(`${baseURL}/travel-posts/${travelPostId}`)
}

export const newLike = (travelPostId) => {
  return axios.post(`${baseURL}/travel-post/${travelPostId}/like`, travelPostId, { withCredentials: true });
}

export const getLikes = (travelPostId) => {
  return axios.get(`${baseURL}/travel-post/${travelPostId}/like`, { withCredentials: true });
}

export const newComment = (travelPostId) => {
  return axios.post(`${baseURL}/travel-posts/${travelPostId}/comments`);
}

/* User */

export const userArea = () => {
  return axios.get(`${baseURL}/user-area`, { withCredentials: true });
}

export const getUserProfile = (userId) => {
  return axios.get(`${baseURL}/user-profile/${userId}`);
}
