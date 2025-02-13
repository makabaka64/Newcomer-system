<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores'
import { useRouter } from 'vue-router'
const router = useRouter()
const userStore = useUserStore()
import {
  userGetInfoService,
  userUpdateInfoService,
  userUpdatePassService
} from '@/api/user'

// 表单数据定义
const registerForm = ref({
  student_id: '',
  name: '',
  phone_number: '',
  qq: '',
  class: '',
  direction: ''
})

const form = ref({
  oldPwd: '',
  newPwd: '',
  confirmPassword: ''
})

// 表单验证规则
const SignUpRules = {
  student_id: [{ required: true, message: '请输入学号', trigger: 'blur' }],
  name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
  phone_number: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
  qq: [{ required: true, message: '请输入QQ号', trigger: 'blur' }],
  class: [{ required: true, message: '请输入班级', trigger: 'blur' }],
  direction: [{ required: true, message: '请选择方向', trigger: 'change' }]
}

const rules = {
  oldPwd: [
    { required: true, message: '请输入旧密码', trigger: 'blur' },
    {
      pattern: /^\S{6,10}$/,
      message: '密码长度必须是6-10位的非空字符串',
      trigger: 'blur'
    }
  ],
  newPwd: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    {
      pattern: /^\S{6,10}$/,
      message: '密码长度必须是6-10位的非空字符串',
      trigger: 'blur'
    },
    {
      validator: (rule, value, callback) => {
        if (value === form.value.oldPwd) {
          callback(new Error('新密码不能与旧密码相同'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ],
  confirmPassword: [
    { required: true, message: '请确认新密码', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value !== form.value.newPwd) {
          callback(new Error('两次密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
}

// 定义方向下拉选项（可根据实际需求调整）
const directionOptions = [
  { label: '安卓', value: '安卓' },
  { label: 'iOS', value: 'iOS' },
  { label: 'Web', value: 'Web' },
  { label: 'Server', value: 'Server' },
  { label: '鸿蒙', value: '鸿蒙' }
]

// 响应式的标签页位置：宽屏时在左侧，移动端时在顶部
const tabPosition = ref('left')
const updateTabPosition = () => {
  if (window.innerWidth < 768) {
    tabPosition.value = 'top'
  } else {
    tabPosition.value = 'left'
  }
}
onMounted(() => {
  updateTabPosition()
  window.addEventListener('resize', updateTabPosition)
  // 获取用户信息，默认显示所有信息
  fetchUserInfo()
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', updateTabPosition)
})

const fetchUserInfo = async () => {
  try {
    const res = await userGetInfoService()
    registerForm.value = { ...registerForm.value, ...res.data.data }
  } catch (error) {
    ElMessage.error(error.message || '获取用户信息失败')
  }
}

const saveMsg = async () => {
  try {
    await userUpdateInfoService(registerForm.value)
    ElMessage.success('信息已保存')
  } catch (error) {
    ElMessage.error(error.message || '信息保存失败')
  }
}

const confirm = async () => {
  try {
    const res = await userUpdatePassService(form.value)
    if (res.data.status !== 0) {
      // 手动抛出错误，让 catch 分支处理
      throw new Error(res.data.message)
    }
    ElMessage.success('密码已修改')
    // 清空本地存储的 token 和 user
    userStore.setToken('')
    userStore.setUser({})
    router.push('/login')
  } catch (error) {
    ElMessage.error(error.message || '请确认旧密码')
  }
}
</script>

<template>
  <div class="setting">
    <h1>个人中心</h1>
    <!-- 使用绑定的 tabPosition，实现响应式标签页位置 -->
    <el-tabs :tab-position="tabPosition">
      <el-tab-pane label="个人资料" class="content">
        <el-row>
          <!-- xs和sm下占满全宽，md以上占半宽 -->
          <el-col :xs="24" :sm="24" :md="12">
            <el-form
              ref="updateForm"
              label-width="100px"
              :model="registerForm"
              :rules="SignUpRules"
              size="large"
            >
              <el-form-item prop="student_id" label="学号">
                <el-input
                  v-model="registerForm.student_id"
                  placeholder="学号"
                  disabled
                ></el-input>
              </el-form-item>
              <el-form-item prop="name" label="姓名">
                <el-input
                  v-model="registerForm.name"
                  placeholder="姓名"
                ></el-input>
              </el-form-item>

              <el-form-item prop="class" label="班级">
                <el-input
                  v-model="registerForm.class"
                  placeholder="班级"
                ></el-input>
              </el-form-item>
              <el-form-item prop="phone_number" label="手机">
                <el-input
                  placeholder="手机号"
                  v-model="registerForm.phone_number"
                ></el-input>
              </el-form-item>
              <el-form-item prop="qq" label="QQ">
                <el-input placeholder="QQ" v-model="registerForm.qq"></el-input>
              </el-form-item>
              <el-form-item prop="direction" label="方向">
                <el-select
                  v-model="registerForm.direction"
                  placeholder="请选择方向"
                >
                  <el-option
                    v-for="option in directionOptions"
                    :key="option.value"
                    :label="option.label"
                    :value="option.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <!-- <el-button @click="goBack(-1)">取消</el-button> -->
                <el-button type="primary" @click="saveMsg()">
                  修改信息
                </el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="更改密码" class="content">
        <el-row>
          <!-- xs和sm下全宽，md以上使用较小宽度 -->
          <el-col :xs="24" :sm="24" :md="10">
            <el-form
              ref="passwordForm"
              label-width="100px"
              :model="form"
              :rules="rules"
            >
              <el-form-item label="旧密码" prop="oldPwd">
                <el-input type="password" v-model="form.oldPwd" />
              </el-form-item>
              <el-form-item label="新密码" prop="newPwd">
                <el-input type="password" v-model="form.newPwd" />
              </el-form-item>
              <el-form-item label="密码确认" prop="confirmPassword">
                <el-input type="password" v-model="form.confirmPassword" />
              </el-form-item>
              <el-form-item>
                <!-- <el-button @click="clearData()">重置</el-button> -->
                <el-button type="primary" @click="confirm()">
                  确认修改
                </el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
    <div class="footer"></div>
  </div>
</template>

<style lang="scss" scoped>
.setting {
  padding-top: 30px;
  margin: auto;
  width: 80%;

  h1 {
    border-bottom: 2px solid #2ecc71;
  }

  .content {
    padding-top: 20px;
    text-align: center;
  }

  .footer {
    height: 250px;
    background-color: #eee;
  }

  @media screen and (min-width: 768px) {
    .setting {
      margin: 30px 10%;
      margin-top: 0;
      padding: 20px;
      min-height: 60vh;
    }
  }

  @media screen and (max-width: 1024px) {
    .setting {
      padding: 20px;
    }
  }

  // 针对移动端优化样式
  @media screen and (max-width: 768px) {
    .setting {
      width: 100%;
      padding: 10px;
    }
    .content {
      padding-top: 10px;
    }
    h1 {
      font-size: 1.5em;
    }
  }
}
</style>
