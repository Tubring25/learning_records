<template>
  <div class="container mx-auto w-11/12 my-8 py-6">
    <el-table :data="userList" style="width: 100%">
      <el-table-column prop="id" label="用户id" width="100" fixed></el-table-column>
      <el-table-column prop="username" label="用户昵称" width="120"></el-table-column>
      <el-table-column prop="is_finished" label="头像" width="100">
        <template slot-scope="{row}">
          <img :src="'http://localhost:3000/'+row.avatar" alt="暂无" width="50" height="50">
        </template>
      </el-table-column>
      <el-table-column prop="phone" label="手机号码" width="150"></el-table-column>
      <el-table-column prop="email" label="邮箱" ></el-table-column>
      <el-table-column prop="created_at" label="注册时间"></el-table-column>
      <el-table-column prop="num" label="已购数量" width="120"></el-table-column>
      <el-table-column prop="money" label="总金额" width="80"></el-table-column>
      <el-table-column label="操作" width="140" fixed="right">
        <template slot-scope="{row}">
          <el-button type="info" @click="handle(row.id)" size="mini">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- <el-pagination @current-change="handleCurrentChange" :current-page.sync="pageNum"
      :page-size="10"
      layout="total, prev, pager, next"
      :total="count">
    </el-pagination> -->
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { getUserList } from '@/api/user'
import moment from 'moment'

export default {
  data() {
    return {
      userList: [],
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
    this.getuserList_()
  },
  methods: {
    getuserList_() {
      getUserList().then(res=> {
        if(res.code) {
          if(res.data.length > 0) {
            res.data.map(a=>{
              let single = Object.assign({}, a.baseInfo, a.orderInfo)
              single.created_at = moment(single.created_at).utcOffset(480).format("YYYY-MM-DD HH:mm:ss");
              this.userList.push(single)
            })
          } else {
            this.userList = []
          }
        }
        console.log(this.userList)
      })
    },
    handle(id) {
      this.$router.push({path:'/user/detail', query: {id: id}})
    },
    handleCurrentChange(val) {
      this.pageNum = val
      this.getuserList_()
    }
  },
}
</script>
