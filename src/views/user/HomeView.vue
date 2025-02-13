<script setup></script>
<template>
  <div class="list">
    <h1>关于我们</h1>
    <div class="content-with-image">
      <div class="text-content">
        <ul>
          <div class="image-container1">
            西安邮电大学移动应用开发实验室，亦称3G实验室，创建于2011年，隶属于西安邮电大学计算机学院。
            <img src="../../assets/首页2.png" />
          </div>
          <li>
            实验室针对不同平台和成员兴趣，相应的划分为5个开发小组，包括安卓Android、苹果iOS、Web前端、Server后端和鸿蒙HarmonyOS。
          </li>
          <li>
            实验室以自主学习与共同交流并行的自发式学习方式为主，培养成员的学习兴趣及学习能力，努力为每位成员创造最佳的学习环境和学习氛围。
          </li>
        </ul>
      </div>
      <div class="image-container2">
        <img src="../../assets/首页2.png" />
      </div>
    </div>

    <h1>加入我们</h1>
    <div class="content-with-image">
      <div class="text-content">
        <p class="highlight">我们的优势</p>
        <ul>
          <li>Android: Google大学合作部人才培养基地以及Android认证课程。</li>
          <li>iOS: Apple认证的教育拓展团队iOS Club。</li>
          <li>鸿蒙HarmonyOS: 西安邮电大学与上海卓易科技校企合作试点。</li>
        </ul>
        <p class="highlight">除此之外，还有</p>
        <ol>
          <li>
            完善且全面的培养计划:
            每一届都会结合实际情况对培养计划进行修订与完善，努力做到让大家学习的内容实用且高效。
          </li>
          <li>
            一带一培养模式:
            每一位新加入实验室的同学都可以分配到一位学长，监督学习、答疑解惑。
          </li>
          <li>
            校友网络: 众多学长学姐就业于互联网大厂:
            美团、字节跳动、百度、腾讯云等。
          </li>
          <li>
            丰富的比赛经验:
            计算机设计大赛、大学生创新创业比赛、挑战杯等，每年都有众多学长学姐在各个竞赛中斩获佳绩。
          </li>
          <li>
            定期技术分享、完备的基础设施:
            空调、饮水机、打印机、独立工位、免费显示器等。
          </li>
        </ol>
      </div>
      <!-- <div class="image-container">
        <img src="../../assets/首页1.png" />
      </div> -->
    </div>
    <h1>联系我们</h1>
    <div class="content-with-image">
      <div class="text-content">
        <p class="highlight">实验室官网</p>
        https://mobile.xupt.edu.cn/
        <p class="highlight">实验室地址</p>
        长安校区 东区逸夫楼 Fz155 （从B口进）
      </div>
      <div class="image-container">
        <img src="../../assets/首页3.png" />
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
body {
  font-family: 'Arial', sans-serif;
  background-color: #f9f9f9;
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

.content-with-image {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  margin-bottom: 20px;
}

.text-content {
  flex: 2;
}
.image-container1 img {
  display: none;
  max-width: 50%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.image-container2 img {
  max-width: 50%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.image-container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.image-container img {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.content ul,
.content ol {
  margin: 16px 0;
  padding-left: 20px;
}

.content li {
  margin-bottom: 8px;
}

.highlight {
  font-size: 18px;
  font-weight: bold;
  margin-top: 20px;
  color: #2ecc71;
}

/* 移动端适配 */
@media (max-width: 768px) {
  // .list {
  //   width: 98%;
  // }
  .content-with-image {
    flex-direction: column;
    gap: 0;
  }

  .image-container,
  .image-container1 {
    margin-top: 16px;
    justify-content: flex-start; /* 确保图片位于顶部 */
  }

  .image-container1 {
    max-width: 100%;
    height: auto;
  }
  .image-container img {
    max-width: 100%;
    height: auto;
  }
  .image-container1 img {
    display: block;
  }
  .image-container2 img {
    display: none;
  }
}
</style>
<!-- <style lang="scss" scoped>
body {
  font-family: 'Arial', sans-serif;
  background-color: #f9f9f9;
  color: #333;
  line-height: 1.6;
  margin: 0;
  padding: 20px;
}
.list {
  width: 90%;
  margin: 20px auto;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  padding: 25px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

h1 {
  color: #2c3e50;
  font-size: 24px;
  margin: 25px 0;
  padding-bottom: 8px;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 50px;
    height: 3px;
    background: linear-gradient(90deg, #2ecc71, #27ae60);
    border-radius: 2px;
  }
}

.content-with-image {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  margin: 30px 0;
  align-items: start;
}

.text-content {
  ul,
  ol {
    padding-left: 1.2em;
    line-height: 1.8;

    li {
      margin-bottom: 12px;
      position: relative;
      padding-left: 10px;

      &::before {
        content: '•';
        color: #2ecc71;
        position: absolute;
        left: -0.8em;
      }
    }
  }
}

.image-container,
.image-container1 {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.3s ease;

  img {
    width: 100%;
    height: auto;
    border-radius: 12px;
    display: block;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.05);
  }
}

.highlight {
  font-size: 18px;
  color: #2c3e50;
  margin: 20px 0 15px;
  font-weight: 600;
  position: relative;
  padding-left: 24px;

  &::before {
    content: '➤';
    color: #2ecc71;
    position: absolute;
    left: 0;
    top: 1px;
  }
}

/* 移动端适配 */
@media (max-width: 768px) {
  .list {
    width: 95%;
    padding: 15px;
    margin: 10px auto;
  }

  h1 {
    font-size: 20px;
    margin: 20px 0;

    &::after {
      width: 40px;
    }
  }

  .content-with-image {
    grid-template-columns: 1fr;
    gap: 20px;

    // 图片在文字下方
    &:nth-child(even) {
      grid-template-areas: 'image' 'text';

      .image-container,
      .image-container1 {
        grid-area: image;
      }

      .text-content {
        grid-area: text;
      }
    }
  }

  .image-container,
  .image-container1 {
    max-width: 70%;
    margin: 0 auto;
  }

  .highlight {
    font-size: 16px;
    padding-left: 20px;
  }

  .text-content {
    ul,
    ol {
      li {
        font-size: 14px;
      }
    }
  }
}

@media (max-width: 480px) {
  .image-container,
  .image-container1 {
    max-width: 100%;
  }

  .content-with-image {
    margin: 20px 0;
  }

  .highlight {
    margin: 15px 0 10px;
  }
}
</style> -->
