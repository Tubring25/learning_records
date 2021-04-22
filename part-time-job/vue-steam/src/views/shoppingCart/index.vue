<template>
  <div class="container bg-gray-900">
    <nav-bar></nav-bar>
    <div class=" w-3/5 mx-auto my-10 border-2 border-gray-300 flex flex-col ">
      <div class="item-box">
        <div class="h-full py-5 flex items-center border-gray-200 border p-4" v-for="item in goodsList" :key="item.id">
          <img alt="team" class=" w-44 h-24 bg-gray-100 object-cover object-center flex-shrink-0 mr-4" :src="'http://localhost:3000/'+item.GameImgs[0].path">
          <div class="flex-grow">
            <h2 class="text-gray-200 text-xl w-3/5 title-font font-medium">{{item.name}}</h2>
            <!-- <p class="text-gray-500">UI Designer</p> -->
          </div>
          <div>
            <span class="title-font font-medium text-xl text-gray-100  text-opacity-50"
            :class="item.is_sale ? 'line-through' : ''">${{item.price}}</span>
          <span v-if="item.is_sale"
            class="title-font font-medium px-6 align-bottom text-2xl text-red-500">${{item.sale_price}}</span>
          </div>
        </div>
        <div class="flex flex-row justify-between py-5 pl-5">
          <p class=" text-gray-200 text-xl">总计：<span class=" text-red-500 text-3xl font-bold">{{totalPrice}}</span></p>
          <button @click="dialogVisible=true"
            class="inline-flex mr-5 text-white bg-red-500 border-0 py-1 px-4 focus:outline-none hover:bg-red-300 rounded">
            结  算
          </button>
        </div>
      </div>
    </div>

    <el-dialog title="支付" v-model="dialogVisible" width="30%">
      <span>支付：{{totalPrice}}元</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="pay(0)">取 消</el-button>
          <el-button type="primary" @click="pay(1)">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import { useRouter  } from "vue-router";
import { onMounted, ref } from 'vue'
import { getGameById } from '@/api/goods'
import { getShoppingCart, clearShoppingCart } from '@/api/shoppingcart'
import { getInfo } from '@/utils/auth'

export default {
  components: {NavBar},
  setup() {
    const router = useRouter();
    const user_id = JSON.parse(getInfo('vue_steam')).id
    let ids = []
    const goodsList = ref([])
    const totalPrice = ref(0)
    const getShoppingCart_ = () =>{
      getShoppingCart({id: user_id}).then(res=>{
        if(res.code) {
          ids = res.data.game_ids.split(',')
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
      })
    }
    
    

    // const dialogVisible = ref(false)
    
    // const num = ids.value.split(',').length
    // const pay = (type) => {
    //   let postData = {user_id: user_id, num: num, game_id: ids.value, money: totalPrice.value, is_fin: 1}
    //   if(type == 0) postData.is_fin = 0
    //   addOrder(postData).then(res=>{
    //     if(res.code) {
    //       router.replace({path: '/order/fin', query: {fin: type, ord_id: res.data.id}})
    //     }
    //   })
    // }

    onMounted(()=>{
      getShoppingCart_()
    })
    return {
      goodsList,
      totalPrice,
      // dialogVisible,
      // pay
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  height: calc(100vh);
}
</style>