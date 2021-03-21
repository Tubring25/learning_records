<template>
  <div class="container mx-auto w-11/12 bg-gray-400 my-8 py-6">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="商品名称">
        <el-input class="w-2/3" v-model="goodsForm.name" maxlength="50"></el-input>
      </el-form-item>
      <el-form-item label="商品介绍">
        <el-input class="w-2/3" v-model="goodsForm.desc" type="textarea" maxlength="500"></el-input>
      </el-form-item>
      <el-form-item label="商品图片">
        
      </el-form-item>
      <el-form-item label="发行日期">
        <el-date-picker v-model="goodsForm.release_date" type="date" placeholder="选择日期"></el-date-picker>
      </el-form-item>
      <el-form-item label="开发商">
        <el-input class="w-2/3" v-model="goodsForm.developer" type="textarea" maxlength="500"></el-input>
      </el-form-item>
      <el-form-item label="发行商">
        <el-input class="w-2/3" v-model="goodsForm.publisher" type="textarea" maxlength="500"></el-input>
      </el-form-item>
      <el-form-item label="游戏类型">

      </el-form-item>
      <el-form-item label="运行平台">

      </el-form-item>
      <el-form-item label="发行价格">
        <el-input class="w-2/3" v-model="goodsForm.price" type="number" min="0"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "AddGoods",
  data() {
    return {
      goodsForm: {
        name: "",
        desc: "",
        img_list: [],
        release_date: "",
        developer: "", // 开发商
        publisher: "", // 发行商
        game_type: [], // 游戏类型
        platform: null, // 运行平台
        price: null, // 发行价格
      },
    };
  },
};
</script>