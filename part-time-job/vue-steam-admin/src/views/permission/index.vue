<template>
  <div class="container mx-auto w-11/12 my-8 py-6">
    <el-table :data="adminList" style="width: 100%">
      <el-table-column prop="id" label="管理员id" width="100" fixed></el-table-column>
      <el-table-column prop="username" label="管理员昵称" width="120"></el-table-column>
      <el-table-column prop="is_finished" label="头像" width="100">
        <template slot-scope="{row}">
          <img :src="'http://localhost:3000/'+row.avatar" alt="暂无" width="50" height="50">
        </template>
      </el-table-column>
      <el-table-column prop="phone" label="手机号码" width="150"></el-table-column>
      <el-table-column prop="email" label="邮箱" ></el-table-column>
      <el-table-column prop="permission" label="权限">
        <template slot-scope="{row}">
          <span>{{row.permission == '1' ? '超级管理员' : '普通管理员'}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180" fixed="right">
        <template slot-scope="{row}">
          <el-button type="primary" @click="handle(0,row.id)" size="mini">查看详情</el-button>
          <el-button type="edit" @click="handle(1,row.id)" size="mini">编辑</el-button>
          <el-button type="danger" @click="handle(2,row.id)" size="mini">删除</el-button>
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
import { addAdmin, updateAdmin, getAdminList, delAdmin } from '@/api/admin'
import moment from 'moment'

export default {
  data() {
    return {
      adminList: [],
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
    console.log(this.role)
    if(this.role == 1) {
      this.getadminList_()
    } else {
      this.$alert('暂无权限查看此页面', 'WARN', {
        confirmButtonText: '确定',
        showClose: false,
        callback: action => {
          this.$router.replace('/')
        }
      });
    }
  },
  methods: {
    getadminList_() {
      getadminList().then(res=> {
        if(res.code) {
          this.adminList = res.data
        }
        console.log(this.adminList)
      })
    },
    handle(id) {
      
    },
    handleCurrentChange(val) {
      this.pageNum = val
      this.getadminList_()
    }
  },
}
</script>
