<template>
  <div class="sub-container bg-gray-900">
    <nav-bar></nav-bar>
    <div class="search-box px-16 pt-14 mx-auto">
      <el-select v-model="searchCon.type" clearable placeholder="请选择" clearble>
        <el-option v-for="item in typeList" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
      <el-input class=" w-44 px-5" type="text" v-model="searchCon.title" maxlength="50"></el-input>
      <el-button type="primary" @click="searchGame">搜索</el-button>
    </div>
    <section class="text-gray-600 body-font">
      <div class="container px-16 py-14 mx-auto">
        <div class="flex flex-wrap -m-4">
          <div class="lg:w-1/3 sm:w-1/2 p-4 " v-for="(item, index) in gameList" :key="index" @click.prevent="showMore(item.id)">
            <div class="flex relative">
              <img alt="gallery" class="absolute inset-0 w-full h-56 aobject-cover object-center"
                :src="'http://localhost:3000/'+item.GameImgs[0].path">
              <div
                class="px-8 py-10 relative z-10 w-full h-56 border-4 border-gray-200 bg-white opacity-0 hover:opacity-100">
                <div class="tracking-widest text-sm title-font font-medium text-indigo-500 mb-1 flex flex-row justify-between">
                  <span>THE TITLE</span>
                  <div>
                    <span class="title-font font-medium text-s text-gray-700  text-opacity-50"
                    :class="item.is_sale ? 'line-through' : ''">${{item.price}}</span>
                  <span v-if="item.is_sale"
                    class="title-font font-medium align-bottom text-m text-red-500 pr-3">${{item.sale_price}}</span>
                  </div>
                </div>
                <h1 class="title-font text-lg font-medium text-gray-900 mb-3">{{item.name}}</h1>
                <p class=" h-24 desc">{{item.desc}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <el-button class="block mx-auto" v-if="searchCon.pageNum < Math.floor(totalSize / 10)" @click="nexPage">Show More</el-button>
    </section>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import { onMounted, reactive, ref, toRefs } from "vue";
import { getGameList } from "@/api/goods";
import { getTypes } from "@/api/home";
import { useRouter } from 'vue-router'

export default {
  components: { NavBar },
  setup() {
    const router = useRouter()
    const state = reactive({
      searchCon: {
        pageSize: 10,
        pageNum: 1,
        title: "",
        type: null,
        is_onshelf: 1,
        is_sale: 0,
      },
      totalSize: 0,
      gameList: [],
      typeList: [],
    });
    const getGameList_ = () => {
      getGameList(state.searchCon).then((res) => {
        if (res.code) {
          state.gameList.push(...res.data.rows)
          state.totalSize = res.data.count
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

    const showMore = (id) => {
      router.push({path: '/detail', query: {id: id}})
    }
    const nexPage = () => {
      state.searchCon.pageNum += 1
      getGameList_()
    }

    const searchGame = () => {
      state.gameList = []
      state.pageNum = 1
      getGameList_()
    }

    onMounted(() => {
      getGameList_();
      getTypeList_()
    });
    return {
      ...toRefs(state),
      showMore,
      nexPage,
      getGameList_,
      searchGame,
    };
  },
};
</script>
<style lang="scss" scoped>
.sub-container {
  overflow: scroll;
}
::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}

.desc {
  overflow:hidden;
  text-overflow:ellipsis;
  display:-webkit-box;
  -webkit-line-clamp:4;    /*定义的数字为显示的行数*/
  -webkit-box-orient:vertical;
}
</style>