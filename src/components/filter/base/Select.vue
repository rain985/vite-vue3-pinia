<!--Select 下拉框-->
<template>
  <a-select
    v-model:value="formModelObj[formConfig.value]"
    :dropdown-style="{
      maxHeight: '400px',
      overflow: 'auto'
    }"
    :allow-clear="
      formConfig.isClear === null || isClear === undefined || isClear
        ? formConfig.isClear
        : false
    "
    show-search
    style="width: 100%"
    :mode="formConfig.mode"
    :placeholder="formConfig.placeholder"
    :filter-option="filterOption"
    :disabled="
      formConfig.disabled !== null && formConfig.disabled !== undefined
        ? formConfig.disabled
        : false
    "
    :getPopupContainer="
      triggerNode => {
        return triggerNode.parentNode.parentNode || document.body
      }
    "
    @change="formConfig.event(formModelObj[formConfig.value], formConfig.value)"
  >
    <a-select-option
      v-for="(opt, optIndex) in formConfig.options"
      :key="optIndex"
      :value="opt.id"
      :title="opt.name"
      :label="opt.name"
    >
      {{ opt.name }}
    </a-select-option>
  </a-select>
</template>

<script>
import { defineComponent, reactive, toRefs, onMounted, watch } from 'vue'
export default defineComponent({
  props: {
    formConfig: Array, //表单数据
    formModel: Object
  },
  setup(props) {
    const state = reactive({
      formModelObj: {}
    })
    /*------------------------------生命周期----------------------------------*/
    onMounted(() => {
      // getFilterModel()
    })

    //监听动态变量
    watch(
      () => props.formModel,
      () => {
        getFilterModel()
      },
      {
        deep: true,
        immediate: true
      }
    )
    /*------------------------------事件函数----------------------------------*/
    //获取双向绑定的动态变量
    function getFilterModel() {
      if (props.formModel) {
        state.formModelObj = props.formModel
      }
    }

    //关键字搜索
    const filterOption = (input, option) => {
      return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
    }

    return {
      ...toRefs(state),
      filterOption
    }
  }
})
</script>
<style scoped lang="less">
/* @import url(); 引入css类 */
</style>
