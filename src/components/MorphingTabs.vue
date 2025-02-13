<script setup>
import { ref } from 'vue'
import { cn } from '../utils'

// 直接使用 props，而不需要定义接口
const props = defineProps({
  margin: {
    type: Number,
    default: 20
  },
  blurStdDeviation: {
    type: Number,
    default: 6
  },
  tabs: {
    type: Array,
    required: true
  }
})
const emit = defineEmits('update:activeTab') // 定义事件

const activeTab = ref(props.tabs[0]) // 默认选中第一个标签

const changeTab = (tab) => {
  activeTab.value = tab
  emit('update:activeTab', tab) // 触发事件，更新父组件中的 activeTab
}
</script>
<template>
  <div
    v-if="props.tabs.length"
    :class="cn('relative', props.class)"
    style="filter: url('#exclusionTabsGoo')"
  >
    <button
      v-for="tab in props.tabs"
      :key="tab"
      :class="
        cn('px-4 py-2 bg-primary text-background transition-all duration-500')
      "
      :style="{
        margin: `0 ${activeTab === tab ? props.margin : 0}px`
      }"
      @click="changeTab(tab)"
    >
      {{ tab }}
    </button>

    <div class="absolute w-full">
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
        <defs>
          <filter
            id="exclusionTabsGoo"
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
            color-interpolation-filters="sRGB"
          >
            <feGaussianBlur
              in="SourceGraphic"
              :stdDeviation="blurStdDeviation"
              result="blur"
            ></feGaussianBlur>
            <feColorMatrix
              in="blur"
              type="matrix"
              values="
              1 0 0 0 0  
              0 1 0 0 0  
              0 0 1 0 0  
              0 0 0 36 -12"
              result="goo"
            ></feColorMatrix>
            <feComposite
              in="SourceGraphic"
              in2="goo"
              operator="atop"
            ></feComposite>
          </filter>
        </defs>
      </svg>
    </div>
  </div>
</template>
<style lang="scss" scoped>
button {
  background-color: black; /* Default black background */
  color: white; /* White text */
  // border: 1px solid white; /* White border */
}

button:hover {
  background-color: #333; /* Slightly lighter background on hover */
}
</style>
