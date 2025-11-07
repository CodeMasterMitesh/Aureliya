import { create } from 'zustand'

const getInitialState = () => ({ user: null, token: null })

export const useAuth = create((set) => ({
  ...getInitialState(),
  login({ user }) { set({ user, token: null }) },
  setUser(user) { set({ user }) },
  logout() { set({ user: null, token: null }) }
}))
