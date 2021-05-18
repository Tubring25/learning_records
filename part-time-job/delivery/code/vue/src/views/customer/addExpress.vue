<template>
  <div class="login-container">
    <el-form :model="customerForm" :rules="customerRules" label-width="140px">
      <el-form-item label="快递单号" prop="Order_No">
        <el-input v-model="customerForm.Order_No"></el-input>
      </el-form-item>
      <el-form-item label="快递件数" prop="Order_Num">
        <el-input v-model="customerForm.Order_Num" type="number"></el-input>
      </el-form-item>
      <el-form-item label="快递位置" prop="Expressage_Location">
        <el-input v-model="customerForm.Expressage_Location"></el-input>
      </el-form-item>
      <el-form-item label="快递收货人姓名" prop="Customer_Name">
        <el-input v-model="customerForm.Customer_Name"></el-input>
      </el-form-item>
      <el-form-item label="送达地址" prop="Customer_District">
        <el-input v-model="customerForm.Customer_District"></el-input>
      </el-form-item>
      <el-form-item label="期望送达时间" prop="time">
        <el-date-picker v-model="customerForm.time" type="datetime" placeholder="选择日期时间"></el-date-picker>
      </el-form-item>
      <el-form-item label="手机号" prop="Customer_Phone">
        <el-input v-model="customerForm.Customer_Phone" type="number"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">立即创建</el-button>
        <el-button @click="cancle">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addExpress } from "@/api/customer";
import { serverRegist } from "@/api/server";
export default {
  name: "Login",
  data() {
    return {
      customerForm: { Order_No: "",time: '', Customer_ID: null, Order_Num: 0, Expressage_Location:'', Customer_Name: '',Customer_District: '',Customer_Phone: ''},
      customerRules: {
        Order_No: [{ required: true }],
        Expressage_Location: [{ required: true }],
        Customer_Name: [{ required: true }],
        Customer_District: [{ required: true }],
        time: [{ required: true }],
        Customer_Phone: [{ required: true }],
      },
      userInfo: {}
    };
  },
  created() {
    this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
    this.customerForm.Customer_ID = this.userInfo.id
  },
  methods: {
    submitForm() {
      addExpress(this.customerForm).then((res) => {
        if (res.code) {
          this.$message.success('创建成功')
          this.$router.replace("/customerOrder/order");
        }
      });
    },
    cancle() {
      this.$router.replace("/customerOrder/order");
    },
  },
};
</script>

<style lang="scss" scoped>
$bg: #04723f;
$dark_gray: #889aa4;
$light_gray: #eee;

.nav-bar {
  height: 50px;
  line-height: 50px;
  background: $bg;
  font-size: 30px;
  color: #fff;
  position: relative;
  .title {
    position: absolute;
    font-size: 30px;
    left: 50%;
    transform: translateX(-50%);
  }
}
.el-form {
  width: 60%;
  margin: 30px auto;
}
</style>
