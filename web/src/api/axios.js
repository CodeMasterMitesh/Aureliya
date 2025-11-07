import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || '/api',
  withCredentials: true, // Enable credentials for session support
})

instance.interceptors.request.use((config)=>{
  if (typeof window !== 'undefined'){
    const token = localStorage.getItem('access_token')
    if (token) config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default instance
