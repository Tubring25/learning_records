<template>
  <div class="container mx-auto w-11/12 my-8 py-6">
    <div class="header w-11/12 mx-auto relative">
      <el-button type="primary"  @click="handle(1)">新增</el-button>
    </div>
    <el-table :data="adminList" style="width: 100%">
      <el-table-column prop="id" label="管理员id" width="100" fixed></el-table-column>
      <el-table-column prop="username" label="管理员昵称" width="150"></el-table-column>
      <el-table-column prop="is_finished" label="头像" width="100">
        <template slot-scope="{row}">
          <img :src="'http://localhost:3000/'+row.avatar" alt="暂无" width="50" height="50">
        </template>
      </el-table-column>
      <el-table-column prop="phone" label="手机号码" width="180"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column prop="permission" label="权限">
        <template slot-scope="{row}">
          <span>{{row.permission == '1' ? '超级管理员' : '普通管理员'}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="300" fixed="right">
        <template slot-scope="{row}">
          <el-button type="primary" @click="handle(0,row)" size="mini">查看详情</el-button>
          <el-button type="edit" @click="handle(1,row)" size="mini">编辑</el-button>
          <el-button type="danger" @click="handle(2,row)" size="mini">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="管理员信息" :visible.sync="dialogVisible" width="30%" :close-on-click-modal="false">
      <el-form :model="adminForm" label-width="120"> 
        <el-form-item label="名称">
          <el-input class="w-3/5" v-model="adminForm.username" autocomplete="off" :disabled="noEdit"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input class="w-3/5" v-model="adminForm.password" autocomplete="off" :disabled="noEdit"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input class="w-3/5" v-model="adminForm.phone" autocomplete="off" :disabled="noEdit"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input class="w-3/5" v-model="adminForm.email" autocomplete="off" :disabled="noEdit"></el-input>
        </el-form-item>
        <el-form-item label="权限">
          <el-select class="w-3/5" v-model="adminForm.permission" placeholder="请选择活动区域" :disabled="noEdit">
            <el-option label="超级管理员" value="1"></el-option>
            <el-option label="普通管理员" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="头像">
          <img v-if="noEdit" :src="'http://localhost:3000/' + adminForm.avatar" alt="" width="60" height="60">
          <el-upload v-else class="avatar-uploader" action="http://localhost:3000/admin/game/upload" :show-file-list="false"
            :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <img v-if="adminForm.avatar" :src="'http://localhost:3000/' + adminForm.avatar" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon rounded border border-gray-300 p-14"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer" v-if="!noEdit">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="sumbmit">确 定</el-button>
        </span>
      </template>
    </el-dialog>


  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { addAdmin, updateAdmin, getAdminList, delAdmin } from "@/api/admin";
import moment from "moment";

export default {
  data() {
    return {
      adminList: [],
      count: 0,
      pageNum: 1,
      searchText: "",
      ord_no: "",
      user_id: "",
      dialogVisible: false,
      noEdit: false,
      adminForm: {
        username: "",
        password: "",
        phone: "",
        email: "",
        permission: "",
        avatar: "",
      },
    };
  },
  computed: {
    ...mapGetters(["role"]),
  },
  created() {
    console.log(this.role);
    if (this.role == 1) {
      this.getAdminList_();
    } else {
      this.$alert("暂无权限查看此页面", "WARN", {
        confirmButtonText: "确定",
        showClose: false,
        callback: (action) => {
          this.$router.replace("/");
        },
      });
    }
  },
  methods: {
    getAdminList_() {
      getAdminList().then((res) => {
        if (res.code) {
          this.adminList = res.data;
        }
        console.log(this.adminList);
      });
    },
    handleAvatarSuccess(res, file) {
      console.log(res);
      if(res.code) {
        this.adminForm.avatar = res.path
      }
    },
    beforeAvatarUpload (file){
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG && !isPNG) {
        this.$notify.error("上传头像图片只能是 JPG 或 PNG 格式!");
      }
      if (!isLt2M) {
        this.$notify.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    handle(type, row) {
      this.adminForm = {username: "",password: "",phone: "",email: "",permission: "",avatar: "",}
      if(row) this.adminForm = row
      switch(type) {
        case 0:
          this.noEdit = true
          this.dialogVisible = true
          break
        case 1:
          this.noEdit = false
          this.dialogVisible = true
          break
        case 2:
          delAdmin({id: id}).then(res=>{
            if(res.code) {
              this.getAdminList_()
            }
          })
          break
      }
    },
    sumbmit() {
      let keys = Object.keys(this.adminForm)

      for(let key of keys) {
        if(this.adminForm[key] === null || this.adminForm[key] === '') {
          this.$notify.warning('请检查输入')
          return
        }
      }
      if(this.adminForm.id) {
        updateAdmin(this.adminForm).then(res=>{
          if(res.code) {
            this.dialogVisible = false
            this.getAdminList_()
          }
        })
      } else {
        addAdmin(this.adminForm).then(res=>{
          if(res.code) {
            this.dialogVisible = false
            this.getAdminList_()
          }
        })
      }
    }
  },
};
</script>
