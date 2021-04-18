<template>
  <div class="conatiner bg-gray-900">
    <nav-bar></nav-bar>
    <section class="text-gray-600 body-font">
      <div class="container px-5 py-24 mx-auto flex flex-wrap">
        <div class="lg:w-2/3 mx-auto">
          <div class="flex flex-wrap w-full bg-gray-100 py-32 px-10 relative mb-4">
            <img alt="gallery" class="w-full object-cover h-full object-center block opacity-25 absolute inset-0"
              src="../../assets/bg-sm.jpg">
            <div class="text-center relative z-10 w-full">
              <h2 class="text-2xl text-red-900 font-medium title-font mb-6">{{status==1?'恭喜！下单成功！':'未完成支付'}}</h2>
              
              <div class="btn-box w-3/5 mx-auto flex flex-row justify-around">
                <el-button type="success" size="small" @click="handle(0)">回到首页</el-button>
                <el-button type="primary" size="small" @click="handle(1)">查看订单</el-button>
                <el-button v-if="status==0" type="danger" size="small" @click="handle(2)">继续支付</el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import { useRouter, useRoute  } from "vue-router";
import { ref } from 'vue'
import { getGameById } from '@/api/goods'
import { addOrder } from '@/api/order'
import { getInfo } from '@/utils/auth'
export default {
  components: {NavBar},
  setup() {
    const status = ref(null)
    const router = useRouter()
    const route = useRoute()
    const ord_id = ref(null)
    // if(route.query.fin != 1 || route.query.fin != 0) router.replace('/')
    status.value = route.query.fin
    ord_id.value = route.query.ord_id

    const handle = (type) => {
      switch(type) {
        case 0:
          router.replace('/')
          break;
        case 1:
          router.push({path: '/order/detail', query: {ord_id: ord_id.value}})
          break;
        case 2:
          router.push({path: '/order/detail', query: {ord_id: ord_id.value}})
          break;
      }
    } 
    return {
      status,
      handle
    }
  }
}
</script>


<style lang="scss" scoped>
.container {
  height: calc(100vh);
}
</style>