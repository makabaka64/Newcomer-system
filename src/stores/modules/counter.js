import { defineStore } from 'pinia'
import { ref } from 'vue'
// 定义一个 store
export const useCountStore = defineStore('new-count', () => {
  const count = ref(100) // 定义 token
  const add = (t) => (count.value += t) // 设置 token

  return { count, add }
})
