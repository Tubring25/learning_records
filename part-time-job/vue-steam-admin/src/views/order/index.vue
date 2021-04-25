<template>
  <div class="container mx-auto w-11/12 my-8 py-6">
    <el-table :data="orderList" style="width: 100%">
      <el-table-column prop="order_no" label="订单号" width="200" fixed></el-table-column>
      <el-table-column prop="user_id" label="用户id" width="100">
      </el-table-column>
      <el-table-column prop="num" label="商品数量" width="120"></el-table-column>
      <el-table-column prop="money" label="总价" width="80"></el-table-column>
      <el-table-column prop="is_finished" label="是否完成" width="180">
        <template slot-scope="{row}">
          {{row.is_finished ? '已完成' : '未完成'}}
          <el-button v-if="row.is_finished == false && role == 1" type="success" size="mini" @click="finishOrder(row.id)">完成</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="created_at" label="下单时间" width="180"></el-table-column>
      <el-table-column prop="updated_at" label="更新时间" width="180">
      </el-table-column>
      <el-table-column label="操作" width="140" fixed="right">
        <template slot-scope="{row}">
          <el-button type="info" @click="handle(row.id)" size="mini">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @current-change="handleCurrentChange" :current-page.sync="pageNum"
      :page-size="10"
      layout="total, prev, pager, next"
      :total="count">
    </el-pagination>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { getOrderList, getOrderById, delOrder, updateOrder } from '@/api/order'
import moment from 'moment'

export default {
  data() {
    return {
      orderList: [],
      count: 0,
      pageNum: 1,
      searchText: '',
      ord_no: '',
      user_id: '',
    }
  },
  computed: {
    ...mapGetters([
      'role'
    ])
  },
  created() {
    this.getOrderList_()
  },
  methods: {
    getOrderList_() {
      getOrderList({pageSize: 10, pageNum: this.pageNum, user_id: this.user_id, ord_no: this.ord_no}).then(res=> {
        if(res.code) {
          if(res.data.count > 0) {
            res.data.rows.map(a=>{
              a.created_at =  moment(a.created_at).utcOffset(480).format("YYYY-MM-DD HH:mm:ss");
              a.updated_at =  moment(a.updated_at).utcOffset(480).format("YYYY-MM-DD HH:mm:ss");
            })
            this.count = res.data.count
            this.orderList = res.data.rows
          } else {
            this.count = 0
            this.orderList = []
          }
        }
      })
    },
    finishOrder(id) {
      updateOrder({id:id}).then(res=>{
        if(res.code) {
          this.getOrderList_()
        }
      })
    },
    handle(id) {
      this.$router.push({path:'/order/detail', query: {id: id}})
    },
    handleCurrentChange(val) {
      this.pageNum = val
      this.getOrderList_()
    }
  },
}
</script>
