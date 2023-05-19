<!--Select 下拉框-->
<template>
  <a-tree-select
    v-model:value="formModelObj[formConfig.value]"
    :placeholder="formConfig.placeholder"
    allow-clear
    style="width: 100%"
    :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
    :tree-data="formConfig.treeData"
    tree-default-expand-all
    tree-node-filter-prop="title"
    :disabled="
      formConfig.disabled !== null && formConfig.disabled !== undefined
        ? formConfig.disabled
        : false
    "
    @change="formConfig.event(formModelObj[formConfig.value], formConfig.value)"
  >
    <template #title="{ value }">
      <span style="color: #08c">
        {{ value }}
      </span>
    </template>
  </a-tree-select>
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

    return {
      ...toRefs(state)
    }
  }
})
</script>
<style scoped lang="less">
/* @import url(); 引入css类 */
</style>
