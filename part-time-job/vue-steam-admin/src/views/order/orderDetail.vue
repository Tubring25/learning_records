<template>
  <div class="container">
    <section class="text-gray-600 body-font w-11/12 mx-auto">
      <div class="container px-5 py-24 mx-auto">
        <div class="flex flex-wrap w-full mb-20">
          <div class="lg:w-1/2 w-full mb-6 lg:mb-0">
            <h1 class="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">用户id: {{orderInfo.user_id}}
            </h1>
            <div class="h-1 w-20 bg-indigo-500 rounded ">
              
            </div>
          </div>
          <div class="lg:w-1/2 w-full leading-relaxed text-gray-500">
            <p>订单编号: <span class="font-bold">{{orderInfo.ord_no}}</span></p>
            <p class="w-2/3 flex flex-row justify-between">
              <span class="">订单状态:{{orderInfo.is_finished ? '已支付' : '未支付'}}</span>
              <span>下单时间:{{orderInfo.created_at}}</span>
            </p>
          </div>
        </div>
        <div class="flex flex-wrap -m-4">
          <div class="xl:w-1/4 md:w-1/2 p-4" v-for="item in orderInfo.game" :key="item.id">
            <div class="bg-gray-100 p-6 rounded-lg">
              <img class="h-30 rounded w-full object-cover object-center mb-6" :src="'http://localhost:3000/'+item.GameImgs[0].path"
                alt="content">
              <h3 class="tracking-widest text-indigo-500 text-xs font-medium title-font">{{item.name}}</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { getOrderById, updateOrder } from '@/api/order'
import moment from 'moment'

export default {
  data () {
    return {
      order_id: null,
      orderInfo: {},
      gameList: []
    }
  },
  created() {
    this.order_id = this.$route.query.id
    this.getOrderById_()
  },
  methods: {
    getOrderById_() {
      getOrderById({id: this.order_id}).then(res=>{
        if(res.code) {
          res.data.created_at = moment(res.data.created_at).utcOffset(480).format("YYYY-MM-DD HH:mm:ss");
          this.orderInfo = res.data
        }
      })
    }
  },
}
</script>