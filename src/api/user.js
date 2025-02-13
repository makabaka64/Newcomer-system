import request from '@/utils/request'

//注册接口
export const userRegisterService = ({
  student_id,
  password,
  repassword,
  name,
  class: class_name,
  phone_number,
  qq,
  direction
}) => {
  return request.post('/api/register', {
    student_id,
    password,
    repassword,
    name,
    class: class_name,
    phone_number,
    qq,
    direction
  })
}

//登录接口
export const userLoginService = async ({ student_id, password }) => {
  return request.post('/api/login', { student_id, password })
}

//获取用户基本信息
export const userGetInfoService = () => request.get('/my/userinfo')

//更新用户基本信息
export const userUpdateInfoService = ({
  student_id,
  name,
  class: class_name,
  phone_number,
  qq,
  direction
}) =>
  request.post('/my/userinfo', {
    student_id,
    name,
    class: class_name,
    phone_number,
    qq,
    direction
  })

//更新密码信息
export const userUpdatePassService = ({ oldPwd, newPwd }) =>
  request.post('/my/updatepwd', { oldPwd, newPwd })

//获取面试信息
export const userGetInterviewService = () => request.get('/my/interview')
