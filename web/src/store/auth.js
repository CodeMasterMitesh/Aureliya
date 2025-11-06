import { create } from 'zustand'

const initialToken = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null

export const useAuth = create((set) => ({
  user: null,
  token: initialToken,
  login({ user, token }) {
    if (token && typeof window !== 'undefined') localStorage.setItem('access_token', token)
    set({ user, token })
  },
  setUser(user){ set({ user }) },
  logout() { if (typeof window !== 'undefined') localStorage.removeItem('access_token'); set({ user: null, token: null }) }
}))
