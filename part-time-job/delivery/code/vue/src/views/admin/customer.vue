<template>
  <div>
    <router-link to="/regist?type='代取人'"><el-button type="primary">新增顾客</el-button></router-link>
    <el-table :data="customerList" style="width: 100%">
      <el-table-column prop="Customer_Name" label="用户名" width="120"></el-table-column>
      <el-table-column prop="Customer_RealName" label="真实姓名" width="120"></el-table-column>
      <el-table-column prop="Customer_Gender" label="性别" width="80"></el-table-column>
      <el-table-column prop="Customer_Phone" label="手机号"></el-table-column>
      <el-table-column prop="num" label="下单总量" width="110"></el-table-column>
      <el-table-column prop="money" label="下单总金额" width="110"></el-table-column>
      <el-table-column prop="" label="操作" width="180">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="edit(row)">编辑</el-button>
          <el-button type="danger" size="mini" @click="del(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="编辑" :visible.sync="dialogVisible" width="40%" >
      <el-form :model="customerForm" label-width="100px">
        <el-form-item label="用户名" prop="Customer_Name">
          <el-input v-model="customerForm.Customer_Name"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名" prop="Customer_RealName">
          <el-input v-model="customerForm.Customer_RealName"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="Customer_Gender">
          <el-radio-group v-model="customerForm.Customer_Gender">
            <el-radio label="女"></el-radio>
            <el-radio label="男"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="手机号码" prop="Customer_Phone">
          <el-input v-model="customerForm.Customer_Phone"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="Customer_District">
          <el-input v-model="customerForm.Customer_District"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button type="info" @click="dialogVisible = false">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { getCustomerList, editCustomer, delCustomer } from "@/api/admin";
export default {
  data() {
    return {
      customerList: [],
      customerForm: {},
      dialogVisible: false
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      getCustomerList().then((res) => {
        if (res.code) {
          res.data.rows.map(a=>{
            a.num = Math.random().toFixed(2) * 100
            a.money = Math.random().toFixed(2) * 100 + Math.random().toFixed(2)
          })
          this.customerList = res.data.rows;
        }
      });
    },
    edit(row) {
      this.customerForm = row
      this.dialogVisible = true
    },
    submitForm() {
      editCustomer(this.customerForm).then(res=>{
        if(res.code) {
          this.$message.success('更新成功')
          this.getList()
          this.dialogVisible = false
        }
      })
    },
    del(row) {
      delCustomer({id: row.id}).then(res=>{
        if(res.code) {
          this.$message.success('删除成功')
          this.getList()
        }
      })
    }
  },
};
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