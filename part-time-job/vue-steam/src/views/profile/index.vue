<template>
  <div class="container bg-gray-900">
    <nav-bar></nav-bar>
    <div class="w-4/5 mx-auto my-6 lg:mb-0">
      <el-row :gutter="20" >

        <el-col :span="6" :xs="24">
          <el-card>
            <usercard></usercard>
          </el-card>
        </el-col>

        <el-col :span="18" :xs="24">
          <el-card>
            <el-tabs v-model="activeTab">
              <el-tab-pane label="Activity" name="activity">
                基础信息
              </el-tab-pane>
              <el-tab-pane label="Timeline" name="timeline">
                已购商品
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-col>

      </el-row>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import { reactive } from 'vue'
import Usercard from './usercard.vue';
export default {
  name: 'Profile',
  components: {NavBar, Usercard},
  setup() {

  }
}
</script>
<style lang="scss" scoped>
.el-col /deep/ .el-card,
.el-col /deep/ .el-tabs__item {
  background: none !important;
  color: #fff;
}
.el-col /deep/ .el-tabs__item.is-active {
  color: #409EFF;
}
</style>