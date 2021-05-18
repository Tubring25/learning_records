<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="20">
        <div class="info">
          <img :src="'http://localhost:3003/' + userInfo.Customer_Avatar" alt="">
          <p class="name">{{userInfo.Customer_Name}}</p>
          <p class="phone">
            <span>手机号码<br>{{userInfo.Customer_Phone}}</span><span>收货地址<br>{{userInfo.Customer_District}}</span></p>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="message-box">
          <p>支付设置</p>
          <p>账户设置</p>
          <p>通用设置</p>
          <p>
            <el-badge :value="12">消息</el-badge>
          </p>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userInfo: {},
    };
  },
  created() {
    this.userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
  },
};
</script>
<style lang="scss" scoped>
.el-row {
  width: 80%;
  margin: 20px auto;
  .info {
    text-align: center;
    img {
      display: block;
      width: 300px;
      height: 300px;
      margin: 0 auto;
    }
    .name {
      margin: 10px 0;
    }
    .phone {
      span {
        display: inline-block;
        height: 80px;
        background: green;
        color: #fff;
        line-height: 20px;
        padding: 20px 20px;
      }
    }
  }
  .message-box{
    background: orange;
    width: 300px;
    color: #fff;
    p {
      padding: 10px 10px;
      border-bottom: 1px solid #fff;
      margin: 0;
      cursor: pointer;
    }
  }
}
</style>