<template>
  <section class="text-gray-600 body-font relative">
    <div class="container px-5 py-24 mx-auto flex">
      <div
        class="lg:w-1/3 md:w-1/2 bg-white rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-md">
        <h2 class="text-gray-900 text-2xl font-bold mb-1 title-font">{{formType==1 ? '登录':'注册'}}</h2>
        <div class="relative mb-4">
          <label for="email" class="leading-7 text-sm text-gray-600">用户名：</label>
          <input type="email" id="email" name="email"
            class="">
          <el-input v-if="formType" v-model="loginForm.username" maxlength="20" class="w-full bg-white rounded focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"></el-input>
          <el-input v-else v-model="registForm.username" maxlength="20" class="w-full bg-white rounded focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"></el-input>
        </div>
        <div class="relative mb-4">
          <label for="message" class="leading-7 text-sm text-gray-600">密码：</label>
          <el-input v-if="formType" v-model="loginForm.password" maxlength="20" type="password" class="w-full bg-white rounded focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"></el-input>
          <el-input v-else v-model="registForm.password" maxlength="20" type="password" class="w-full bg-white rounded focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"></el-input>
        </div>
        <div class="relative mb-4" v-if="formType==0" >
          <label for="message" class="leading-7 text-sm text-gray-600">邮箱：</label>
          <el-input v-model="registForm.email" maxlength="20" class="w-full bg-white rounded focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"></el-input>
        </div>
        <button
          class="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg" @click="confirmBtn">Submit</button>
        <p class="text-xs text-gray-500 mt-3">切换 &nbsp;<span class="underline text-gray-800" @click="formType = !formType">{{formType==1 ? '注册':'登录'}}</span>
        </p>
      </div>
    </div>
  </section>
</template>

<script>
import { onMounted, reactive, toRefs } from "vue";
import { register, login, getUserInfo } from '@/api/user'
import { ElMessage } from 'element-plus'
import { isEmail } from '@/utils/filter'
import { getToken, setToken, removeToken,getInfo, setInfo, removeInfo } from '@/utils/auth'
import { useRouter, useRoute } from 'vue-router';

export default {
  name: 'Login',
  setup() {
    const router = useRouter()
    const route = useRoute()

    const state = reactive({
      formType: null, // 0注册  1登录
      loginForm: { username: '', password: '',},
      registForm: {username: '', password: '', email: ''}
    });
    if(route.query) state.formType = route.query.type
    
    const confirmBtn = () => {
      let keys = []
      state.formType == 1 ? keys = Object.keys(state.loginForm) : keys = Object.keys(state.registForm)
      if(state.formType == 1) {
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
              router.push('/')
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
          state.formType = 1
        }
      })
    }

    return {
      ...toRefs(state),
      confirmBtn
    }
  }
}


</script>
<style lang="scss" scoped>
section{
  background-image: url('../assets/game.jpg');
  background-size: 70% 100%;
  height: 100vh;
}
</style>