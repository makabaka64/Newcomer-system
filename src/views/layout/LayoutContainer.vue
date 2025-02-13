<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import MorphingTabs from '@/components/MorphingTabs.vue'
const router = useRouter()
const tabs = ['主页', '学习方向', '面试进度', '个人信息']
const activeTab = ref(tabs[0])
const changeTab = (tab) => {
  activeTab.value = tab
  const routeMap = {
    主页: '/homeview',
    学习方向: '/dashboard',
    面试进度: '/status',
    个人信息: '/apply'
  }
  // 路由跳转
  router.push(routeMap[tab])
}
</script>
<template>
  <el-container>
    <el-header
      ><div id="header" class="header">
        <input id="page_name" type="hidden" value="home" />
        <div id="header_bg" class="header_bg"></div>
        <div id="header_nav" class="header_nav">
          <div class="header_nav_logo"></div>
        </div></div
    ></el-header>
    <el-main class="main-container"><router-view></router-view></el-main>
    <el-footer class="footer-container">
      <MorphingTabs
        :tabs="tabs"
        :active-tab="activeTab"
        @update:active-tab="changeTab"
    /></el-footer>
  </el-container>
</template>
<style lang="scss" scoped>
.header {
  position: relative;
  z-index: 1000;
  height: 50px;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
}
.header_bg {
  z-index: 1001;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: #323232;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.6);
}
.header_nav {
  position: relative;
  z-index: 1002;
  height: 50px;
  width: 1100px;
  margin: 0 auto;
}
.header_nav_list {
  font-size: 14px;
  float: left;
  margin-left: 20px;
  height: 50px;
}
.header_nav_logo {
  background: url(../../assets/header.png) -230px 0 no-repeat;
  width: 230px;
  height: 34px;
  float: left;
  margin-top: 10px;
}
.main-container {
  margin: -30px -10px;
  background: #eee;
}
.footer-container {
  position: fixed; /* 固定定位 */
  bottom: 0; /* 距离底部 0 */
  left: 0; /* 距离左侧 0 */
  width: 100%; /* 占据整个宽度 */
  // background-color: black; /* 背景色为黑色 */
  z-index: 10; /* 确保在其他内容之上 */
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px; /* 高度 */
}

.footer-container button {
  color: white; /* 文字白色 */
  background-color: black; /* 背景黑色 */
  border: none;
  padding: 10px 20px;
  margin: 0 10px;
  border-radius: 5px; /* 按钮圆角 */
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.footer-container button:hover {
  background-color: #333; /* 悬停时背景变深 */
}
</style>
