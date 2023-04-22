import { defineStore } from 'pinia'

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    // user: JSON.parse(localStorage.getItem('user')) || null,
    username: localStorage.getItem('username') || null,
    profilePic: localStorage.getItem('profilePic') || null,
  }),
  getters: {
    isLoggedIn: (state) => state.username,
    isImage: (state) => state.profilePic,
    name: (state) => (state.username ? state.username : null),
    imageUser: (state) => (state.profilePic ? state.profilePic : null),
  },
})
