<template>
  <div class="container bg-gray-900">
    <nav-bar></nav-bar>
    <div class=" w-3/5 mx-auto my-10 border-2 border-gray-300 flex flex-col ">
      <div class="item-box">
        <el-checkbox-group v-model="checkList">
          <div class="h-full py-5 flex items-center border-gray-200 border p-4" v-for="item in goodsList" :key="item.id">
            <el-checkbox :label="item" class="pr-4"></el-checkbox>
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
        </el-checkbox-group>
        
        <div class="flex flex-row justify-between py-5 pl-5">
          <p class=" text-gray-200 text-xl">总计：<span class=" text-red-500 text-3xl font-bold">{{totalPrice}}</span></p>
          <button @click="goPay"
            class="inline-flex mr-5 text-white bg-red-500 border-0 py-1 px-4 focus:outline-none hover:bg-red-300 rounded">
            去 结 算
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import { useRouter  } from "vue-router";
import { onMounted, ref,computed } from 'vue'
import { getGameById } from '@/api/goods'
import { getShoppingCart, clearShoppingCart, updateShoppingCart } from '@/api/shoppingcart'
import { getInfo } from '@/utils/auth'
import { ElNotification  } from 'element-plus'

export default {
  components: {NavBar},
  setup() {
    const router = useRouter();
    const checkList = ref([])

    const user_id = JSON.parse(getInfo('vue_steam')).id
    let ids = []
    const goodsList = ref([])
    const getShoppingCart_ = () =>{
      getShoppingCart({id: user_id}).then(res=>{
        if(res.code) {
          ids = res.data.game_ids.split(',')
          for(let i of ids) {
            getGameById({id: i}).then(res=>{
              if(res.code) {
                goodsList.value.push(res.data)        
              }
            })
          }
        }
      })
    }
    
    const totalPrice = computed(()=>{
      let num = 0
      checkList.value.map(a=>{
        if(a) {
          a.is_sale ? num+= Number(a.sale_price) : num+=Number(a.price)
        }
      })
      return num
    })
    
    const goPay = computed(() => {
      if(checkList.value.length==0) {
        ElNotification .warning('请选择商品')
        return
      }
      let chooseIds = checkList.value.map(a=>a.id).toString()
      if(chooseIds == ids.toString()) {
        clearShoppingCart({id: user_id}).then(res=>{
          if(res.code) {
            router.push({path: '/order', query: {ids: chooseIds}})
          }
        })
      } else {
        let newIds = ids.filter(item=>chooseIds.indexOf(item)==-1)
        updateShoppingCart({user_id: user_id, game_ids: newIds.toString()}).then(res=>{
          if(res.code) {
            router.push({path: '/order', query: {ids: chooseIds}})
          }
        })
      }
    })

    onMounted(()=>{
      getShoppingCart_()
    })
    return {
      goodsList,
      totalPrice,
      checkList,
      goPay
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  height: calc(100vh);
}
.el-checkbox /deep/ .el-checkbox__label{
  display: none;
}
</style>