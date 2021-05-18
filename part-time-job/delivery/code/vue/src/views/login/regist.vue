<template>
  <div class="login-container">
    <div class="nav-bar">
      校园代收代取服务系统
      <span class="title">{{type=='代取人'? '代取人注册' : '用户注册'}}</span>
    </div>
    <div class="container">
      <el-form :model="customerForm" :rules="customerRules" label-width="100px" v-if="type=='顾客'">
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
        <el-form-item label="密码" prop="Customer_Code">
          <el-input v-model="customerForm.Customer_Code"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="Customer_Code">
          <el-input v-model="repeatCode"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="Customer_Phone">
          <el-input v-model="customerForm.Customer_Phone"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="Customer_District">
          <el-input v-model="customerForm.Customer_District"></el-input>
        </el-form-item>
        <el-form-item label="上传头像">
          <el-upload class="upload-demo" action="http://localhost:3003/login/upload"
            :on-success="getImgPath" :file-list="fileList" list-type="picture" :limit="1" style="width:400px">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过4M</div>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">立即创建</el-button>
          <el-button @click="cancle">取消</el-button>
        </el-form-item>
      </el-form>
      <el-form :model="serverForm" :rules="serverRules" label-width="100px" v-else>
        <el-form-item label="用户名" prop="Server_Name">
          <el-input v-model="serverForm.Server_Name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="Server_Code">
          <el-input v-model="serverForm.Server_Code"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="Customer_Code">
          <el-input v-model="repeatCode"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="Server_Phone">
          <el-input v-model="serverForm.Server_Phone"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="Server_Area">
          <el-input v-model="serverForm.Server_Area"></el-input>
        </el-form-item>
        <el-form-item label="上传头像" prop="">
          <el-upload class="upload-demo" action="http://localhost:3003/login/upload"
            :on-success="getImgPath" :file-list="fileList" list-type="picture" :limit="1" style="width:400px">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过4M</div>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">立即创建</el-button>
          <el-button @click="cancle">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { customerRegist } from '@/api/customer'
import { serverRegist } from '@/api/server'
export default {
  name: "Login",
  data() {
    return {
      type: '顾客',
      fileList: [],
      repeatCode: '',
      customerForm: {Customer_Name: '',Customer_RealName: '', Customer_Code: '', Customer_Phone: '', Customer_District: '', Customer_Gender: '0',Customer_Avatar:''  },
      customerRules: {
        Customer_Name: [{ required: true}],
        Customer_Code: [{ required: true}],
        Customer_Phone: [{ required: true}],
        Customer_District: [{ required: true}],
      },
      serverForm: {Server_Name: '', Server_Code: '', Server_Phone: '',Server_Area: '',Server_Avatar: ''},
      serverRules: {
        Server_Name: [{ required: true}],
        Server_Code: [{ required: true}],
        Server_Phone: [{ required: true}],
        Server_Area: [{ required: true}],
      },
    };
  },
  created() {
    if (this.$route.query.type) {
      this.type = this.$route.query.type;
    }
  },
  methods: {
    submitForm() {
      if(this.type == '顾客') {
        if(this.fileList.length>0) this.customerForm.Customer_Avatar = this.fileList[0].code
        customerRegist(this.customerForm).then(res=>{
          if(res.code) {
            this.$message.success('注册成功')
            this.$router.replace('/login')
          }
        })
      } else {
        if(this.fileList.length>0) this.serverForm.Server_Area = this.fileList[0].code
        serverRegist(this.serverForm).then(res=>{
          if(res.code) {
            this.$message.success('注册成功')
            this.$router.replace('/login')
          }
        })
      }
      
    },
    cancle() {
      this.$router.replace('/login')
    },
    getImgPath(res) {
      this.type == '顾客' ? this.customerForm.Customer_Avatar = res.path : this.serverForm.Server_Avatar = res.path
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
