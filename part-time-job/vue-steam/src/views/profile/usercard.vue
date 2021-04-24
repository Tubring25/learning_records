<template>
  <el-card style="margin-bottom:20px;">
    <div slot="header" class="clearfix flex flex-row justify-between">
      <span>About me</span>
      <el-button type="info" size="mini" @click="goEdit">Edit</el-button>
    </div>

    <div class="user-profile">
      <div class="box-center">
        <img v-if="userInfo.avatar" :src="'http://localhost:3000/' + userInfo.avatar" alt="">
        <img v-else src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQu3LGEs4AnOeHUs08Q310kkFXQ63puAVPZyg&usqp=CAU" alt="">
      </div>
      <div class="box-center">
        <div class="user-name text-center">{{userInfo.username}}</div>
      </div>
    </div>

    <div class="user-bio">
      <div class="user-education user-bio-section">
        <div class="user-bio-section-header"><span>Description</span></div>
        <div class="user-bio-section-body">
          <div class="text-muted">
            {{userInfo.description}}
          </div>
        </div>
      </div>

      <div class="user-skills user-bio-section">
        <div class="user-bio-section-header"><span>Contact</span></div>
        <div class="user-bio-section-body">
          <div class="progress-item">
            <span>Phone:{{userInfo.phone}}</span>
          </div>
          <div class="progress-item">
            <span>Email:{{userInfo.email}} </span>
          </div>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
import { getInfo } from '@/utils/auth'
import { useRouter } from 'vue-router'

export default {
  setup(props) {
    const userInfo = JSON.parse(getInfo('vue_steam'))
    const router = useRouter()

    const goEdit = () => {
      router.push('/profile/edit')
    }

    return {
      userInfo,
      goEdit
    }
  }
}
</script>

<style lang="scss" scoped>
.box-center {
  margin: 0 auto;
  display: table;
}
.text-muted {
  color: #777;
}
.user-profile {
  .user-name {
    font-weight: bold;
  }
  .box-center {
    padding-top: 10px;
  }
  .user-role {
    padding-top: 10px;
    font-weight: 400;
    font-size: 14px;
  }
  .box-social {
    padding-top: 30px;
    .el-table {
      border-top: 1px solid #dfe6ec;
    }
  }
  .user-follow {
    padding-top: 20px;
  }
}
.user-bio {
  margin-top: 20px;
  color: #606266;
  span {
    padding-left: 4px;
  }
  .user-bio-section {
    font-size: 14px;
    padding: 15px 0;
    .user-bio-section-header {
      border-bottom: 1px solid #dfe6ec;
      padding-bottom: 10px;
      margin-bottom: 10px;
      font-weight: bold;
    }
  }
}
.progress-item {
  margin: 10px 0;
}
</style>