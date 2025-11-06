import api from './axios'

export async function fetchBlogs(){
  const { data } = await api.get('/blogs')
  return data
}
