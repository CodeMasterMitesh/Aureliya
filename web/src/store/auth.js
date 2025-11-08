import { create } from 'zustand'
import api, { fetchCsrf } from '../../src/api/axios'
import Router from 'next/router'

const getInitialState = () => ({ user: null, token: null, ready: false })

export const useAuth = create((set, get) => ({
  ...getInitialState(),
  login({ user }) { set({ user, token: null, ready: true }) },
  setUser(user) { set({ user }) },
  setReady(flag) { set({ ready: !!flag }) },
  async logout() {
    try {
      await fetchCsrf()
      await api.post('/auth/logout')
    } catch (e) { /* ignore */ }
    set({ user: null, token: null, ready: true })
    try {
      if (typeof window !== 'undefined') {
        // Hard redirect to clear any client state
        window.location.href = '/login'
      } else {
        Router.replace('/login')
      }
    } catch (_) {}
  }
}))
