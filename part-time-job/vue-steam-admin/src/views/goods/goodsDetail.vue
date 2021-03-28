<template>
  <div class="container">
    <section class="text-gray-600 body-font overflow-hidden">
      <div class="container px-5 py-24 mx-auto">
        <div class="lg:w-4/5 mx-auto flex flex-wrap">
          <div class="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
            <h2 class="text-sm title-font text-gray-500 tracking-widest">GAME NAME</h2>
            <h1 class="text-gray-900 text-3xl title-font font-medium mb-4">{{goodsForm.name}}</h1>
            <el-tabs v-model="activeName">
              <el-tab-pane label="基础信息" name="first">
                <p class="leading-relaxed mb-4">{{goodsForm.desc}}</p>
                <div class="flex border-t border-gray-200 py-2">
                  <span class="text-gray-500">开发商</span>
                  <span class="ml-auto text-gray-900">{{goodsForm.developer}}</span>
                </div>
                <div class="flex border-t border-gray-200 py-2">
                  <span class="text-gray-500">发行商</span>
                  <span class="ml-auto text-gray-900">{{goodsForm.publisher}}</span>
                </div>
                <div class="flex border-t border-b mb-6 border-gray-200 py-2">
                  <span class="text-gray-500">发行日期</span>
                  <span class="ml-auto text-gray-900">{{goodsForm.release_date}}</span>
                </div>
                <div class="flex">
                  <span class="title-font font-medium text-2xl text-gray-900"
                    :class="goodsForm.is_sale? 'line-through text-opacity-50': ''">${{goodsForm.price}}</span>
                  <span v-if="goodsForm.is_sale"
                    class="title-font font-medium px-6 align-bottom text-xl text-red-500">${{goodsForm.sale_price}}</span>
                  <button
                    class="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">编辑</button>
                </div>
              </el-tab-pane>
              <el-tab-pane label="系统需求" name="second">
                <el-tabs type="border-card">
                  <el-tab-pane label="推荐配置">
                    <div class="flex border-gray-200 py-2">
                      <span class="text-gray-500">操作系统</span>
                      <span class="ml-auto text-gray-900">{{goodsForm.sale_price}}</span>
                    </div>
                    <div class="flex border-t border-gray-200 py-2">
                      <span class="text-gray-500">处理器</span>
                      <span class="ml-auto text-gray-900">{{goodsForm.sale_price}}</span>
                    </div>
                    <div class="flex border-t border-gray-200 py-2">
                      <span class="text-gray-500">内存</span>
                      <span class="ml-auto text-gray-900">{{goodsForm.sale_price}}</span>
                    </div>
                    <div class="flex border-t border-b mb-6 border-gray-200 py-2">
                      <span class="text-gray-500">显卡</span>
                      <span class="ml-auto text-gray-900">{{goodsForm.sale_price}}</span>
                    </div>
                    <div class="flex border-t border-b mb-6 border-gray-200 py-2">
                      <span class="text-gray-500">存储空间</span>
                      <span class="ml-auto text-gray-900">{{goodsForm.sale_price}}</span>
                    </div>
                  </el-tab-pane>
                  <el-tab-pane label="最低配置">
                    <div class="flex border-gray-200 py-2">
                      <span class="text-gray-500">操作系统</span>
                      <span class="ml-auto text-gray-900">{{goodsForm.sale_price}}</span>
                    </div>
                    <div class="flex border-t border-gray-200 py-2">
                      <span class="text-gray-500">处理器</span>
                      <span class="ml-auto text-gray-900">{{goodsForm.sale_price}}</span>
                    </div>
                    <div class="flex border-t border-gray-200 py-2">
                      <span class="text-gray-500">内存</span>
                      <span class="ml-auto text-gray-900">{{goodsForm.sale_price}}</span>
                    </div>
                    <div class="flex border-t border-b mb-6 border-gray-200 py-2">
                      <span class="text-gray-500">显卡</span>
                      <span class="ml-auto text-gray-900">{{goodsForm.sale_price}}</span>
                    </div>
                    <div class="flex border-t border-b mb-6 border-gray-200 py-2">
                      <span class="text-gray-500">存储空间</span>
                      <span class="ml-auto text-gray-900">{{goodsForm.sale_price}}</span>
                    </div>
                  </el-tab-pane>
                </el-tabs>

              </el-tab-pane>
            </el-tabs>
          </div>
          <img alt="ecommerce" class="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
            src="https://dummyimage.com/400x400">
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import { getGoodsType } from "@/api/goodsType";
import { getGameById, getGameSR } from "@/api/goods";
export default {
  name: "GoodsDetail",
  data() {
    return {
      activeName: "first",
      goodsForm: {},
      goodsTypeList: [],
      srList: [],
    };
  },
  created() {
    this.getGoodsType_();
    if (this.$route.query.id) {
      this.getItem({ id: this.$route.query.id });
      this.getGameSR_({goods_id: this.$route.query.id})
    } else {
      this.$router.go(-1);
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
          this.goodsForm = res.data[0];
        }
      });
    },
    getGameSR_ (data) {
      getGameSR(data).then(res=>{
        if(res.code) {
          res.data.sort((a, b) => {
            return a.req_type - b.req_type
          })
          this.srList= res.data
        }
      })
    }
  },
};
</script>