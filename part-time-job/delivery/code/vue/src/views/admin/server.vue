<template>
  <div>
    <router-link to="/regist?type='代取人'"><el-button type="primary">新增代取人</el-button></router-link>
    <el-table :data="serverList" style="width: 100%">
      <el-table-column prop="Server_Name" label="用户名" width="120"></el-table-column>
      <el-table-column prop="gender" label="性别" width="80"></el-table-column>
      <el-table-column prop="Server_Phone" label="手机号"></el-table-column>
      <el-table-column prop="Level" label="评分" width="110"></el-table-column>
      <el-table-column prop="created_at" label="入职日期" width="210"></el-table-column>
      <el-table-column prop="" label="操作" width="180">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="edit(row)">编辑</el-button>
          <el-button type="danger" size="mini" @click="del(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="编辑" :visible.sync="dialogVisible" width="40%" >
      <el-form :model="serverForm" label-width="100px">
        <el-form-item label="用户名" prop="Server_Name">
          <el-input v-model="serverForm.Server_Name"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="Server_Phone">
          <el-input v-model="serverForm.Server_Phone"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="Server_Area">
          <el-input v-model="serverForm.Server_Area"></el-input>
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
import { getServerList, editServer, delServer} from "@/api/admin";
export default {
  data() {
    return {
      serverList: [],
      serverForm: {},
      dialogVisible: false
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      getServerList().then((res) => {
        if (res.code) {
          res.data.rows.map(a=>{
            a.gender = '男'
            a.created_at = a.created_at.slice(0,10)
          })
          this.serverList = res.data.rows;
        }
      });
    },
    edit(row) {
      this.serverForm = row
      this.dialogVisible = true
    },
    submitForm() {
      editServer(this.serverForm).then(res=>{
        if(res.code) {
          this.$message.success('更新成功')
          this.getList()
          this.dialogVisible = false
        }
      })
    },
    del(row) {
      delServer({id: row.id}).then(res=>{
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