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
          <button
            class="inline-flex mr-5 text-white bg-red-500 border-0 py-1 px-4 focus:outline-none hover:bg-red-300 rounded">
            结  算
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import { useRouter  } from "vue-router";
import { ref } from 'vue'
import { getGameById } from '@/api/goods'
export default {
  components: {NavBar},
  setup() {
    const router = useRouter();
    if(!router.currentRoute.value.query.ids) {
      router.replace('/')
    }
    const ids = ref([])
    ids.value = router.currentRoute.value.query.ids
    const goodsList = ref([])
    const totalPrice = ref(0)
    for(let i of ids.value.split(',')) {
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
    return {
      goodsList,
      totalPrice
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  height: calc(100vh);
}
</style>