<template>
  <div class="container mx-auto w-11/12 my-8 py-6">
    <h2 class=" m-8 text-2xl font-bold text-indigo-900">基础信息</h2>
    <el-form :model="goodsForm" label-width="80px">
      <el-form-item label="商品名称">
        <el-input class="w-2/3" v-model="goodsForm.name" maxlength="50"></el-input>
      </el-form-item>
      <el-form-item label="商品介绍">
        <el-input class="w-2/3" v-model="goodsForm.desc" type="textarea" maxlength="500"></el-input>
      </el-form-item>
      <el-form-item label="商品图片">
        <el-input class="w-2/3" v-model="goodsForm.img_list" type="textarea" maxlength="500"></el-input>
      </el-form-item>
      <el-form-item label="发行日期">
        <el-date-picker v-model="goodsForm.release_date" type="date" placeholder="选择日期"></el-date-picker>
      </el-form-item>
      <el-form-item label="开发商">
        <el-input class="w-2/3" v-model="goodsForm.developer" maxlength="500"></el-input> 
      </el-form-item>
      <el-form-item label="发行商">
        <el-input class="w-2/3" v-model="goodsForm.publisher" maxlength="500"></el-input>
      </el-form-item>
      <el-form-item label="游戏类型">
        <el-select v-model="goodsForm.game_type" placeholder="请选择">
          <el-option v-for="item in goodsTypeList" :label="item.name" :value="item.id" :key="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="发行价格">
        <el-input class="w-2/3" v-model="goodsForm.price" type="number" min="0"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="warning" @click="onGameSubmit">保存</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
    <h2 class=" m-8 text-2xl font-bold text-indigo-900">系统要求</h2>
    <el-form :model="systemRequirementForm" label-width="80px">
      <el-form-item lable="配置类型">
        <el-select v-model="systemRequirementForm.req_type" placeholder="请选择">
          <el-option label="最低配置" value="0"></el-option>
          <el-option label="推荐配置" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="操作系统">
        <el-input class="w-1/3" v-model="systemRequirementForm.handle_system" type="text" min="0"></el-input>
      </el-form-item>
      <el-form-item label="处理器">
        <el-input class="w-1/3" v-model="systemRequirementForm.cpu" type="text" min="0"></el-input>
      </el-form-item>’
      <el-form-item label="内存">
        <el-input class="w-1/3" v-model="systemRequirementForm.ram" type="number" min="0"></el-input>
        <el-select class="px-8" v-model="systemRequirementForm.ram_unit" placeholder="请选择">
          <el-option label="GB" value="GB"></el-option>
          <el-option label="MB" value="MB"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="显卡">
        <el-input class="w-1/3" v-model="systemRequirementForm.gpu" type="text" min="0"></el-input>
      </el-form-item>
      <el-form-item label="存储空间">
        <el-input class="w-1/3" v-model="systemRequirementForm.storage_space" type="number" min="0"></el-input>
        <el-select class="px-8" v-model="systemRequirementForm.storage_space_unit" placeholder="请选择">
          <el-option label="GB" value="GB"></el-option>
          <el-option label="MB" value="MB"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSRSubmit">{{sys_status == 0 ? '立即创建' : '编辑'}}</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getGoodsType } from "@/api/goodsType";
import { addGame, getGameById, editGame, editGameSR, createGameSR } from "@/api/goods"

export default {
  name: "AddGoods",
  data() {
    return {
      goodsForm: {
        name: "",
        desc: "",
        img_list: '',
        release_date: "",
        developer: "", // 开发商
        publisher: "", // 发行商
        game_type: [], // 游戏类型
        price: 0, // 发行价格
      },
      goodsTypeList: [],
      status: 0, // 0:创建， 1:编辑
      sys_status: 0, // 系统需求状态  参数同上
      systemRequirementForm: {
        goods_id: '',
        req_type: '',
        handle_system: '',
        cpu: '',
        ram: '',
        ram_unit: '',
        gpu: '',
        storage_space: '',
        storage_space_unit: '',
      }
    };
  },
  created() {
    this.getGoodsType_();
    if(this.$route.query.id) {
      this.getItem({id: this.$route.query.id})
      this.status = 1
    }
  },
  methods: {
    getGoodsType_() {
      getGoodsType().then((res) => {
        if (res.code) {
          this.goodsTypeList = res.data;
        }
      });
    },
    onGameSubmit() {
      let keys = Object.keys(this.goodsForm)
      for( let key of keys ) {
      if(this.goodsForm[key].toString().trim() ==  '') {
          this.$message.warning('请填写完整')
          return 
        }
      }
      if(this.status == 0) {
        addGame(this.goodsForm).then(res=>{
          if(res.code) {
            this.systemRequirementForm.goods_id = res.goodId
            this.$message.success('添加成功')
            this.status = 1
          }
        })
      } else {
        editGame(this.goodsForm).then(res=>{
          if(res.code) {
            this.$message.success('修改成功')
            this.$router.go(-1)
          }
        })
      }
    },
    onSRSubmit (){
      if(!this.systemRequirementForm.goods_id) {
        this.$message.warning('请先创建商品')
        return
      }
      let keys = Object.keys(this.systemRequirementForm)
      for( let key of keys ) {
        if(typeof(this.systemRequirementForm[key]) == 'number') continue
        if(this.systemRequirementForm[key].toString().trim() ==  '') {
          this.$message.warning('请填写完整')
          return 
        }
      }
      createGameSR(this.systemRequirementForm).then(res=> {
        if(res.code) {
          this.$message.success("创建成功")
          this.$router.go(-1)
        }
      })
    },
    getItem(query) {
      getGameById(query).then(res=>{
        if(res.code) {
          this.goodsForm = res.data[0]
        }
      })
    }
  }
};
</script>