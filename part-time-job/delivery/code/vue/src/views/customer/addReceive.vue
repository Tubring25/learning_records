<template>
  <div class="login-container">
    <el-form :model="customerForm" :rules="customerRules" label-width="140px">
      <el-form-item label="订单号" prop="Order_ID">
        <el-input v-model="customerForm.Order_ID"></el-input>
      </el-form-item>
      <el-form-item label="代取人评分" prop="Server_Level">
        <el-input v-model="customerForm.Server_Level" type="number"></el-input>
      </el-form-item>
      <el-form-item label="反馈内容" prop="Feedback_Content">
        <el-input v-model="customerForm.Feedback_Content" type="textarea" :rows="4"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button @click="cancle">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addFeedback } from "@/api/customer";
export default {
  name: "Login",
  data() {
    return {
      customerForm: {Feedback_Content: '',Order_ID: '', Customer_ID: '',Server_Level: ''},
      customerRules: {
        Feedback_Content: [{ required: true }],
        Order_ID: [{ required: true }],
        Server_Level: [{ required: true }]
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
      addFeedback(this.customerForm).then((res) => {
        if (res.code) {
          this.$message.success('创建成功')
          this.$router.replace("/customerReceive/receiveStatus");
        }
      });
    },
    cancle() {
      this.$router.replace("/customerReceive/receiveStatus");
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
