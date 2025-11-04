import api from './axios'

export async function fetchBlogs() {
  const res = await api.get('/blogs')
  return res.data
}

export async function fetchBlog(slug) {
  const res = await api.get(`/blogs/${slug}`)
  return res.data
}
