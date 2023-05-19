<template>
  <div>
    <Filter :filterConfig="FILTERCONFIG" :search="search"></Filter>
  </div>
</template>
<script setup>
import { getCurrentInstance, onMounted, ref, onUnmounted } from 'vue'
import { FILTERCONFIG } from './config.js'
import Filter from '@/components/filter/Filter.vue'
// FILTERCONFIG.forEach(item => {
//   item.event = getDataSearch
// })
// console.log(FILTERCONFIG)

function getDataSearch() {
  console.log(1)
  // state.tableConfig.pageIndex = 1
  // state.search.text = ev
  getData()
}

function getData() {
  console.log('获取数据')
}
let component = getCurrentInstance()
onUnmounted(() => {
  console.log(component)
  // FILTERCONFIG.forEach(item => {
  //   if (typeof item.rrr === 'string') {
  //     // delete item.rrr
  //     item.event = component.devtoolsRawSetupState[item.rrr]
  //   }
  // })
  // console.log(FILTERCONFIG)
})
</script>

<style scoped lang="less">
@import url('./index.less');
</style>
