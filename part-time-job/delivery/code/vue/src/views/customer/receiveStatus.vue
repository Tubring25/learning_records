<template>
  <div>
    <el-table :data="feedbackList" style="width: 90%; margin: 20px auto">
      <el-table-column prop="Order_ID" label="订单号" width="220"></el-table-column>
      <el-table-column prop="Server_Level" label="评价" width="180"></el-table-column>
      <el-table-column prop="Feedback_Content" label="内容" width="180"></el-table-column>
      <el-table-column prop="status" label="状态" width="180">
        <template slot-scope="{row}">
          <div>
            {{row.status == 1 ? '完成' : '进行中'}}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="Manager_Content" label="管理员回复"></el-table-column>
    </el-table>
  </div>
</template>
<script>
import { getFeedbackList } from "@/api/customer";
export default {
  data() {
    return {
      feedbackList: [],
      userInfo: {},
    };
  },
  created() {
    this.userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
    this.getList();
  },
  methods: {
    getList() {
      getFeedbackList({ Customer_ID: this.userInfo.id }).then((res) => {
        if (res.code) {
          this.feedbackList = res.data;
        }
      });
    },
  },
};
</script>
