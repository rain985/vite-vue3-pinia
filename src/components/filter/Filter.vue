<!--Filter 筛选-->
<template>
  <div class="filter-box">
    <a-row :gutter="[20, 20]" style="width: 100%">
      <template v-for="(item, index) in filterConfig" :key="index">
        <a-col
          :xxl="item.formCol ? formCol(item.formCol) : formCol(2)"
          :xl="item.formCol ? formCol(item.formCol) : formCol(2)"
          v-show="isFold ? index < 4 : true"
        >
          <a-space>
            <span class="filter-label">{{ item.label }}</span>
            <component
              v-bind:is="item.component"
              :formConfig="item"
              :formModel="search"
            />
          </a-space>
        </a-col>
      </template>
    </a-row>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import Select from './base/Select.vue'
import InputSearch from '@/components/base/InputSearch'
import RangePicker from '@/components/base/RangePicker'
import Cascader from '@/components/base/Cascader'
export default defineComponent({
  components: {
    Select,
    InputSearch,
    RangePicker,
    Cascader
  },
  props: {
    filterConfig: Array, //筛选数据
    search: Object, //筛选表单动态值
    isFold: Boolean //是否收起
  },
  setup() {
    //表单动态列数
    const formCol = span => {
      return Math.ceil(24 / span)
    }

    return {
      formCol
    }
  }
})
</script>
<style scoped lang="less">
/* @import url(); 引入css类 */
</style>
