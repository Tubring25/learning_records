<template>
  <div class="login-container">
    <el-form :model="customerForm" :rules="customerRules" label-width="140px">
      <el-form-item label="订单号" prop="Order_No">
        <el-input v-model="customerForm.Order_No"></el-input>
      </el-form-item>
      <el-form-item label="外卖商品类型" prop="type">
        <el-input v-model="customerForm.type"></el-input>
      </el-form-item>
      <el-form-item label="价格" prop="Order_Money">
        <el-input v-model="customerForm.Order_Money"></el-input>
      </el-form-item>
      <el-form-item label="外卖配送员手机号" prop="Sender_Phone">
        <el-input v-model="customerForm.Sender_Phone" ></el-input>
      </el-form-item>
      <el-form-item label="外卖收货人姓名" prop="Customer_Name">
        <el-input v-model="customerForm.Customer_Name"></el-input>
      </el-form-item>
      <el-form-item label="送达地址" prop="Customer_District">
        <el-input v-model="customerForm.Customer_District"></el-input>
      </el-form-item>
      <el-form-item label="顾客手机号" prop="Customer_Phone">
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
import { addTakeOut } from "@/api/customer";
export default {
  name: "Login",
  data() {
    return {
      customerForm: { Order_No: "",type: '', Sender_Phone: '',Order_Money: '', Customer_ID: null, Customer_Name: '',Customer_District: '',Customer_Phone: ''},
      customerRules: {
        Order_No: [{ required: true }],
        Order_Money: [{ required: true }],
        Sender_Phone: [{ required: true }],
        Customer_Name: [{ required: true }],
        Customer_District: [{ required: true }],
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
      addTakeOut(this.customerForm).then((res) => {
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
