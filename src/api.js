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

export const newLike = (post) => {
  return axios.put(`${baseURL}/travel-posts/${post.id}`, post, { withCredentials: true });
}

export const getLikes = () => {
  return axios.get(`${baseURL}/likes`, { withCredentials: true });
}

/* User */

export const userArea = () => {
  return axios.get(`${baseURL}/user-area`, { withCredentials: true });
}

export const getUserProfile = (userId) => {
  return axios.get(`${baseURL}/user-profile/${userId}`);
}
