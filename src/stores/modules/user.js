import { defineStore } from 'pinia'
import { userGetInfoService } from '@/api/user'
import { ref } from 'vue'
// 用户模块  new-user 唯一标识，用来作区分
export const useUserStore = defineStore(
  'new-user',
  () => {
    const token = ref('') // 定义 token
    const setToken = (t) => (token.value = t) // 设置 token

    const user = ref({})
    const getUser = async () => {
      const res = await userGetInfoService() // 请求获取数据
      user.value = res.data.data
    }

    const setUser = (obj) => (user.value = obj)

    return { token, setToken, getUser, user, setUser }
  },
  {
    persist: true // 持久化
  }
)
