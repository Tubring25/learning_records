<template>
  <div class="container">
    <section class="text-gray-600 body-font w-11/12 mx-auto">
      <div class="container px-5 py-10 mx-auto">
        <div class="flex flex-wrap w-full">
          <div class="lg:w-1/2 w-full mb-6 lg:mb-0">
            <h1 class="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">用户id: {{userInfo.id}}
            </h1>
            <div class="h-1 w-20 bg-indigo-500 rounded ">
              
            </div>
          </div>
          <div class="lg:w-1/2 w-full leading-relaxed text-gray-500">
            <p>注册时间: <span class="font-bold">{{userInfo.created_at}}</span></p>
            <p class="w-2/3 flex flex-row justify-between">
              <span class="">已购商品数量:{{userInfo.num}}</span>
              <span>总金额:{{userInfo.money}}</span>
            </p>
            <p class="w-full flex flex-row justify-between">
              <span>电话：{{userInfo.phone}}</span>
              <span>邮箱：{{userInfo.email}}</span>
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="text-gray-600 body-font">
    <div class="container px-16 py-10 mx-auto">
      <div class="flex flex-wrap -m-4"  v-if="userInfo.num>0">
        <div class="p-2 lg:w-1/4 md:w-1/3" v-for="item in gameList" :key="item.id" @click="goDetail(item.id)">
          <div class="h-32 flex flex-col items-center text-center" >
            <img alt="team" class="flex-shrink-0 rounded-lg w-full h-24 object-cover object-center mb-1"
              :src="'http://localhost:3000/' + item.GameImgs[0].path">
            <div class="w-full">
              <el-tooltip :content="item.name" placement="top">
                <h2 class="title-font font-medium text-xs text-gray-900 truncate">{{item.name}}</h2>
              </el-tooltip>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  </div>
</template>

<script>
import { getUserList, getUserHadGame } from '@/api/user'
import moment from 'moment'

export default {
  data () {
    return {
      user_id: null,
      userInfo: {},
      gameList: []
    }
  },
  created() {
    this.user_id = this.$route.query.id
    this.getUserList_()
    this.getHadGame_()
  },
  methods: {
    getUserList_() {
      getUserList({id: this.user_id}).then(res=>{
        if(res.code) {
          this.userInfo = Object.assign({}, res.data[0].baseInfo, res.data[0].orderInfo)
          console.log(this.userInfo)
          this.userInfo.created_at = moment(res.data[0].baseInfo.created_at).utcOffset(480).format("YYYY-MM-DD HH:mm:ss");
        }
      })
    },
    getHadGame_ () {
      getUserHadGame({ user_id: this.user_id }).then((res) => {
        if (res.code) {
          this.gameList = res.data.rows;
        }
      });
    }
  },
}
</script>