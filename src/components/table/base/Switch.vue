<!--Switch 开关-->
<template>
  <a-switch
    :checked-children="formConfig.checkedName"
    :un-checked-children="formConfig.unCheckedName"
    @change="formConfig.event(formModel)"
    :checked="!formModelObj[formConfig.value]"
  />
</template>

<script>
import { defineComponent, reactive, toRefs, watch } from 'vue'
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
    //监听开关变化
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
