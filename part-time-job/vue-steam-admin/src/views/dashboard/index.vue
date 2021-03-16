<template>
  <div class="dashboard-container">
    <div class="card-container flex flex-row justify-between w-full">
      <div class="card-box w-72 h-auto flex flex-row justify-between rounded-2xl border-2 border-gray-200 shadow-lg hover:shadow-xl">
        <img class="h-20 m-4" src="../../assets/member.png" alt="">
        <div class="w-3/5 text-center">
          <p class="text-xl pt-4">注册会员</p>
          <span class="text-4xl font-bold pt-4 block">{{number}}</span>
        </div>
      </div>
      <div class="card-box w-72 h-auto flex flex-row justify-between rounded-2xl border-2 border-gray-200 shadow-lg hover:shadow-xl">
        <img class="h-20 m-4" src="../../assets/goods.png" alt="">
        <div class="w-3/5 text-center">
          <p class="text-xl pt-4">商品数量</p>
          <span class="text-4xl font-bold pt-4 block">{{number}}</span>
        </div>
      </div>
      <div class="card-box w-72 h-auto flex flex-row justify-between rounded-2xl border-2 border-gray-200 shadow-lg hover:shadow-xl">
        <img class="h-20 m-4" src="../../assets/order.png" alt="">
        <div class="w-3/5 text-center">
          <p class="text-xl pt-4">订单数量</p>
          <span class="text-4xl font-bold pt-4 block">{{number}}</span>
        </div>
      </div>
      <div class="card-box w-72 h-auto flex flex-row justify-between rounded-2xl border-2 border-gray-200 shadow-lg hover:shadow-xl">
        <img class="h-20 m-4" src="../../assets/money.png" alt="">
        <div class="w-3/5 text-center">
          <p class="text-xl pt-4">今日营业额</p>
          <span class="text-4xl font-bold pt-4 block">{{number}}</span>
        </div>
      </div>
    </div> 
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  data(){
    return {
      number: 11
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
