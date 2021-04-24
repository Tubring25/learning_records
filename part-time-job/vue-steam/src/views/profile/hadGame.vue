<template>
  <section class="text-gray-600 body-font">
    <div class="container px-5 py-10 mx-auto">
      <div class="flex flex-wrap -m-4"  v-if="totalSize>0">
        <div class="p-2 lg:w-1/3 md:w-1/2" v-for="item in gameList" :key="item.id" @click="goDetail(item.id)">
          <div class="h-32 flex flex-col items-center text-center" >
            <img alt="team" class="flex-shrink-0 rounded-lg w-full h-24 object-cover object-center mb-1"
              :src="'http://localhost:3000/' + item.GameImgs[0].path">
            <div class="w-full">
              <el-tooltip :content="item.name" placement="top">
                <h2 class="title-font font-medium text-xs text-gray-100 truncate">{{item.name}}</h2>
              </el-tooltip>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { getHadGame } from "@/api/user";
import { getInfo } from "@/utils/auth";
import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";

export default {
  setup() {
    const user_id = JSON.parse(getInfo("vue_steam")).id;
    const router = useRouter();

    const gameList = ref([]);
    const totalSize = ref(0);
    const getHadGame_ = () => {
      getHadGame({ user_id: user_id }).then((res) => {
        if (res.code) {
          gameList.value = res.data.rows;
          totalSize.value = res.data.count;
        }
      });
    };
    onMounted(() => {
      getHadGame_();
    });

    const goDetail = (id) => {
      router.push('/detail?id=' + id)
    }

    return {
      gameList,
      totalSize,
      goDetail
    };
  },
};
</script>