<template>
  <div class="container">
    <section class="text-gray-600 body-font overflow-hidden">
      <div class="container px-5 py-24 mx-auto">
        <div class="lg:w-4/5 mx-auto flex flex-wrap">
          <div class="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
            <h2 class="text-sm title-font text-gray-500 tracking-widest">GAME NAME</h2>
            <h1 class="text-gray-900 text-3xl title-font font-medium mb-4">{{goodsForm.name}}</h1>
            <el-tabs v-model="activeName">
              <el-tab-pane label="基础信息" name="first">
                <p class="leading-relaxed mb-4">{{goodsForm.desc}}</p>
              </el-tab-pane>
              <el-tab-pane label="系统需求" name="second">系统需求</el-tab-pane>
            </el-tabs>
            
            <div class="flex border-t border-gray-200 py-2">
              <span class="text-gray-500">Color</span>
              <span class="ml-auto text-gray-900">Blue</span>
            </div>
            <div class="flex border-t border-gray-200 py-2">
              <span class="text-gray-500">Size</span>
              <span class="ml-auto text-gray-900">Medium</span>
            </div>
            <div class="flex border-t border-b mb-6 border-gray-200 py-2">
              <span class="text-gray-500">Quantity</span>
              <span class="ml-auto text-gray-900">4</span>
            </div>
            <div class="flex">
              <span class="title-font font-medium text-2xl text-gray-900">$58.00</span>
              <button class="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">Button</button>
              <button class="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                </svg>
              </button>
            </div>
          </div>
          <img alt="ecommerce" class="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src="https://dummyimage.com/400x400">
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import { getGoodsType } from "@/api/goodsType";
import { getGameById} from "@/api/goods"
export default {
  name: 'GoodsDetail',
  data(){
    return {
      activeName: 'first',
      goodsForm: {},
      goodsTypeList: [],
    }
  },
  created() {
    this.getGoodsType_();
    if(this.$route.query.id) {
      this.getItem({id: this.$route.query.id})
    } else {
      this.$router.go(-1)
    }
  },
  methods: {
    getGoodsType_() {
      getGoodsType().then((res) => {
        if (res.code) {
          this.goodsTypeList = res.data;
        }
      });
    },
    getItem(query) {
      getGameById(query).then(res=>{
        if(res.code) {
          this.goodsForm = res.data[0]
        }
      })
    }
  }
}
</script>