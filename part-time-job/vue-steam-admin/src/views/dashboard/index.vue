<template>
  <div class="dashboard-container">
    <section class="text-gray-600 body-font">
      <div class="container px-5 py-10 mx-auto">
        <div class="flex flex-wrap -m-4 text-center">
          <div class="p-4 sm:w-1/4 w-1/2">
            <h2 class="title-font font-medium sm:text-4xl text-3xl text-gray-900">{{paneData.UserNum}}</h2>
            <p class="leading-relaxed">注册会员</p>
          </div>
          <div class="p-4 sm:w-1/4 w-1/2">
            <h2 class="title-font font-medium sm:text-4xl text-3xl text-gray-900">{{paneData.NewUserNum}}</h2>
            <p class="leading-relaxed">新增会员</p>
          </div>
          <div class="p-4 sm:w-1/4 w-1/2">
            <h2 class="title-font font-medium sm:text-4xl text-3xl text-gray-900">{{paneData.OrderNum}}</h2>
            <p class="leading-relaxed">订单量</p>
          </div>
          <div class="p-4 sm:w-1/4 w-1/2">
            <h2 class="title-font font-medium sm:text-4xl text-3xl text-gray-900">{{paneData.TotalMoney}}</h2>
            <p class="leading-relaxed">营业额</p>
          </div>
        </div>
      </div>
    </section>
    <line-chart :chart-data="lineChartData" />
  </div>
</template>

<script>
import LineChart from './lineChart'
import { getPaneData, getLineData } from '@/api/home'
const lineChartData = {
  newVisitis: {
    actualData: [180, 281, 185],
    dateData: ["2021-04-22", "2021-04-24", "2021-04-25"],
  },
}

export default {
  name: "Dashboard",
  components: { LineChart }, 
  data() {
    return {
      paneData: {},
      lineChartData: null
    };
  },
  created() {
    this.getPaneData_()
    this.getLineData_()
  },
  methods: {
    getPaneData_() {
      getPaneData().then(res=>{
        if(res.code ) {
          this.paneData = res.data
        }
      })
    },
    getLineData_(){
      getLineData().then(res=>{
        if(res.code) {
          let date = Array.from(new Set(res.data.map(a=>a.created_at.slice(0,10)))).map(a=>{return {date: a, money: 0}})
          for(let i in res.data) {
            for (let j in date) {
              if(res.data[i].created_at.indexOf(date[j].date)) {
                date[j].money += Number(res.data[i].money)
              }
            }
          }
          let newVisitis = {
            actualData: date.map(a=>a.money),
            dateData: date.map(a=>a.date),
          }
          this.lineChartData = newVisitis
        }
      })
    },
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    }
  }
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
