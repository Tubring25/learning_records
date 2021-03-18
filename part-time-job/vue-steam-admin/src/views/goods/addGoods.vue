<template>
  <div></div>
</template>

<script>
import { ref, reactive, toRefs } from 'vue'
export default {
  name: 'AddGoods',
  setup() {
    const goodsForm = reactive({
      name: '',
      desc: '',
      img_list: [],
      release_date: '',
      developer: '', // 开发商
      publisher: '', // 发行商
      game_type: null, // 游戏类型
      platform: null, // 运行平台
      price: null, // 发行价格
    })


    return {
      ...toRefs(goodsForm)
    }
  }
}
</script>