<template>
  <div class="container bg-gray-900">
    <nav-bar></nav-bar>
    <div class="w-4/5 py-24 mx-auto flex flex-row justify-between">
      <div class=" w-3/5">
        <el-carousel>
          <el-carousel-item v-for="item in game.GameImgs" :key="item">
            <img class=" w-full h-full" :src="'http://localhost:3000/' + item.path" alt="">
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="w-1/3 flex flex-col items-start">
        <span
          class="inline-block py-1 px-2 rounded bg-indigo-50 text-indigo-500 text-xs font-medium tracking-widest">{{game.game_type}}</span>
        <h2 class="sm:text-3xl text-2xl title-font font-medium text-gray-50 mt-4 mb-4">{{game.name}}</h2>
        <p class="leading-relaxed mb-8 h-32 break-all w-full text-gray-300">{{game.desc}}</p>
        <div class="flex items-center flex-wrap pb-4 mb-4 border-b-2 border-gray-100 mt-14 w-full">
          <span class="title-font font-medium text-2xl text-gray-100  text-opacity-50"
            :class="game.is_sale ? 'line-through' : ''">${{game.price}}</span>
          <span v-if="game.is_sale"
            class="title-font font-medium px-6 align-bottom text-xl text-red-500">${{game.sale_price}}</span>
          <button @click.prevent="buy(game.id)"
            class="inline-flex text-white bg-red-500 border-0 py-1 px-4 focus:outline-none hover:bg-red-300 rounded">
            Buy Now
          </button>
        </div>
      </div>
    </div>
    <div class="w-4/5 pb-20 mx-auto flex flex-row justify-between">
      <div class=" w-full flex flex-row justify-between">
        <div class="h-full p-6 rounded-lg border-2 border-gray-300 flex flex-col relative overflow-hidden" style="width: 47%">
          <h2 class="tracking-widest title-font mb-1 font-medium text-gray-100 text-lg">最低配置</h2>
          <el-divider></el-divider>
          <p class="flex items-center text-gray-500 mb-2">
            <span
              class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"
                class="w-3 h-3" viewBox="0 0 24 24">
                <path d="M20 6L9 17l-5-5"></path>
              </svg>
            </span>操作系统：{{lowest.handle_system}}
          </p>
          <p class="flex items-center text-gray-500 mb-2">
            <span
              class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"
                class="w-3 h-3" viewBox="0 0 24 24">
                <path d="M20 6L9 17l-5-5"></path>
              </svg>
            </span>处理器：{{lowest.cpu}}
          </p>
          <p class="flex items-center text-gray-500 mb-6">
            <span
              class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"
                class="w-3 h-3" viewBox="0 0 24 24">
                <path d="M20 6L9 17l-5-5"></path>
              </svg>
            </span>内存：{{lowest.ram}} {{lowest.ram_unit}}
          </p>
          <p class="flex items-center text-gray-500 mb-6">
            <span
              class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"
                class="w-3 h-3" viewBox="0 0 24 24">
                <path d="M20 6L9 17l-5-5"></path>
              </svg>
            </span>显卡：{{lowest.gpu}}
          </p>
          <p class="flex items-center text-gray-500 mb-6">
            <span
              class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"
                class="w-3 h-3" viewBox="0 0 24 24">
                <path d="M20 6L9 17l-5-5"></path>
              </svg>
            </span>存储空间：{{lowest.storage_space}} {{lowest.storage_space_unit}}
          </p>
          <p class="text-xs text-gray-500 mt-3">Systerm_requirement</p>
        </div>
        <div class="h-full p-6 rounded-lg border-2 border-gray-300 flex flex-col relative overflow-hidden" style="width: 47%">
          <h2 class="tracking-widest title-font mb-1 font-medium text-gray-100 text-lg">推荐配置</h2>
          <el-divider></el-divider>
          <p class="flex items-center text-gray-500 mb-2">
            <span
              class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"
                class="w-3 h-3" viewBox="0 0 24 24">
                <path d="M20 6L9 17l-5-5"></path>
              </svg>
            </span>操作系统：{{suggest.handle_system}}
          </p>
          <p class="flex items-center text-gray-500 mb-2">
            <span
              class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"
                class="w-3 h-3" viewBox="0 0 24 24">
                <path d="M20 6L9 17l-5-5"></path>
              </svg>
            </span>处理器：{{suggest.cpu}}
          </p>
          <p class="flex items-center text-gray-500 mb-6">
            <span
              class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"
                class="w-3 h-3" viewBox="0 0 24 24">
                <path d="M20 6L9 17l-5-5"></path>
              </svg>
            </span>内存：{{suggest.ram}} {{suggest.ram_unit}}
          </p>
          <p class="flex items-center text-gray-500 mb-6">
            <span
              class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"
                class="w-3 h-3" viewBox="0 0 24 24">
                <path d="M20 6L9 17l-5-5"></path>
              </svg>
            </span>显卡：{{suggest.gpu}}
          </p>
          <p class="flex items-center text-gray-500 mb-6">
            <span
              class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-400 text-white rounded-full flex-shrink-0">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"
                class="w-3 h-3" viewBox="0 0 24 24">
                <path d="M20 6L9 17l-5-5"></path>
              </svg>
            </span>存储空间：{{suggest.storage_space}} {{suggest.storage_space_unit}}
          </p>
          <p class="text-xs text-gray-500 mt-3">Systerm_requirement</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import { getGameById } from "@/api/goods";
import { getTypes } from "@/api/home"
import { onMounted, reactive, toRefs } from "vue";
import { useRouter } from "vue-router";

export default {
  components: { NavBar },
  setup() {
    const router = useRouter();
    let state = reactive({
      game: {},
      lowest: {},
      suggest: {},
      typeList: [],
    });
    state.game.id = router.currentRoute.value.query.id;
    onMounted(() => {
      getTypeList_()
      getGameById_(state.game.id);
    });

    const getGameById_ = (id) => {
      getGameById({ id: id }).then((res) => {
        if (res.code) {
          state.game = res.data;
          let type = state.game.game_type
          state.typeList.filter(a=>{
            if(a.id == type) {
              console.log(a.name)
              state.game.game_type = a.name
            }
          })
          state.lowest = res.data.SystemRequirements[0]
          state.suggest = res.data.SystemRequirements[1]
        }
      });
    };
    const getTypeList_ = () => {
      getTypes().then(res=>{
        if(res.code) {
          state.typeList = res.data
        }
      })
    }

    return {
      ...toRefs(state),
    };
  },
};
</script>
<style lang="scss" scoped>
.el-carousel {
  height: 420px;
}
.el-carousel /deep/ .el-carousel__container {
  height: 400px;
}
.sy-lable {
  display: inline-block;
  width: 200px;
}
</style>