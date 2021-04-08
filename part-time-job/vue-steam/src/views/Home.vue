<template>
  <div class="container bg-blue-900">
    <nav-bar></nav-bar>

    <div class="content">
      <div class="banner-container w-4/5 mx-auto my-8">
        <el-carousel :interval="4000" type="card" height="400px">
          <el-carousel-item v-for="item in 6" :key="item">
            <div class="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
              <img class="lg:h-48 md:h-36 w-full object-cover object-center" src="https://dummyimage.com/720x400"
                alt="blog">
              <div class="p-6">
                <h2 class="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">CATEGORY</h2>
                <h1 class="title-font text-lg font-medium text-gray-900 mb-3">The Catalyzer</h1>
                <p class="leading-relaxed mb-3">Photo booth fam kinfolk cold-pressed sriracha leggings jianbing
                  microdosing tousled waistcoat.</p>
                <div class="flex items-center flex-wrap ">
                  <button
                    class="inline-flex text-white bg-indigo-500 border-0 py-1 px-4 focus:outline-none hover:bg-indigo-600 rounded">Button</button>
                  <span
                    class="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                    <svg class="w-4 h-4 mr-1" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"
                      stroke-linejoin="round" viewBox="0 0 24 24">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>1.2K
                  </span>
                  <span class="text-gray-400 inline-flex items-center leading-none text-sm">
                    <svg class="w-4 h-4 mr-1" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"
                      stroke-linejoin="round" viewBox="0 0 24 24">
                      <path
                        d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z">
                      </path>
                    </svg>6
                  </span>
                </div>
              </div>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import { getTypes, getRecommend, getSpecSale } from "@/api/home";
export default {
  name: "Home",
  components: { NavBar },
  data() {
    return {
      gameTypeList: [],
      recommendList: [],
      specSaleList: [],
    };
  },
  mounted() {
    this.getTypes_();
    this.getRecommend_();
    this.getSpecSale_();
  },
  methods: {
    getTypes_() {
      getTypes().then((res) => {
        if (res.code) {
          this.gameTypeList = res.data;
        }
      });
    },
    getRecommend_() {
      getRecommend().then((res) => {
        if (res.code) {
          this.recommendList = res.data.rows;
        }
      });
    },
    getSpecSale_() {
      getSpecSale().then((res) => {
        if (res.code) {
          this.specSaleList = res.data.rows;
        }
      });
    },
  },
};
</script>
<style lang="less" scoped>
</style>