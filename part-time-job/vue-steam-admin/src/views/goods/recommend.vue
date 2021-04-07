<template>
  <div class="container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="sm:text-3xl text-2xl font-bold title-font mb-4 text-blue-900" >推荐商品</span>
      </div>
      <el-button type="primary" class=" mx-10 my-5" @click="showDialog(0)">选择商品</el-button>
      <section class="text-gray-600 body-font">
        <div class="container px-5 py-10 mx-auto">
          <div class="flex flex-wrap -m-4">
            <div class="lg:w-1/4 md:w-1/2 p-4 w-full item" v-for="item in recommendList" :key="item.id">
              <i class="el-icon-close icon" @click="deleteClick(item.id, 0)"></i>
              <a class="block relative h-52 rounded overflow-hidden">
                <img alt="ecommerce" class="object-cover object-center w-full h-3/5 block"
                  :src="'http://localhost:3000/'+item.img">
                <h2 class="text-gray-900 title-font text-lg font-medium mt-4 truncate ">{{item.game_name}}</h2>
                <p class="mt-1">{{item.game_price}}</p>
              </a>
            </div>

          </div>
        </div>
      </section>
    </el-card>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="sm:text-3xl text-2xl font-bold title-font mb-4 text-blue-900" >特别优惠</span>
      </div>
      <el-button type="primary" class=" mx-10 my-5" @click="showDialog(1)">选择商品</el-button>
      <section class="text-gray-600 body-font">
        <div class="container px-5 py-10 mx-auto">
          <div class="flex flex-wrap -m-4">
            <div class="lg:w-1/4 md:w-1/2 p-4 w-full item" v-for="item in specSaleList" :key="item.id">
              <i class="el-icon-close icon" @click="deleteClick(item.id, 1)"></i>
              <a class="block relative h-48 rounded overflow-hidden">
                <img alt="ecommerce" class="object-cover object-center w-full h-3/5 block"
                  :src="'http://localhost:3000/'+item.img">
                <h2 class="text-gray-900 title-font text-lg font-medium mt-4 truncate ">{{item.game_name}}</h2>
                <p class="mt-1"><span class="line-through">{{item.game_price}}</span><span class=" ml-4 text-red-500 font-bold">{{item.game_sale_price}}</span></p>
              </a>
            </div>
          </div>
        </div>
      </section>
    </el-card>
    
    <el-dialog title="请选择" :visible.sync="dialogVisible" width="30%" :close-on-click-modal="false">
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
import { recommenAdd, recommenDel, specSaleAdd, specSaleDel, getRecommendList, getSpecSaleList,} from "@/api/recommend";
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
      currentStatus: 0, // 0 推荐 1 优惠
    };
  },
  mounted() {
    this.getRecommendList_()
    this.getSpecSaleList_()
  },
  methods: {
    getRecommendList_() {
      getRecommendList().then(res=>{
        for (let i in res.data.rows) {
          res.data.rows[i].img =  res.data.rows[i].game_img_list.split(',')[0]
        }
        this.recommendList = res.data.rows
      })
    },
    getSpecSaleList_() {
      getSpecSaleList().then(res=>{
        for (let i in res.data.rows) {
          res.data.rows[i].img =  res.data.rows[i].game_img.split(',')[0]
        }
        this.specSaleList = res.data.rows
      })
    },
    searchGoods () {
      if(this.searchText.trim() == '') {
        this.$message.warning('请输入关键词')
        return
      }
      let searchCon
      this.currentStatus == 0 ? searchCon = {pageNum:1, pageSize: 500, title: this.searchText, is_onshelf: 1} : searchCon =  {pageNum:1, pageSize: 500, title: this.searchText, is_onshelf: 1, is_sale: 1}
      getGames(searchCon).then(res=>{
        if(res.code) {
          this.searchList = res.data.rows
          if(res.data.count==0){
            this.$message.info('查询结果为空')
          }
        }
      })
    },
    confirmBtn() {
      if(this.currentStatus == 0) {
        recommenAdd({ids: this.checkList.toString()}).then(res=>{
          if(res.code) {
            this.checkList = []
            this.searchList = []
            this.dialogVisible = false
            this.getRecommendList_()
          }
        })
      } else {
        specSaleAdd({ids: this.checkList.toString()}).then(res=>{
          if(res.code) {
            this.checkList = []
            this.searchList = []
            this.dialogVisible = false
            this.getSpecSaleList_()
          }
        })
      }
    },
    deleteClick(id, type){
      this.$alert('确认移除吗', '移除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if(type==0) {
          recommenDel({id:id}).then(res=>{
            if(res.code) {
              this.$notify({ title: '成功', message: '删除成功', type: 'success'});
              this.getRecommendList_()
            }
          })
        } else {
          specSaleDel({id:id}).then(res=>{
            if(res.code) {
              this.$notify({ title: '成功', message: '删除成功', type: 'success'});
              this.getSpecSaleList_()
            }
          })
        }
      })
    },
    showDialog(type) {
      this.currentStatus = type
      this.searchText = ''
      this.searchList = []
      this.dialogVisible = true
    }
  },
};
</script>
<style lang="scss" scoped>
.item {
  position: relative;
  .icon {
    position: absolute;
    right: 0px;
    top: 0px;
    height: 16px;
    width: 16px;
    font-size: 6px;
    text-align: center;
    line-height: 16px;
    background: rgb(197, 226, 245);
    color: #fff;
    border-radius: 8px;
  }
  .icon:hover {
    color: rgb(197, 226, 245);
    background: #409EFF;
    cursor: pointer;
  }
}
</style>