<template>
  <div class="bg-gray-900 w-full">
    <nav-bar></nav-bar>

    <div class="content" style="position:relative">
      <div class="w-4/5 mx-auto my-6 lg:mb-0">
        <h1 class="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-100">精选和推荐</h1>
        <div class="h-1 w-20 bg-white rounded"></div>
      </div>
      <div class="banner-container w-4/5 mx-auto my-8">
        <el-carousel :interval="3000" type="card" height="400px" :initial-index="2" setActiveItem="1">
          <el-carousel-item v-for="item in recommendList" :key="item">
            <div class="h-full border-2 bg-white border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
              <img class="lg:h-64 md:h-48 w-full object-cover object-center" :src="'http://localhost:3000/'+item.img"
                alt="blog">
              <div class="p-6">
                <h2 class="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">TITLE</h2>
                <h1 class="title-font text-lg font-medium text-gray-900 mb-3">{{item.game_name}}</h1>
                <div class="flex items-center flex-wrap ">
                  <button @click.prevent="showMore(item.game_id)"
                    class="inline-flex text-white bg-indigo-900 border-0 py-1 px-4 focus:outline-none hover:bg-indigo-600 rounded">Show
                    More</button>
                  <span
                    class="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                    <svg class="w-4 h-4 mr-1" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"
                      stroke-linejoin="round" viewBox="0 0 24 24">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>{{(Math.random()*10).toFixed(1)}}k
                  </span>
                  <span class="text-gray-400 inline-flex items-center leading-none text-sm">
                    {{item.game_price}}
                  </span>
                </div>
              </div>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>

      <div class="w-4/5 mx-auto my-6 lg:mb-0">
        <h1 class="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-100">特别优惠</h1>
        <div class="h-1 w-20 bg-white rounded"></div>
      </div>
      <div class="swiper-container w-4/5 mx-auto my-8">
        <swiper :slides-per-view="2" :space-between="6" autoplay loop>
          <swiper-slide v-for="item in specSaleList" :key="item.id">
            <div class="parallel border-2 border-gray-200 border-opacity-60">
              <img :src="'http://localhost:3000/'+item.img" class=" w-full" alt="">
              <h1 class="w-5/6 mx-auto title-font text-lg font-medium text-gray-100 my-2">{{item.game_name}}</h1>
              <div class="flex my-5 w-5/6 mx-auto">
                <span
                  class="title-font font-medium text-2xl text-gray-100 line-through text-opacity-50 ">${{item.game_price}}</span>
                <span
                  class="title-font font-medium px-6 align-bottom text-xl text-red-500">${{item.game_sale_price}}</span>
                <button @click="buy(item.game_id)"
                  class="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">Buy
                  Now</button>
              </div>
            </div>

          </swiper-slide>
        </swiper>
      </div>

      <el-tabs type="border-card" class="w-4/5 mx-auto mt-6 lg:mb-0" @tab-click="tabClick" v-model="activeTab">
        <el-tab-pane label="新品推荐" name="0"></el-tab-pane>
        <el-tab-pane label="热销商品" name="1"></el-tab-pane>
      </el-tabs>
      <div class=" w-4/5 mx-auto mb-10 border-2 border-gray-300 flex flex-col ">
        <div class="item-box">
          <div class="h-full relative py-5 flex items-center border-gray-200 border p-4" v-for="item in bottomList"
            :key="item.id">
            <img alt="team" class="w-1/5 h-24 bg-gray-100 object-cover object-center flex-shrink-0 mr-4"
              :src="'http://localhost:3000/'+item.GameImgs[0].path">
            <div class="flex-grow w-4/5">
              <h2 class="text-gray-200 text-xl w-3/5 title-font font-medium">{{item.name}}</h2>
              <p class="w-11/12 text-gray-500 text-xs truncate">{{item.desc}}</p>
            </div>

            <div class=" absolute right-0 bottom-1 px-6">
              <span class="title-font font-medium text-sm text-gray-100  text-opacity-50"
                :class="item.is_sale ? 'line-through' : ''">${{item.price}}</span>
              <span v-if="item.is_sale"
                class="title-font font-medium pl-3 align-bottom text-base text-red-500">${{item.sale_price}}</span>
              <button @click.prevent="showMore(item.id)"
                class="inline-flex text-white text-sm ml-3 bg-indigo-900 border-0 py-1 px-4 focus:outline-none hover:bg-indigo-600 rounded">Show
              More</button>
            </div>
          </div>
        </div>
      </div>

      <router-link to="/list" class="right-6 top-20 fixed"><el-button type="danger">查看更多</el-button></router-link>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import {
  getTypes,
  getRecommend,
  getSpecSale,
  getNewestGames,
  getBestSaleGame,
} from "@/api/home";
import SwiperCore, { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/swiper.scss";

SwiperCore.use([Autoplay]);

export default {
  name: "Home",
  components: { NavBar, Swiper, SwiperSlide },
  data() {
    return {
      gameTypeList: [],
      recommendList: [],
      specSaleList: [],
      activeTab: "0",
      bottomList: [],
    };
  },
  created() {
    this.getRecommend_();
    this.getNewestGames_();
  },
  mounted() {
    this.getTypes_();
    this.getSpecSale_();
    console.log(this.bottomList);
  },
  methods: {
    getTypes_() {
      getTypes().then((res) => {
        if (res.code) {
          this.gameTypeList = res.data.rows;
        }
      });
    },
    getRecommend_() {
      getRecommend().then((res) => {
        if (res.code) {
          this.recommendList = res.data.rows.map((item) => {
            item.img = item.game_img_list.split(",")[0];
            return item;
          });
        }
      });
    },
    getSpecSale_() {
      getSpecSale().then((res) => {
        if (res.code) {
          this.specSaleList = res.data.rows.map((item) => {
            item.img = item.game_img.split(",")[0];
            return item;
          });
        }
      });
    },
    buy(id) {
      this.$router.push({ path: "/order", query: { ids: id } });
    },
    showMore(id) {
      this.$router.push({ path: "/detail", query: { id: id } });
    },
    tabClick(e) {
      this.activeTab == 0 ? this.getNewestGames_() : this.getBestSaleGame_();
    },
    getNewestGames_() {
      getNewestGames().then((res) => {
        if (res.code) {
          this.bottomList = res.data;
        }
      });
    },
    getBestSaleGame_() {
      getBestSaleGame().then((res) => {
        if (res.code) {
          this.bottomList = res.data;
        }
      });
    },
  },
};
</script>
<style lang="less" scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.parallel {
  width: 480px;
  transform: skew(-16deg, 0deg);
  margin: 50px;
}
.el-tabs /deep/ .el-tabs__header,
.el-tabs--border-card {
  background: none;
}
.el-tabs--border-card {
  border: none;
}
.el-tabs /deep/ .el-tabs__item {
  border: 5px solid #fff !important;
  height: 48px;
}
.el-tabs /deep/ .is-active {
  background: #fff !important;
}
</style>