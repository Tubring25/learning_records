<template>
  <div>
    <el-table :data="feedbackList" style="width: 100%">
      <el-table-column prop="Order_ID" label="订单号" width="120"></el-table-column>
      <el-table-column prop="Customer_ID" label="用户ID" width="80"></el-table-column>
      <el-table-column prop="Server_Level" label="评分"></el-table-column>
      <el-table-column prop="Manager_Content" label="管理员回复" width="110"></el-table-column>
      <el-table-column prop="created_at" label="创建日期" width="210"></el-table-column>
      <el-table-column prop="" label="操作" width="180">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="edit(row)" v-if="row.status == false">回复</el-button>
          <span v-else>已完成</span>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="编辑" :visible.sync="dialogVisible" width="40%" >
      <el-form :model="feedbackForm" label-width="100px">
        <el-form-item label="回复内容" prop="Feedback_Content">
        <el-input v-model="feedbackForm.Manager_Content" type="textarea" :rows="4"></el-input>
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
import { getFeedbackList, editFeedbackList} from "@/api/admin";
export default {
  data() {
    return {
      feedbackList: [],
      feedbackForm: {},
      dialogVisible: false
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      getFeedbackList().then((res) => {
        if (res.code) {
          this.feedbackList = res.data;
        }
      });
    },
    edit(row) {
      this.feedbackForm = row
      this.dialogVisible = true
    },
    submitForm() {
      editFeedbackList(this.feedbackForm).then(res=>{
        if(res.code) {
          this.$message.success('更新成功')
          this.getList()
          this.dialogVisible = false
        }
      })
    },
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