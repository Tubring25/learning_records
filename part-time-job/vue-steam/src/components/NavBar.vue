<template>
  <div class="nav-bar-container h-16 w-full bg-gray-800">
    <img class="h-12 absolute inset-y-2 left-32" src="../assets/logo_steam.svg" alt="">
    <div class="login-box w-40 h-16 leading-none absolute right-32">
      <p v-if="hasLogin" class="text-center h-full text-gray-50">
        <span v-if="hasLogin">{{username}}</span>
        <span @click="signOut">退出</span>
      </p>
      <p v-else class="text-center h-full text-gray-50">
        <span @click="navbarBtn(0)">登录</span>/<span @click="navbarBtn(1)">注册</span>
      </p>
    </div>

    <el-dialog :title="dialogStatus == 0 ? '登录' : '注册'" v-model="dialogVisible" width="30%">
      <el-form :model="loginForm" v-if="dialogStatus==0" label-position="left" label-width="80px">
        <el-form-item label="用户名" >
          <el-input v-model="loginForm.username" maxlength="20" class=" w-60"></el-input>
        </el-form-item>
        <el-form-item label="密码" >
          <el-input v-model="loginForm.password" maxlength="20" type="password" class=" w-60"></el-input>
        </el-form-item>
      </el-form>
      <el-form :model="registForm" v-else label-position="left" label-width="80px">
        <el-form-item label="用户名" >
          <el-input v-model="registForm.username" maxlength="20" class=" w-60"></el-input>
        </el-form-item>
        <el-form-item label="密码" >
          <el-input v-model="registForm.password" maxlength="20" type="password" class=" w-60"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" >
          <el-input v-model="registForm.email" maxlength="20" class=" w-60"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible=false">取 消</el-button>
          <el-button type="primary" @click="confirmBtn">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { onMounted, reactive, toRefs } from "vue";
import { register, login, getUserInfo } from '@/api/user'
import { ElMessage } from 'element-plus'
import { isEmail } from '@/utils/filter'
import { getToken, setToken, removeToken,getInfo, setInfo, removeInfo } from '@/utils/auth'

export default {
  name: "NavBar",
  setup() {
    const state = reactive({
      hasLogin: false,
      username: "username",
      dialogStatus: 0,
      dialogVisible: false,
      loginForm: { username: '', password: '',},
      registForm: {username: '', password: '', email: ''}
    });
    onMounted(() => {
      if(getToken() && getInfo('vue_steam')) {
        state.hasLogin = true
        state.username = JSON.parse(getInfo('vue_steam')).username
      }
    })

    // 登录注册
    const navbarBtn = (type) => {
      state.dialogStatus = type
      state.dialogVisible = true
    }
    const confirmBtn = () => {
      let keys = []
      let values = []
      state.dialogStatus == 0 ? keys = Object.keys(state.loginForm) : keys = Object.keys(state.registForm)
      if(state.dialogStatus == 0) {
        for(let key of keys) {
          if(!state.loginForm[key]) {
            ElMessage.warning('请填写完整')
            return
          }
        }
        login_()
      } else {
        for(let key of keys) {
          if(!state.registForm[key]) {
            ElMessage.warning('请填写完整')
            return
          }
        }
        regist_()
      }
    }
    const login_ = () => {
      login(state.loginForm).then(res=>{
        if(res.code) {
          setToken(res.data.token)
          getUserInfo({token: res.data.token}).then(resp => {
            if(resp.code) {
              setInfo('vue_steam', JSON.stringify(resp.data))
              state.username = resp.data.username
              state.hasLogin = true
              state.dialogVisible = false
            }
          })
        }
      })
    }
    const regist_ = () => {
      if(!isEmail(state.registForm.email)){
        ElMessage.warning('请输入正确的邮箱信息')
        return
      }
      register(state.registForm).then(res=>{
        if(res.code) {
          ElMessage.success('注册成功，请登录')
          state.dialogStatus = 0
        }
      })
    }
    const signOut = () => {
      removeToken()
      removeInfo('vue_steam')
      state.hasLogin = false
    }

    return {
      ...toRefs(state),
      navbarBtn,
      confirmBtn,
      signOut
    };
  },
};
</script>

<style lang="less" scoped>
.login-box {
  p {
    span {
      display: inline-block;
      height: 4rem;
      line-height: 4rem;
      padding: 0 10px;
      cursor: pointer;
    }
  }
}
</style>
