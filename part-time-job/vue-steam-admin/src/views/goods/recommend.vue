<template>
  <div class="container">
    <el-button type="primary" class=" mx-10 my-5" @click="showDialog">选择商品</el-button>
    <section class="text-gray-600 body-font">
      <div class="container px-5 py-10 mx-auto">
        <div class="flex flex-wrap -m-4">
          <div class="lg:w-1/4 md:w-1/2 p-4 w-full">
            <a class="block relative h-48 rounded overflow-hidden">
              <img alt="ecommerce" class="object-cover object-center w-full h-full block"
                src="https://dummyimage.com/420x260">
            </a>
            <div class="mt-4">
              <h2 class="text-gray-900 title-font text-lg font-medium">The Catalyzer</h2>
              <p class="mt-1">$16.00</p>
            </div>
          </div>

        </div>
      </div>
    </section>
    <el-dialog title="请选择" :visible.sync="dialogVisible" width="30%">
      <div class="content">
        <el-input v-model="searchText" placeholder="商品名称" type="text" class=" w-2/3" />
        <el-button type="primary" class=" ml-4" @click="searchGoods">搜索</el-button>
        <div class="flex flex-wrap w-full">
          <div class="p-2 w-full">
            <el-checkbox-group v-model="checkList">
              <div class="bg-gray-100 rounded flex flex-col">
                <el-checkbox class=" block py-3 px-2" v-for="item in searchList" :key="item.id" :label="item.id">{{item.name}}</el-checkbox>
              </div>
            </el-checkbox-group>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmBtn">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { recommenAdd, recommenDel, specSaleAdd, specSaleDel, getRecommendList, getSpecSale,} from "@/api/recommend";
import { getGames } from '@/api/goods'
export default {
  data() {
    return {
      recommendList: [],
      specSaleList: [],
      searchText: "",
      searchList: [],
      checkList: [],
      dialogVisible: false,
    };
  },
  methods: {
    searchGoods () {
      if(this.searchText.trim() == '') {
        this.$message.warning('请输入关键词')
        return
      }
      getGames({pageNum:1, pageSize: 500, title: this.searchText}).then(res=>{
        if(res.code) {
          this.searchList = res.data.rows
        }
      })
    },
    confirmBtn() {
      recommenAdd({ids: this.checkList.toString()}).then(res=>{
        if(res.code) {

        }
      })
      console.log(this.checkList)
    },
    showDialog() {
      this.searchText = ''
      this.searchList = []
      this.dialogVisible = true
    }
  },
};
</script>