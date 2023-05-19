<!--RadioGroup 单选框-->
<template>
  <!--详情-->
  <a-radio-group
    v-if="isDetail"
    v-model:value="formModelObj[formConfig.value]"
    :options="formConfig.options"
    disabled="true"
    @change="formConfig.event(formModelObj[formConfig.value], formConfig.value)"
  ></a-radio-group>

  <!--新增、编辑-->
  <a-radio-group
    v-if="!isDetail"
    v-model:value="formModelObj[formConfig.value]"
    :options="formConfig.options"
    :disabled="
      formConfig.disabled !== null && formConfig.disabled !== undefined
        ? formConfig.disabled
        : false
    "
    @change="formConfig.event(formModelObj[formConfig.value], formConfig.value)"
  ></a-radio-group>
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
