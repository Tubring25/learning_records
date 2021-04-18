<template>
  <div class="nav-bar-container h-16 w-full bg-gray-800">
    <img class="h-12 absolute inset-y-2 left-32" src="../assets/logo_steam.svg" alt="">
    <div class="login-box w-40 h-16 leading-none absolute right-32">
      <p v-if="hasLogin" class="text-center h-full text-gray-50">
        <span v-if="hasLogin">{{username}}</span>
        <span @click="signOut">退出</span>
      </p>
      <p v-else class="text-center h-full text-gray-50">
        <span @click="navbarBtn(1)">登录</span>/<span @click="navbarBtn(0)">注册</span>
      </p>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, toRefs } from "vue";
import { getToken, setToken, removeToken,getInfo, setInfo, removeInfo } from '@/utils/auth'
import { useRouter } from 'vue-router';

export default {
  name: "NavBar",
  setup() {
    const router = useRouter()
    const state = reactive({
      hasLogin: false,
      username: "username",
    });
    onMounted(() => {
      if(getToken() && getInfo('vue_steam')) {
        state.hasLogin = true
        state.username = JSON.parse(getInfo('vue_steam')).username
      }
    })

    // 登录注册
    const navbarBtn = (type) => {
      router.replace({path: '/login', query: {type: type}})
    }
    const signOut = () => {
      removeToken()
      removeInfo('vue_steam')
      state.hasLogin = false
    }

    return {
      ...toRefs(state),
      navbarBtn,
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
