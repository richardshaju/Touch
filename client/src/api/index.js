import axios from 'axios';
const API = axios.create({baseURL:'http://localhost:5000'});

axios.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = 'Bearer ' + JSON.parse(localStorage.getItem('profile')).token;
  }
  return req;
});


export const fetchPosts = () => axios.get(`/posts`);
export const createPost = (newPost) => axios.post('/posts', newPost);
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags} `)
export const updatePost = (id, updatedPost) => axios.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => axios.delete(`/posts/${id}`)
export const likePost = (id) => axios.patch(`/${id}/likepost`)
export const comment = (value, id) => API.post(`posts/${id}/commentPost`, {value})
export const signin = (formData) => API.post('user/signin', formData);
export const signup = (formData) => API.post('user/signup', formData);
export const fetchPost = (id) => API.get(`posts/${id}`)