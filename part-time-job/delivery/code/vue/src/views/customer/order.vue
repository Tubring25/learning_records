<template>
  <div>
    <router-link to="/customerOrder/addExpress"><div class="box" style="background-color: #49DE7D;">快递代收订单发起</div></router-link>
    <router-link to="/customerOrder/addTakeOut"><div class="box" style="background-color: #4B8BDB">外卖代取订单发起</div></router-link>
    <div class="title">历史订单</div>
    <el-tabs v-model="activeName" type="card" style="width: 90%;margin: 10px auto">
      <el-tab-pane label="快递订单" name="first">
        <el-table :data="expressList" style="width: 100%">
          <el-table-column prop="Order_ID" label="订单号" width="220"></el-table-column>
          <el-table-column prop="Order_No" label="快递单号" width="180"></el-table-column>
          <el-table-column prop="Customer_Phone" label="手机号" width="180"></el-table-column>
          <el-table-column prop="Customer_District" label="地址" width="180"></el-table-column>
          <el-table-column prop="Server_ID" label="代取人" width="180"></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="外卖订单" name="second">
        <el-table :data="takeoutList" style="width: 100%">
          <el-table-column prop="Order_ID" label="订单号" width="220"></el-table-column>
          <el-table-column prop="Order_No" label="快递单号" width="180"></el-table-column>
          <el-table-column prop="Customer_Phone" label="手机号" width="180"></el-table-column>
          <el-table-column prop="Customer_District" label="地址" width="180"></el-table-column>
          <el-table-column prop="Server_ID" label="代取人" width="180"></el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { getExpressList, getTakeOutList } from '@/api/customer'
export default {
  data() {
    return {
      activeName: 'first',
      expressList: [],
      takeoutList: [],
      userInfo: {}
    }
  },
  created() {
    this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
    this.getList()

  },
  methods: {
    getList() {
      getExpressList({Customer_ID: this.userInfo.id}).then(res=>{
        if(res.code) {
          this.expressList = res.data
        }
      })
      getTakeOutList({Customer_ID: this.userInfo.id}).then(res=>{
        if(res.code) {
          this.takeoutList = res.data
        }
      })
    }
  },

}
</script>

<style lang="scss" scoped>
.box {
  width: 80%;
  margin: 10px auto;
  color: #fff;
  font-size: 40px;
  font-weight: bold;
  text-align: center;
  height: 200px;
  line-height: 200px; 
  cursor: pointer;
}
.title {
  width: 90%;
  margin: 10px auto;
  color: #fff;
  height: 50px;
  line-height: 50px; 
  background-color: gray;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
}
</style>