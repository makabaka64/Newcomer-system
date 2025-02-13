<script setup>
import MarqueeVue from '@/components/MarqueeVue.vue'
import ReviewCard from '@/components/ReviewCard.vue'
import { ElMessage } from 'element-plus'
import { ref, onMounted } from 'vue'
import { userGetInterviewService } from '@/api/user'
// Reviews data
const reviews = [
  {
    name: 'Jack',

    body: '我要加入GGG！'
  },
  {
    name: 'Jill',

    body: '哈哈哈哈哈哈哈哈哈哈'
  },
  {
    name: 'John',

    body: '欢迎加入移动应用开发实验室！'
  },
  {
    name: '哈哈哈',

    body: "I'm at a loss for words. This is amazing. I love it."
  },
  {
    name: '你好',

    body: "I'm at a loss for words. This is amazing. I love it."
  },
  {
    name: 'James',

    body: "I'm at a loss for words. This is amazing. I love it."
  }
]
const interviewData = ref(null)
const fetchMyInterviewStatus = async () => {
  try {
    const res = await userGetInterviewService()
    if (res.data.status === 0) {
      interviewData.value = { ...interviewData.value, ...res.data.data }
    } else {
      ElMessage.error(res.data.message || '查询失败')
    }
  } catch (error) {
    ElMessage.error(error.message || '查询失败')
  }
}

onMounted(() => {
  fetchMyInterviewStatus()
})

// Split reviews into two rows
const firstRow = ref(reviews.slice(0, reviews.length / 2))
const secondRow = ref(reviews.slice(reviews.length / 2))
</script>
<template>
  <div class="list">
    <div class="user-interview-status">
      <h1>面试信息</h1>
      <el-card v-if="interviewData">
        <div class="progress-steps">
          <!-- 一面 -->
          <div
            class="step"
            :class="{
              active: interviewData.first_interview === '通过',
              failed: interviewData.first_interview === '未通过'
            }"
          >
            <span class="circle">
              <span v-if="interviewData.first_interview === '通过'">✔️</span>
              <span v-if="interviewData.first_interview === '未通过'">❌</span>
              <span v-if="interviewData.first_interview === '待面试'">1</span>
            </span>
            <p>一面</p>
          </div>

          <!-- 二面 -->
          <div
            class="step"
            :class="{
              active: interviewData.second_interview === '通过',
              failed: interviewData.second_interview === '未通过'
            }"
          >
            <span class="circle">
              <span v-if="interviewData.second_interview === '通过'">✔️</span>
              <span v-if="interviewData.second_interview === '未通过'">❌</span>
              <span v-if="interviewData.second_interview === '待面试'">2</span>
            </span>
            <p>二面</p>
          </div>

          <!-- 三面 -->
          <div
            class="step"
            :class="{
              active: interviewData.third_interview === '通过',
              failed: interviewData.third_interview === '未通过'
            }"
          >
            <span class="circle">
              <span v-if="interviewData.third_interview === '通过'">✔️</span>
              <span v-if="interviewData.third_interview === '未通过'">❌</span>
              <span v-if="interviewData.third_interview === '待面试'">3</span>
            </span>
            <p>三面</p>
          </div>

          <!-- 最终结果 -->
          <div
            class="step"
            :class="{
              active: interviewData.final_result === '通过',
              failed: interviewData.final_result === '未通过'
            }"
          >
            <span class="circle">
              <span v-if="interviewData.final_result === '通过'">✔️</span>
              <span v-if="interviewData.final_result === '未通过'">❌</span>
              <span v-if="interviewData.final_result === '待定'">4</span>
            </span>
            <p>最终结果</p>
          </div>
        </div>
      </el-card>
      <el-empty v-else description="暂无面试信息"></el-empty>
    </div>

    <div>
      <h1>学习资料</h1>
      <ul>
        <li>C语言书籍:《C Primer Plus》</li>
        <li>C语言课程: B站翁凯C语言、鹏哥C语言等等。</li>
        <li>编译软件: VS、Vscode、DevC++</li>
        <li>练习题: 洛谷 https://www.luogu.com.cn/</li>
      </ul>
    </div>
    <div
      class="relative flex h-[300px] w-full flex-col items-center justify-center overflow-hidden rounded-2xl border bg-gray-100 md:shadow-xl"
    >
      <!-- First Marquee -->
      <MarqueeVue pause-on-hover class="[--duration:20s]">
        <ReviewCard
          v-for="review in firstRow"
          :key="review.username"
          :name="review.name"
          :body="review.body"
        />
      </MarqueeVue>

      <!-- Second Marquee (reverse) -->
      <MarqueeVue reverse pause-on-hover class="[--duration:20s]">
        <ReviewCard
          v-for="review in secondRow"
          :key="review.username"
          :name="review.name"
          :body="review.body"
        />
      </MarqueeVue>

      <!-- Left Gradient -->
      <div
        class="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"
      ></div>

      <!-- Right Gradient -->
      <div
        class="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"
      ></div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
body {
  font-family: 'Arial', sans-serif;
  background-color: #eee;
  color: #333;
  line-height: 1.6;
  margin: 0;
  padding: 20px;
}

.list {
  width: 80%;
  margin: auto;
  background: #eee;
  border-radius: 12px;
  overflow: hidden;
  padding: 20px;
}

h1 {
  color: #2c3e50;
  font-size: 24px;
  margin-bottom: 16px;
  border-bottom: 2px solid #2ecc71;
  padding-bottom: 5px;
}
.relative {
  margin-top: 15px;
  border-radius: 1rem; /* More rounded border */
  border: 1px solid #c1c5cb;
}

/* 标题样式 */
.user-interview-status h2 {
  font-size: 28px;
  color: #2c3e50;
  margin-bottom: 25px;
  text-align: center;
  letter-spacing: 1px;
}

/* 调整 Element Plus 卡片样式 */
.user-interview-status .el-card {
  background: #fff;
  border-radius: 12px;
  // padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
}

/* 调整 Element Plus 描述列表样式 */
.user-interview-status .el-descriptions {
  font-size: 16px;
  color: #34495e;
}

.user-interview-status .el-descriptions__title {
  font-size: 20px;
  color: #2c3e50;
  border-bottom: 1px solid #eaeaea;
  margin-bottom: 15px;
  padding-bottom: 5px;
}

.user-interview-status .el-descriptions-item {
  margin-bottom: 10px;
}

.user-interview-status .el-descriptions-item__label {
  font-weight: bold;
  color: #2c3e50;
}
/* 进度条容器样式 */
.progress-steps {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  position: relative;
}

.step {
  text-align: center;
  position: relative;
}

/* 圆圈样式 */
.circle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid #3498db; /* 默认边框颜色 */
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: bold;
  background-color: white;
  color: #3498db; /* 默认文本颜色为蓝色 */
}

/* 通过状态的样式 */
.step.active .circle {
  background-color: #2ecc71; /* 通过状态圆圈背景色为绿色 */
  color: white;
}

/* 未通过状态的样式 */
.step.failed .circle {
  background-color: #e74c3c; /* 未通过状态圆圈背景色为红色 */
  color: white;
}

/* 连接圆圈的线条 */
.step:not(:last-child)::after {
  content: '';
  position: absolute;
  top: 30%;
  left: 100%;
  width: 390px;
  height: 2px;
  background-color: #3498db; /* 连接线的颜色 */
  transform: translateY(-50%);
}
.step:last-child::after {
  content: '';
  position: absolute;
  top: 30%;
  left: 77%;
  width: 390px;
  height: 3px;
  background-color: #fff; /* 连接线的颜色 */
  transform: translateY(-50%);
}
/* 通过状态连接线的颜色 */
.step.active:not(:last-child)::after {
  background-color: #2ecc71;
}

/* 未通过状态连接线的颜色 */
.step.failed:not(:last-child)::after {
  background-color: #e74c3c;
}

.step p {
  margin-top: 5px;
  font-size: 14px;
  color: #3498db;
}

/* 通过或未通过状态下的文本样式 */
.step.active p {
  color: #2ecc71;
  font-weight: bold;
}

.step.failed p {
  color: #e74c3c;
  font-weight: bold;
}

/* 针对移动端的优化 */
@media screen and (max-width: 768px) {
  .user-interview-status {
    // padding: 20px;
    // margin: 15px;
    max-width: 100%;
  }
  .user-interview-status h2 {
    font-size: 24px;
    margin-bottom: 20px;
  }
  .progress-steps {
    // flex-direction: column;
    gap: 10px;
  }
}
</style>
