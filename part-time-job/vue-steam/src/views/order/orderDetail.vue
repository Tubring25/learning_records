<template>
  <div class="container bg-gray-900">
    <nav-bar></nav-bar>
    <el-breadcrumb separator="/" class=" w-3/5 mx-auto mt-7">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单详情</el-breadcrumb-item>
    </el-breadcrumb>
    <div class=" w-3/5 mx-auto my-10 border-2 border-gray-300 flex flex-col ">
      <div class="item-box">
        <div class="h-full py-5 flex items-center border-gray-200 border p-4" v-for="item in goodsList" :key="item.id">
          <img alt="team" class=" w-44 h-24 bg-gray-100 object-cover object-center flex-shrink-0 mr-4" :src="'http://localhost:3000/'+item.GameImgs[0].path">
          <div class="flex-grow">
            <h2 class="text-gray-200 text-xl w-3/5 title-font font-medium">{{item.name}}</h2>
          </div>
          <div>
            <span class="title-font font-medium text-xl text-gray-100  text-opacity-50"
            :class="item.is_sale ? 'line-through' : ''">${{item.price}}</span>
          <span v-if="item.is_sale"
            class="title-font font-medium align-bottom text-2xl text-red-500">${{item.sale_price}}</span>
          </div>
        </div>
        <div class="flex flex-row justify-between py-5 pl-5">
          <p class=" text-gray-200 text-xl">订单状态：</p>
          <el-button v-if="order_status==1" type="success" size="medium" class=" mr-4">已支付</el-button>
          <el-button v-else type="danger" size="medium" class=" mr-4" @click="dialogVisible=true">未支付</el-button>
        </div>
      </div>
    </div>

    <el-dialog title="支付" v-model="dialogVisible" width="30%">
      <span>支付：{{totalPrice}}元</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible=false">取 消</el-button>
          <el-button type="primary" @click="pay">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import { useRouter, useRoute  } from "vue-router";
import { ref } from 'vue'
import { getGameById } from '@/api/goods'
import { updateOrder, getOrderById } from '@/api/order'

export default {
  components: {NavBar},
  setup() {
    const router = useRouter();
    const route = useRoute()
    if(!route.query.ord_id) {
      router.replace('/')
    }
    const ord_id = ref(null)
    const orderInfo = ref({})
    const order_status = ref(0)
    ord_id.value = route.query.ord_id
    getOrderById({id: ord_id.value}).then(res=>{
      if(res.code) {
        orderInfo.value = res.data
        order_status.value = res.data.is_finished
        // console.log()
        getGoods(res.data.game_id.split(','))
      } else {
        router.replace('/')
      }
    })
    const goodsList = ref([])
    const totalPrice = ref(0)
    const getGoods = (ids) => {
      for(let i of ids) {
        getGameById({id: i}).then(res=>{
          if(res.code) {
            goodsList.value.push(res.data)
            if(res.data.is_sale) {
              totalPrice.value += Number(res.data.sale_price)
            } else {
              totalPrice.value += Number(res.data.price)
            }          
          }
        })
      }
    }
    

    const dialogVisible = ref(false)
    const pay = () => {
      updateOrder({id: ord_id.value}).then(res=>{
        if(res.code) {
          router.replace({path: '/order/fin', query: {fin: 1, ord_id: ord_id.value}})
        }
      })
    }
    return {
      goodsList,
      totalPrice,
      dialogVisible,
      pay,
      orderInfo,
      order_status
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  height: calc(100vh);
}
.el-breadcrumb /deep/ .el-breadcrumb__separator {
  color: rgb(243, 244, 246);
}
.el-breadcrumb__item /deep/ .el-breadcrumb__inner.is-link {
  color: white;
  opacity: .5;
}
.el-breadcrumb__item /deep/ .el-breadcrumb__inner.is-link:hover {
  opacity: 1;
}
</style>