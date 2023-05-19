<!--Checkbox 多选框-->
<template>
  <!--详情-->
  <a-checkbox
    v-if="isDetail"
    v-model:checked="formModelObj[formConfig.value]"
    disabled="true"
    >{{ formConfig.checkedName }}</a-checkbox
  >

  <!--新增、编辑-->
  <a-checkbox
    v-if="!isDetail"
    v-model:checked="formModelObj[formConfig.value]"
    :disabled="
      formConfig.disabled !== null && formConfig.disabled !== undefined
        ? formConfig.disabled
        : false
    "
    @change="formConfig.event(formModelObj[formConfig.value], formConfig.value)"
    >{{ formConfig.checkedName }}</a-checkbox
  >
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
