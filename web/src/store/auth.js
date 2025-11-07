import { create } from 'zustand'

const getInitialState = () => {
  if (typeof window === 'undefined') return { user: null, token: null }
  const token = localStorage.getItem('access_token')
  const sessionUser = sessionStorage.getItem('user_data')
  return {
    user: sessionUser ? JSON.parse(sessionUser) : null,
    token
  }
}

export const useAuth = create((set) => ({
  ...getInitialState(),
  login({ user, token }) {
    if (typeof window !== 'undefined') {
      if (token) localStorage.setItem('access_token', token)
      if (user) sessionStorage.setItem('user_data', JSON.stringify(user))
    }
    set({ user, token })
  },
  setUser(user) { 
    if (typeof window !== 'undefined' && user) {
      sessionStorage.setItem('user_data', JSON.stringify(user))
    }
    set({ user }) 
  },
  logout() { 
    if (typeof window !== 'undefined') {
      localStorage.removeItem('access_token')
      sessionStorage.removeItem('user_data')
    }
    set({ user: null, token: null }) 
  }
}))
