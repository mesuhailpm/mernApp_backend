import axios from 'axios'

const API = axios.create({baseURL:'http://localhost:3001'})
const token = `${JSON.parse(localStorage.getItem('token'))}`
const headers = { 'Authorization': `Bearer ${token}` };



//posts
export const fetchPosts =()=> API.get('/posts',null,{headers:headers});
export const createPost = (newPost) => API.post('/post',newPost,{headers:headers})
export const updatePost = (id,post)=>API.patch(`/posts/${id}/`,post,{headers:headers})
export const deletePost = (id)=> API.delete(`posts/${id}`,{headers:headers})
export const likePost = (id)=> API.patch(`posts/${id}/likepost`,null,{headers: headers})

//auths

export const signUp = (credentials)=>API.post('/user/signup',credentials)
export const signIn = (credentials)=>API.post('/user/signin',credentials)
export const generateToken =(credentials)=>API.post('/user/token',credentials)
