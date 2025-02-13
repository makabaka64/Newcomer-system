<script setup>
import { cn } from '../utils'

// 定义组件的 props
defineProps({
  class: String, // 可选字符串类型
  reverse: Boolean, // 是否反转动画
  pauseOnHover: Boolean, // 悬停时是否暂停动画
  vertical: Boolean, // 是否为垂直方向动画
  repeat: {
    // 动画重复次数
    type: Number,
    default: 4
  }
})
</script>

<template>
  <div
    :class="
      cn(
        'group flex overflow-hidden p-2 [--duration:40s] [--gap:1rem] [gap:var(--gap)]',
        vertical ? 'flex-col' : 'flex-row'
      )
    "
  >
    <div
      v-for="index in repeat"
      :key="index"
      :class="
        cn(
          'flex shrink-0 justify-around [gap:var(--gap)]',
          vertical
            ? 'animate-marquee-vertical flex-col'
            : 'animate-marquee flex-row',
          pauseOnHover ? 'group-hover:[animation-play-state:paused]' : ''
        )
      "
      :style="{
        animationDirection: reverse ? 'reverse' : 'normal'
      }"
    >
      <slot />
    </div>
  </div>
</template>

<style scoped>
/* 横向滚动动画 */
.animate-marquee {
  animation: marquee var(--duration) linear infinite;
  animation-direction: reverse;
}

/* 垂直滚动动画 */
.animate-marquee-vertical {
  animation: marquee-vertical var(--duration) linear infinite;
}

/* 横向滚动动画关键帧 */
@keyframes marquee {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(calc(-100% - var(--gap)));
  }
}

/* 垂直滚动动画关键帧 */
@keyframes marquee-vertical {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(calc(-100% - var(--gap)));
  }
}
</style>
