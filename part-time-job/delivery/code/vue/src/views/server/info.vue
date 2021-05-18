<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="20">
        <div class="info">
          <img :src="'http://localhost:3003/' + userInfo.Server_Avatar" alt="">
          <p class="name">{{userInfo.Server_Name}}</p>
          <p class="phone">
            <span>手机号码<br>{{userInfo.Server_Phone}}</span><span>负责区域<br>{{userInfo.Server_Area}}</span></p>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="message-box">
          <p><span>代取人评分</span><el-tag type="success" size="mini" >4.5</el-tag></p>
          <p><span>消息</span><el-tag type="success" size="mini">10</el-tag></p>
          <p><span>代取人类型</span><el-tag type="success" size="mini">快递代收</el-tag></p>
          <p>
            设置
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
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
  }
}
</style>