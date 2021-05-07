<template>
  <div class="nav-bar-container h-16 w-full bg-gray-800">
    <router-link to="/">
      <img class="h-12 absolute inset-y-2 left-32" src="../assets/logo_steam.svg" alt="">
    </router-link>
    <h1 class="absolute left-80 text-2xl font-bold mt-4 text-gray-50">游戏物品交易平台</h1>
    <div class="login-box w-40 h-16 leading-none absolute right-32">
      <p v-if="hasLogin" class="text-center h-full text-gray-50">
        <el-dropdown v-if="hasLogin">
          <span class="el-dropdown-link text-gray-50">
            {{username}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item><router-link to="/profile">个人资料</router-link></el-dropdown-item>
              <el-dropdown-item><router-link to="/shoppingCart">购物车</router-link></el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
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
