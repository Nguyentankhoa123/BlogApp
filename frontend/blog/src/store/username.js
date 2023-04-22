import { defineStore } from 'pinia'

export const useUserName = defineStore({
  id: 'store',
  state: () => ({
    username: '',
    imageuser: '',
  }),
  actions: {
    setUsername(username) {
      this.username = username
    },
    setImageUser(imageuser) {
      this.imageuser = imageuser
    },
  },
})
