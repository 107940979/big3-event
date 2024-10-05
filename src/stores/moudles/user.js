import { defineStore } from 'pinia'
import { ref } from 'vue'
import { userGetUserinfo } from '@/api/user'
// 用户模块token，setToken，removeToken
export const useUserStore = defineStore(
  'big-user',
  () => {
    const token = ref('')
    const setToken = (newToken) => {
      token.value = newToken
    }
    const removeToken = () => {
      token.value = ''
    }
    const user = ref({})
    // 获取个人信息函数
    const getUser = async () => {
      const res = await userGetUserinfo()
      user.value = res.data.data
    }
    const setUser = (obj) => {
      user.value = obj
    }
    return {
      token,
      setToken,
      removeToken,
      user,
      getUser,
      setUser
    }
  },
  {
    persist: true
  }
)
