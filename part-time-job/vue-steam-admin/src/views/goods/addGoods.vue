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
        <el-upload v-if="status == 0" class="upload-demo" action="http://localhost:3000/admin/game/upload"
          :on-success="getImgPath" :file-list="fileList" list-type="picture" :limit="4" style="width:400px">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过4M</div>
        </el-upload>
        <div v-else class=" w-2/3 flex flex-row justify-around">
          <img :src="'http://localhost:3000/'+item.path" class=" w-40 " alt="" v-for="item in gameImgs" :key="item.id">
        </div>
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
      <el-form-item label="是否打折">
        <el-switch v-model="goodsForm.is_sale" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        <el-input v-if="goodsForm.is_sale" class="w-1/3 px-4" type="number" v-model="goodsForm.sale_price" maxlength="500"></el-input>
      </el-form-item>
      <el-form-item label="是否上架">
        <el-switch v-model="goodsForm.is_onshelf" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
      </el-form-item>
    </el-form>
    <h2 class=" m-8 text-2xl font-bold text-indigo-900">系统要求</h2>

    <el-tabs type="border-card" class=" w-2/3">
      <el-tab-pane label="最低配置">
        <el-form :model="systemRequirementForm[0]" label-width="80px">
          <el-form-item label="操作系统">
            <el-input class="w-1/3" v-model="systemRequirementForm[0].handle_system" type="text" min="0"></el-input>
          </el-form-item>
          <el-form-item label="处理器">
            <el-input class="w-1/3" v-model="systemRequirementForm[0].cpu" type="text" min="0"></el-input>
          </el-form-item>’
          <el-form-item label="内存">
            <el-input class="w-1/3" v-model="systemRequirementForm[0].ram" type="number" min="0"></el-input>
            <el-select class="px-8" v-model="systemRequirementForm[0].ram_unit" placeholder="请选择">
              <el-option label="GB" value="GB"></el-option>
              <el-option label="MB" value="MB"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="显卡">
            <el-input class="w-1/3" v-model="systemRequirementForm[0].gpu" type="text" min="0"></el-input>
          </el-form-item>
          <el-form-item label="存储空间">
            <el-input class="w-1/3" v-model="systemRequirementForm[0].storage_space" type="number" min="0"></el-input>
            <el-select class="px-8" v-model="systemRequirementForm[0].storage_space_unit" placeholder="请选择">
              <el-option label="GB" value="GB"></el-option>
              <el-option label="MB" value="MB"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="推荐配置">
        <el-form :model="systemRequirementForm[1]" label-width="80px">
          <el-form-item label="操作系统">
            <el-input class="w-1/3" v-model="systemRequirementForm[1].handle_system" type="text" min="0"></el-input>
          </el-form-item>
          <el-form-item label="处理器">
            <el-input class="w-1/3" v-model="systemRequirementForm[1].cpu" type="text" min="0"></el-input>
          </el-form-item>’
          <el-form-item label="内存">
            <el-input class="w-1/3" v-model="systemRequirementForm[1].ram" type="number" min="0"></el-input>
            <el-select class="px-8" v-model="systemRequirementForm[1].ram_unit" placeholder="请选择">
              <el-option label="GB" value="GB"></el-option>
              <el-option label="MB" value="MB"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="显卡">
            <el-input class="w-1/3" v-model="systemRequirementForm[1].gpu" type="text" min="0"></el-input>
          </el-form-item>
          <el-form-item label="存储空间">
            <el-input class="w-1/3" v-model="systemRequirementForm[1].storage_space" type="number" min="0"></el-input>
            <el-select class="px-8" v-model="systemRequirementForm[1].storage_space_unit" placeholder="请选择">
              <el-option label="GB" value="GB"></el-option>
              <el-option label="MB" value="MB"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
    <div class=" w-60 flex flex-row justify-between mt-7">
      <el-button type="primary" @click="onGameSubmit">{{status == 0 ? '立即创建' : '编辑'}}</el-button>
      <el-button>取消</el-button>
    </div>
  </div>
</template>

<script>
import { getGoodsType } from "@/api/goodsType";
import {
  addGame,
  getGameById,
  editGame,
} from "@/api/goods";

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
        price: 0, // 发行价格
        is_onshelf: 0,
      },
      goodsTypeList: [],
      fileList: [],
      status: 0, // 0:创建， 1:编辑
      systemRequirementForm: [
        {
          req_type: 0,
          handle_system: "",
          cpu: "",
          ram: "",
          ram_unit: "",
          gpu: "",
          storage_space: "",
          storage_space_unit: "",
        },
        {
          req_type: 1,
          handle_system: "",
          cpu: "",
          ram: "",
          ram_unit: "",
          gpu: "",
          storage_space: "",
          storage_space_unit: "",
        },
      ],
      allSR: [],
      gameImgs: [],
    };
  },
  created() {
    this.getGoodsType_();
    if (this.$route.query.id) {
      this.getItem({ id: this.$route.query.id });
      this.status = 1;
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
    getItem(query) {
      getGameById(query).then((res) => {
        if (res.code) {
          this.goodsForm = res.data;
          this.gameImgs = res.data.GameImgs;
          this.systemRequirementForm = res.data.SystemRequirements
          this.systemRequirementForm[0].game_id = res.data.id;
          this.systemRequirementForm[1].game_id = res.data.id;
          delete this.goodsForm.GameImgs
          delete this.goodsForm.SystemRequirements
        }
      });
    },
    getImgPath(res) {
      this.goodsForm.img_list.push(res.path);
    },
    onGameSubmit() {
      let keys = Object.keys(this.goodsForm);
      for (let key of keys) {
        if (typeof this.goodsForm[key] == "number") continue;
        if (this.goodsForm[key].toString().trim() == "") {
          console.log(key)
          this.$message.warning("请填写完整");
          return;
        }
      }
      let srKeys = Object.keys(this.systemRequirementForm[0]);
      for (let key of srKeys) {
          console.log(key)

        if (typeof this.systemRequirementForm[0][key] == "number") continue;
        if (this.systemRequirementForm[0][key].toString().trim() == "") {
          this.$message.warning("请填写完整");
          return;
        }
        if (typeof this.systemRequirementForm[1][key] == "number") continue;
        if (this.systemRequirementForm[1][key].toString().trim() == "") {
          console.log(key)
          this.$message.warning("请填写完整");
          return;
        }
      }
      this.goodsForm.systemRequirement = JSON.stringify(this.systemRequirementForm);
      if (this.status == 0) {
        this.goodsForm.img_list = this.goodsForm.img_list.toString();
        addGame(this.goodsForm).then((res) => {
          if (res.code) {
            this.systemRequirementForm[0].game_id = res.goodId;
            this.systemRequirementForm[1].game_id = res.goodId;
            this.$message.success("添加成功");
            this.$router.replace('/goods/goodsList')
          }
        });
      } else {
        editGame(this.goodsForm).then((res) => {
          if (res.code) {
            this.$message.success("修改成功");
            this.$router.replace('/goods/goodsList')
          }
        });
      }
    },
    // onSRSubmit (){
    //   if(!this.systemRequirementForm[0].game_id) {
    //     this.$message.warning('请先创建商品')
    //     return
    //   }

    //   createGameSR(this.systemRequirementForm).then(res=> {
    //     if(res.code) {
    //       this.$message.success("创建成功")
    //       // this.$router.go(-1)
    //       this.allSR.push(this.systemRequirementForm.req_type)
    //       if(this.allSR.length == 2) {
    //         this.$router.replace('/goods/goodsList')
    //       }
    //     }
    //   })
    // },
  },
};
</script>