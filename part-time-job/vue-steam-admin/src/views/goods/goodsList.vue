<template>
  <div class="container mx-auto w-11/12 my-8 py-6">
    <router-link to="/goods/addGoods"><el-button type="primary">添加商品</el-button></router-link>
    <el-table :data="gameList" style="width: 100%">
      <el-table-column prop="name" label="名称" width="200" fixed></el-table-column>
      <el-table-column prop="" label="封面" width="180">
        <template slot-scope="{row}">
           <el-image style="width: 180px; height: 100px" :src="row.img_list" fit="contain"></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="game_type_name" label="类别" width="120"></el-table-column>
      <el-table-column prop="price" label="价格" width="80"></el-table-column>
      <el-table-column prop="developer" label="开发商" width="180"></el-table-column>
      <el-table-column prop="release_date" label="发行日期" width="130"></el-table-column>
      <el-table-column prop="is_onshelf" label="是否上架" width="80">
        <template slot-scope="{row}"><span>{{row.is_onshelf == false ? '否' : '是'}}</span> </template>
      </el-table-column>
      <el-table-column label="操作" width="240" fixed="right">
        <template slot-scope="{row}">
          <el-button type="info" @click="handle(2,row.id)" size="mini">查看详情</el-button>
          <el-button type="primary" @click="handle(0,row.id)" size="mini">编辑</el-button>
          <el-button type="danger" @click="handle(1,row.id)" size="mini">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { getGoodsType } from '@/api/goodsType'
import { getGames, deleteItem } from '@/api/goods'
export default {
  data() {
    return {
      goodsTypeList: [],
      gameList: []
    }
  },
  created() {
    this.getGoodsType_()
    this.getGameList_()
  },
  methods: {
    getGoodsType_() {
      getGoodsType().then(res=> {
        if(res.code){
          this.goodsTypeList = res.data
        }
      })
    },
    getGameList_() {
      getGames().then(res=>{
        if(res.code) {
          setTimeout(() => {
            for (let i in res.data) {
              res.data[i].release_date = res.data[i].release_date.substring(0,10)
              for (let j in this.goodsTypeList) {
                this.goodsTypeList[j].id
                if(res.data[i].game_type == this.goodsTypeList[j].id) {
                  res.data[i].game_type_name = this.goodsTypeList.[j].name
                }
              }
            }
            this.gameList = res.data
          }, 500);
        }
      })
    },
    handle(type, id) {
      switch (type) {
        case 0:
          this.$router.push({path:'/goods/addGoods', query: {id: id}})
          break;
        case 1:
          console.log(1231231)
          deleteItem({id: id}).then(res=>{
            if(res.code) {
              this.$message.success('删除成功')
              this.getGameList_()
            }
          })
          break;
        case 2:
          this.$router.push({path:'/goods/goodsDetail', query: {id: id}})
        default:
          break;
      }
    }
  },
}
</script>
