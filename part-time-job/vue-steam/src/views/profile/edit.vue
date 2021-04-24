<template>
  <div class="sub-container">
    <section class="text-gray-600 body-font relative">
      <div class="container px-5 py-24 mx-auto">
        <div class="flex flex-col text-center w-full mb-12">
          <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">修改个人信息</h1>
        </div>
        <div class="lg:w-1/2 md:w-2/3 mx-auto">
          <div class="flex flex-wrap -m-2">
            <div class="p-2 w-1/3">
              <div class="relative">
                <label for="name" class="leading-7 text-sm text-gray-600">用户名</label>
                <input type="text" id="name" name="name" v-model="userInfo.username"
                  class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
              </div>
            </div>
            <div class="p-2 w-1/3">
              <div class="relative">
                <label for="email" class="leading-7 text-sm text-gray-600">电话</label>
                <input type="number" id="email" name="email" v-model="userInfo.phone"
                  class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
              </div>
            </div>
            <div class="p-2 w-1/3">
              <div class="relative">
                <label for="email" class="leading-7 text-sm text-gray-600">邮箱</label>
                <input type="email" id="email" name="email" v-model="userInfo.email"
                  class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
              </div>
            </div>
            <div class="p-2 w-1/5">
              <div class="relative">
                <label for="message" class="leading-7 text-sm text-gray-600">头像</label>
                <el-upload class="avatar-uploader" action="http://localhost:3000/admin/game/upload"
                  :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                  <img v-if="userInfo.avatar" :src="'http://localhost:3000/' + userInfo.avatar" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon rounded border border-gray-300"></i>
                </el-upload>
              </div>
            </div>
            <div class="p-2 w-4/5">
              <div class="relative">
                <label for="message" class="leading-7 text-sm text-gray-600">个人简介</label>
                <textarea id="message" name="message" v-model="userInfo.description"
                  class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
              </div>
            </div>
            <div class="p-2 w-1/2 mx-auto flex-row justify-around">
              <button @click="cancleBtn"
                class="text-gray-900 bg-gray-200 border-0 py-2 px-8 mr-2 focus:outline-none hover:bg-gray-50 rounded text-lg">Cancle</button>
              <button @click="updataInfo"
                class="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Submit</button>
              
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { getInfo, setInfo } from '@/utils/auth'
import { ref } from "vue";
import { ElNotification } from "element-plus";
import { updateUserInfo } from '@/api/user'
import { isEmail, validatePhoneNumber } from '@/utils/filter'
import { useRouter } from 'vue-router'

export default {
  name: "edit",
  setup(props) {
    const router = useRouter()
    const userInfo = ref(JSON.parse(getInfo('vue_steam')))

    const handleAvatarSuccess = (res, file) => {
      console.log(res);
      if(res.code) {
        userInfo.value.avatar = res.path
      }
    };
    const beforeAvatarUpload = (file) => {
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG && !isPNG) {
        ElNotification.error("上传头像图片只能是 JPG 或 PNG 格式!");
      }
      if (!isLt2M) {
        ElNotification.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    };

    const updataInfo = () => {
      if(!userInfo.value.username) {
        ElNotification.warning('请输入用户名')
        return
      }
      if(!userInfo.value.email) {
        ElNotification.warning('请输入邮箱')
        return
      }
      updateUserInfo(userInfo.value).then(res=>{
        if(res.code) {
          setInfo('vue_steam', JSON.stringify(userInfo.value))
          router.replace('/profile')
        }
      })
    }
    const cancleBtn = () => {
      router.replace('/profile')
    }

    return {
      handleAvatarSuccess,
      beforeAvatarUpload,
      userInfo,
      updataInfo,
      cancleBtn
    };
  },
};
</script>
<style lang="scss" scoped>
.avatar{
  width: 130px !important;
  height: 130px !important;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 130px;
  height: 130px;
  line-height: 130px;
  text-align: center;
  background: #F9F9FA;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>