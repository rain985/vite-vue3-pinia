<!--Popover 下拉按钮-->
<template>
  <a-popover trigger="hover" class="primary-btn" placement="bottom">
    <template #content>
      <div v-for="(item, index) in filterButtonConfig.children" :key="index">
        <a
          href="javascript:;"
          class="link-btn more-function"
          @click="item.event"
          v-show="item.isShow"
          >{{ item.name }}</a
        >
      </div>
    </template>
    <a-button>{{ filterButtonConfig.name }}<CaretDownOutlined /></a-button>
  </a-popover>
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
