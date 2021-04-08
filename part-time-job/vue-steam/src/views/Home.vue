<template>
  <div class="container">
    <nav-bar></nav-bar>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import { getTypes, getRecommend, getSpecSale } from '@/api/home'
export default {
  name: 'Home',
  components: { NavBar },
  data() {
    return {
      gameTypeList: [],
      recommendList: [],
      specSaleList: [],
    }
  },
  mounted() {
    this.getTypes_()
    this.getRecommend_()
    this.getSpecSale_()
  },
  methods: {
    getTypes_() {
      getTypes().then(res=>{
        if(res.code) {
          this.gameTypeList = res.data
        }
      })
    },
    getRecommend_(){
      getRecommend().then(res=>{
        if(res.code) {
          this.recommendList = res.data.rows
        }
      })
    },
    getSpecSale_() {
      getSpecSale().then(res=>{
        if(res.code) {
          this.specSaleList = res.data.rows
        }
      })
    }
  },
}
</script>
