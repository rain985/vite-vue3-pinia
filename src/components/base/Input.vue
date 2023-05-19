<!--InputSearch 搜索筛选-->
<template>
  <!--详情-->
  <a-input
    v-if="isDetail"
    v-model:value="formModelObj[formConfig.value]"
    placeholder="-"
    disabled="true"
    style="width: 100%"
  ></a-input>

  <!--新增、编辑-->
  <a-input
    v-else
    v-model:value="formModelObj[formConfig.value]"
    :placeholder="formConfig.placeholder"
    :disabled="
      formConfig.disabled !== null && formConfig.disabled !== undefined
        ? formConfig.disabled
        : false
    "
    style="width: 100%"
    allow-clear
    @change="formConfig.event(formModelObj[formConfig.value], formConfig.value)"
  ></a-input>
</template>

<script>
import { defineComponent, reactive, toRefs, onMounted, watch } from 'vue'
export default defineComponent({
  props: {
    isDetail: Boolean,
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
    //获取筛选的动态变量
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
