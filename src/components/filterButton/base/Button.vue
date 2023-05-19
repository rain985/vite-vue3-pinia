<!--Button 按钮-->
<template>
  <a-button
    :type="filterButtonConfig.type"
    :title="filterButtonConfig.name"
    @click="filterButtonConfig.event"
    style="min-width: 60px; line-height: 32px;"
  >
    <PlusOutlined v-if="filterButtonConfig.id === 'add'" />
  </a-button>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    filterButtonConfig: Object //筛选按钮配置
  }
})
</script>
<style scoped lang="less">
/* @import url(); 引入css类 */
</style>
