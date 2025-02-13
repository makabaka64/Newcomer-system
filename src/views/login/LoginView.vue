<script setup>
import { ref } from 'vue'
import { userRegisterService, userLoginService } from '@/api/user'
import { useUserStore } from '@/stores/index'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const isRegister = ref(false)

// 登录表单数据
const loginForm = ref({
  student_id: '',
  password: ''
})

// 注册表单数据
const registerForm = ref({
  student_id: '',
  password: '',
  confirmPassword: '',
  name: '',
  phone_number: '',
  qq: '',
  class: '',
  direction: ''
})

// 校验错误信息
const loginErrors = ref({
  student_id: '',
  password: ''
})
const registerErrors = ref({
  student_id: '',
  password: '',
  confirmPassword: '',
  name: '',
  phone_number: '',
  qq: '',
  class: '',
  direction: ''
})

// 标志位：表示是否已经失去焦点（用于显示错误信息）
const loginTouched = ref({
  student_id: false,
  password: false
})
const registerTouched = ref({
  student_id: false,
  password: false,
  confirmPassword: false,
  name: false,
  phone_number: false,
  qq: false,
  class: false,
  direction: false
})
// 字段友好名称映射，用于提示信息
const fieldNames = {
  name: '姓名',
  phone_number: '手机号',
  qq: 'QQ',
  class: '班级',
  direction: '方向'
}
// 校验规则：
const validateUsername = (student_id) => {
  if (!student_id) return '学号不能为空'
  if (!/^\d{10}$/.test(student_id)) return '学号必须是10位数字'
  return ''
}
const validatePassword = (password) => {
  if (!password) return '密码不能为空'
  if (password.length < 6 || password.length > 10) return '密码长度应为6-10位'
  return ''
}
const validateConfirmPassword = (password, confirmPassword) => {
  if (!confirmPassword) return '请确认密码'
  if (password !== confirmPassword) return '两次密码输入不一致'
  return ''
}
const validatePhoneNumber = (phone_number) => {
  if (!phone_number) return '手机号不能为空'
  if (!/^1[3456789]\d{9}$/.test(phone_number)) return '手机号格式不正确'
  return ''
}
const validateNotEmpty = (value, fieldKey) => {
  if (!value) return `${fieldNames[fieldKey] || fieldKey}不能为空`
  return ''
}

// 登录表单校验
const validateLogin = () => {
  loginErrors.value.student_id = validateUsername(loginForm.value.student_id)
  loginErrors.value.password = validatePassword(loginForm.value.password)
  return !loginErrors.value.student_id && !loginErrors.value.password
}

// 注册表单校验
const validateRegister = () => {
  registerErrors.value.student_id = validateUsername(
    registerForm.value.student_id
  )
  registerErrors.value.password = validatePassword(registerForm.value.password)
  registerErrors.value.confirmPassword = validateConfirmPassword(
    registerForm.value.password,
    registerForm.value.confirmPassword
  )
  registerErrors.value.phone_number = validatePhoneNumber(
    registerForm.value.phone_number
  )
  registerErrors.value.name = validateNotEmpty(registerForm.value.name, '姓名')
  // registerErrors.value.phone_number = validateNotEmpty(
  //   registerForm.value.phone_number,
  //   '手机号'
  // )
  registerErrors.value.qq = validateNotEmpty(registerForm.value.qq, 'QQ')
  registerErrors.value.class = validateNotEmpty(
    registerForm.value.class,
    '班级'
  )
  registerErrors.value.direction = validateNotEmpty(
    registerForm.value.direction,
    '方向'
  )
  return Object.values(registerErrors.value).every((v) => !v)
}

// 失去焦点校验
const handleBlur = (type, field) => {
  if (type === 'login') {
    if (field === 'student_id') {
      loginErrors.value.student_id = validateUsername(
        loginForm.value.student_id
      )
      loginTouched.value.student_id = true
    } else if (field === 'password') {
      loginErrors.value.password = validatePassword(loginForm.value.password)
      loginTouched.value.password = true
    }
  } else if (type === 'register') {
    if (field === 'student_id') {
      registerErrors.value.student_id = validateUsername(
        registerForm.value.student_id
      )
      registerTouched.value.student_id = true
    } else if (field === 'password') {
      registerErrors.value.password = validatePassword(
        registerForm.value.password
      )
      registerTouched.value.password = true
    } else if (field === 'confirmPassword') {
      registerErrors.value.confirmPassword = validateConfirmPassword(
        registerForm.value.password,
        registerForm.value.confirmPassword
      )
      registerTouched.value.confirmPassword = true
    } else if (
      ['name', 'phone_number', 'qq', 'class', 'direction'].includes(field)
    ) {
      // 此处调用 validateNotEmpty，会根据映射显示友好名称
      registerErrors.value[field] = validateNotEmpty(
        registerForm.value[field],
        field
      )
      registerTouched.value[field] = true
    }
  }
}

// 样式对象
const loginStyle = ref({
  opacity: '1',
  zIndex: '10',
  animation: 'into 1s ease'
})
const registerStyle = ref({
  opacity: '0',
  zIndex: '-1',
  animation: 'none'
})

const userStore = useUserStore()
const router = useRouter()

const register = async () => {
  if (!validateRegister()) {
    ElMessage.error('请检查表单信息是否填写完整并符合要求')
    return
  }
  try {
    await userRegisterService(registerForm.value)
    ElMessage.success('报名成功')
    toggleForm(false) // 切换到登录表单
  } catch (error) {
    ElMessage.error('报名失败:', error)
    ElMessage.error(error.message || '报名失败，请重试')
  }
}

const login = async () => {
  if (!validateLogin()) {
    ElMessage.error('请检查表单信息是否填写完整')
    return
  }
  try {
    const res = await userLoginService(loginForm.value)
    const token = res.data?.token
    if (!token) throw new Error('登录失败：请先报名或输入正确信息')
    userStore.setToken(token)
    ElMessage.success('登录成功')
    router.push('/')
  } catch (error) {
    console.error('登录失败:', error)
    ElMessage(error.message || '登录失败，请检查输入信息')
  }
}

const toggleForm = (isRegisterForm) => {
  isRegister.value = isRegisterForm
  loginStyle.value = {
    opacity: isRegisterForm ? '0' : '1',
    zIndex: isRegisterForm ? '-1' : '10',
    animation: isRegisterForm ? 'none' : 'into 1s ease'
  }
  registerStyle.value = {
    opacity: isRegisterForm ? '1' : '0',
    zIndex: isRegisterForm ? '10' : '-1',
    animation: isRegisterForm ? 'into 1s ease' : 'none'
  }
}
</script>

<template>
  <div class="box">
    <div class="forms">
      <div class="tips">
        <span
          class="login-btn"
          :class="{ active: !isRegister, default: isRegister }"
          @click="toggleForm(false)"
          >登录</span
        >
        <span
          class="register-btn"
          :class="{ active: isRegister, default: !isRegister }"
          @click="toggleForm(true)"
          >报名</span
        >
      </div>
      <!-- 登录表单 -->
      <div class="login" v-show="!isRegister" :style="loginStyle">
        <div class="form-title">
          <h3 style="margin: 0px 40px">欢迎加入移动应用开发实验室！</h3>
        </div>
        <form @submit.prevent="login" class="form">
          <div class="input-item">
            <input
              type="text"
              placeholder="学号"
              v-model="loginForm.student_id"
              @blur="handleBlur('login', 'student_id')"
            />
            <span
              v-if="loginTouched.student_id && loginErrors.student_id"
              class="error"
            >
              {{ loginErrors.student_id }}
            </span>
          </div>
          <div class="input-item">
            <input
              type="password"
              placeholder="密码"
              v-model="loginForm.password"
              @blur="handleBlur('login', 'password')"
            />
            <span
              v-if="loginTouched.password && loginErrors.password"
              class="error"
            >
              {{ loginErrors.password }}
            </span>
          </div>
          <button type="submit" class="btn">登录</button>
        </form>
      </div>

      <!-- 注册表单 -->
      <div
        class="register"
        v-show="isRegister"
        :style="registerStyle"
        style="margin-top: -50px"
      >
        <form @submit.prevent="register" class="form">
          <div class="input-item">
            <input
              type="text"
              placeholder="姓名"
              v-model="registerForm.name"
              @blur="handleBlur('register', 'name')"
            />
            <span
              v-if="registerTouched.name && registerErrors.name"
              class="error"
            >
              {{ registerErrors.name }}
            </span>
          </div>
          <div class="input-item">
            <input
              type="text"
              placeholder="学号 (10位数字)"
              v-model="registerForm.student_id"
              @blur="handleBlur('register', 'student_id')"
            />
            <span
              v-if="registerTouched.student_id && registerErrors.student_id"
              class="error"
            >
              {{ registerErrors.student_id }}
            </span>
          </div>
          <div class="input-item">
            <input
              type="password"
              placeholder="密码 (6-10位)"
              v-model="registerForm.password"
              @blur="handleBlur('register', 'password')"
            />
            <span
              v-if="registerTouched.password && registerErrors.password"
              class="error"
            >
              {{ registerErrors.password }}
            </span>
          </div>
          <div class="input-item">
            <input
              type="password"
              placeholder="确认密码"
              v-model="registerForm.confirmPassword"
              @blur="handleBlur('register', 'confirmPassword')"
            />
            <span
              v-if="
                registerTouched.confirmPassword &&
                registerErrors.confirmPassword
              "
              class="error"
            >
              {{ registerErrors.confirmPassword }}
            </span>
          </div>
          <div class="input-item">
            <input
              type="text"
              placeholder="手机号"
              v-model="registerForm.phone_number"
              @blur="handleBlur('register', 'phone_number')"
            />
            <span
              v-if="registerTouched.phone_number && registerErrors.phone_number"
              class="error"
            >
              {{ registerErrors.phone_number }}
            </span>
          </div>
          <div class="input-item">
            <input
              type="text"
              placeholder="QQ"
              v-model="registerForm.qq"
              @blur="handleBlur('register', 'qq')"
            />
            <span v-if="registerTouched.qq && registerErrors.qq" class="error">
              {{ registerErrors.qq }}
            </span>
          </div>
          <div class="input-item">
            <input
              type="text"
              placeholder="班级"
              v-model="registerForm.class"
              @blur="handleBlur('register', 'class')"
            />
            <span
              v-if="registerTouched.class && registerErrors.class"
              class="error"
            >
              {{ registerErrors.class }}
            </span>
          </div>
          <div class="input-item">
            <!-- 选择方向 -->
            <select
              v-model="registerForm.direction"
              @change="handleBlur('register', 'direction')"
            >
              <option value="">请选择方向</option>
              <option value="安卓">安卓</option>
              <option value="iOS">iOS</option>
              <option value="Web">Web</option>
              <option value="Server">Server</option>
              <option value="鸿蒙">鸿蒙</option>
            </select>
            <span
              v-if="registerTouched.direction && registerErrors.direction"
              class="error"
            >
              {{ registerErrors.direction }}
            </span>
          </div>
          <button type="submit" class="btn">报名</button>
        </form>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
/* 整体背景和盒子样式 */
.box {
  width: 80vw;
  height: 80vh;
  background: url('/src/assets/bg.jpg') no-repeat center center;
  background-size: cover;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 30px;
  overflow: hidden;
  font-family: NeueMachina-Regular;
}

/* 表单容器 */
.forms {
  width: 50%;
  height: 100%;
  overflow-y: auto;
  background-color: rgba(45, 50, 80, 0.9);
  border-radius: 30px 0 0 30px;
  color: #fff;
  position: relative;
  padding: 4vh 2vw;
  box-sizing: border-box;
}

/* 顶部切换按钮 */
.tips {
  display: flex;
  justify-content: center;
  margin-bottom: 2vh;
  span {
    margin: 0 10px;
    cursor: pointer;
    padding-bottom: 5px;
    font-size: 1.2rem;
    color: #646c9a;
    transition:
      border-bottom 0.1s,
      color 0.1s;
    &.active {
      border-bottom: 4px solid rgb(249, 177, 122);
      color: #fff;
    }
  }
}

/* 公共表单样式 */
.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  .input-item {
    width: 70%;
    margin: 15px 45px 10px 0px;
    position: relative;
    input,
    select {
      width: 100%;
      padding: 12px;
      border: none;
      border-radius: 4px;
      font-size: 1rem;
      background-color: rgb(66, 71, 105);
      color: #fff;
      outline: none;
    }
    .error {
      position: absolute;
      top: 100%;
      left: 0;
      font-size: 0.8rem;
      color: #ff7878;
      margin-top: 3px;
    }
  }
  .btn {
    width: 40%;
    padding: 12px;
    background-color: rgb(249, 177, 122);
    color: rgb(45, 50, 80);
    border: none;
    border-radius: 5px;
    font-size: 1.1rem;
    cursor: pointer;
    box-shadow: 0px 0px 10px rgb(249, 177, 122);
    transition: box-shadow 0.3s;
    margin: 40px;
    &:hover {
      box-shadow: 0px 0px 15px rgb(249, 177, 122);
    }
  }
}

/* 表单切换动画 */
.login,
.register {
  // max-height: 70vh;
  position: absolute;
  width: 100%;
  top: 20%;
}

/* 移动端适配 */
@media (max-width: 768px) {
  .box {
    width: 100vw;
    height: 100vh;
    border-radius: 0;
  }
  .forms {
    width: 100%;
    border-radius: 0;
    padding: 5vh 4vw;
  }
  .tips {
    font-size: 1rem;
    margin-bottom: 4vh;
  }
  .form {
    .input-item {
      input,
      select {
        font-size: 0.9rem;
      }
    }
    .btn {
      width: 60%;
      font-size: 1rem;
    }
  }
}

/* 简单的进入动画 */
@keyframes into {
  0% {
    transform: translateY(5vh);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
