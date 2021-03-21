<template>
  <div class="container mx-auto w-11/12 bg-gray-400 my-8 py-6">
    <el-table :data="goodsTypeList" style="width: 100%">
      <!-- <el-table-column prop="date" label="日期" width="180"></el-table-column> -->
    </el-table>
  </div>
</template>
<script>
import { getGoodsType, addGoodsType, editGoodsType, deleteGoodsType } from '@/api/goodsType'
export default {
  data() {
    return {
      goodsTypeList: [],
    }
  },
  created() {
    this.getGoodsType_()
  },
  methods: {
    getGoodsType_() {
      getGoodsType().then(res=> {
        if(res.code){
          this.goodsTypeList = res.data
        }
      })
    }
  },
}
</script>