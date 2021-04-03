<template>
  <div class="dashboard-container">
    <section class="text-gray-600 body-font">
      <div class="container px-5 py-10 mx-auto">
        <div class="flex flex-wrap -m-4 text-center">
          <div class="p-4 sm:w-1/4 w-1/2">
            <h2 class="title-font font-medium sm:text-4xl text-3xl text-gray-900">2.7K</h2>
            <p class="leading-relaxed">注册会员</p>
          </div>
          <div class="p-4 sm:w-1/4 w-1/2">
            <h2 class="title-font font-medium sm:text-4xl text-3xl text-gray-900">1.8K</h2>
            <p class="leading-relaxed">新增会员</p>
          </div>
          <div class="p-4 sm:w-1/4 w-1/2">
            <h2 class="title-font font-medium sm:text-4xl text-3xl text-gray-900">35</h2>
            <p class="leading-relaxed">订单量</p>
          </div>
          <div class="p-4 sm:w-1/4 w-1/2">
            <h2 class="title-font font-medium sm:text-4xl text-3xl text-gray-900">4</h2>
            <p class="leading-relaxed">营业额</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "Dashboard",
  data() {
    return {
      number: 11,
    };
  },
};
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
