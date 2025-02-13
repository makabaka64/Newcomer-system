<script setup></script>
<template>
  <div class="list">
    <h3>学习小组</h3>
    <div
      class="grid grid-cols-3 grid-rows-2 gap-8 p-8 bg-gray-50 rounded-lg shadow-md"
    >
      <!-- Android -->
      <div
        class="flex flex-col items-center justify-center bg-white p-4 rounded-lg shadow-sm"
      >
        <img
          src="../../assets/安卓.png"
          alt="Android"
          class="rounded-lg object-cover"
        />
        <p class="mt-4 text-center text-lg font-semibold text-gray-800">
          安卓<br />Android
        </p>
        <p class="mt-2 text-center text-sm text-gray-600">
          安卓是一种基于Linux内核的移动操作系统，广泛应用于智能手机、平板电脑等设备。安卓系统具有响应速度快、支持用户个性化管理等优点，能够为用户提供流畅的使用体验和丰富的应用选择。如今，安卓已经成为移动设备市场上的主流操作系统之一，为全球数亿用户提供服务。
        </p>
      </div>

      <!-- iOS -->
      <div
        class="flex flex-col items-center justify-center bg-white p-4 rounded-lg shadow-sm"
      >
        <img
          src="../../assets/Ios.png"
          alt="iOS"
          class="rounded-lg object-cover"
        />
        <p class="mt-4 text-center text-lg font-semibold text-gray-800">
          苹果<br />iOS
        </p>
        <p class="mt-2 text-center text-sm text-gray-600">
          iOS是由苹果公司开发的专有移动操作系统。它基于Unix系统，构建于Darwin内核之上，为iPhone、iPad和iPod
          touch等设备提供操作界面。iOS以其稳定性、易用性、功能性和安全性而闻名。iOS不断迭代更新，为用户带来更加便捷、安全、高效的移动体验。
        </p>
      </div>

      <!-- Web Frontend -->
      <div
        class="flex flex-col items-center justify-center bg-white p-4 rounded-lg shadow-sm"
      >
        <img
          src="../../assets/web.png"
          alt="Web Frontend"
          class="rounded-lg object-cover"
        />
        <p class="mt-4 text-center text-lg font-semibold text-gray-800">
          前端<br />Web
        </p>
        <p class="mt-2 text-center text-sm text-gray-600">
          前端Web开发是指构建和维护网站或Web应用用户界面的技术实践。它涉及HTML、CSS和JavaScript等核心技术，用于创建页面结构、样式和交互功能。简而言之，前端Web开发是连接用户与Web内容的桥梁，致力于创造直观、高效和吸引人的在线体验。
        </p>
      </div>

      <!-- Server Backend -->
      <div
        class="flex flex-col items-center justify-center bg-white p-4 rounded-lg shadow-sm"
      >
        <img
          src="../../assets/server.png"
          alt="Server Backend"
          class="rounded-lg object-cover"
        />
        <p class="mt-4 text-center text-lg font-semibold text-gray-800">
          后端<br />Server
        </p>
        <p class="mt-2 text-center text-sm text-gray-600">
          后端Server是指软件系统中负责处理数据、业务逻辑和服务器端操作的部分。它接收来自前端客户端的请求，进行数据处理和业务逻辑运算，然后返回相应的结果。后端Server的开发和维护对于构建高性能、可扩展和可靠的网络应用至关重要。
        </p>
      </div>

      <!-- HarmonyOS -->
      <div
        class="flex flex-col items-center justify-center bg-white p-4 rounded-lg shadow-sm"
      >
        <img
          src="../../assets/鸿蒙.jpg"
          alt="HarmonyOS"
          class="rounded-lg object-cover"
        />
        <p class="mt-4 text-center text-lg font-semibold text-gray-800">
          鸿蒙<br />HarmonyOS
        </p>
        <p class="mt-2 text-center text-sm text-gray-600">
          鸿蒙Harmony（HarmonyOS）是华为公司自主研发的分布式操作系统。它采用分布式架构，实现多设备间的无缝连接和协同工作，支持智能手机、智能家居、智能穿戴、车机等多种终端设备。鸿蒙系统注重安全性、稳定性和高效性，为用户提供流畅的操作体验。
        </p>
      </div>
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

h3 {
  color: #2c3e50;
  margin-bottom: 16px;
  border-bottom: 2px solid #2ecc71;
  padding-bottom: 5px;
  font-size: 1.25rem;
  font-weight: 600;
}

.object-cover {
  width: 100px;
  height: 100px;
}

.grid {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 1.5rem;
}

@media (min-width: 640px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.grid > div {
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.grid img {
  max-width: 100%;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.grid .bg-white {
  background-color: #fff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.grid .text-center {
  text-align: center;
}

.text-gray-800 {
  color: #2c3e50;
}

.text-gray-600 {
  color: #7f8c8d;
}

.text-lg {
  font-size: 1.125rem;
}

.text-sm {
  font-size: 0.875rem;
}

.font-semibold {
  font-weight: 600;
}

.transition-transform {
  transition: transform 0.3s ease-in-out;
}

.transition-transform:hover {
  transform: scale(1.05);
}

.shadow-lg {
  box-shadow: 0px 12px 20px rgba(0, 0, 0, 0.1);
}

.shadow-md {
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.1);
}

.mt-2 {
  margin-top: 0.5rem;
}

.mt-4 {
  margin-top: 1rem;
}

.mb-4 {
  margin-bottom: 1rem;
}

.p-6 {
  padding: 1.5rem;
}
</style>
