<!--Switch 开关-->
<template>
  <a-checkbox-group
    v-model:value="formModelObj[formConfig.value]"
    :options="formConfig.options"
    :disabled="
      formConfig.disabled !== null && formConfig.disabled !== undefined
        ? formConfig.disabled
        : false
    "
    @change="formConfig.event(formModelObj[formConfig.value], formConfig.value)"
  ></a-checkbox-group>
  <!--  <a-checkbox-->
  <!--    :disabled="-->
  <!--      formConfig.disabled !== null && formConfig.disabled !== undefined-->
  <!--        ? formConfig.disabled-->
  <!--        : false-->
  <!--    "-->
  <!--    @change="formConfig.event(formModelObj[formConfig.value], formConfig.value)"-->
  <!--    :checked="formModelObj[formConfig.value]"-->
  <!--    ></a-checkbox-->
  <!--  >-->
</template>

<script>
import { defineComponent, reactive, toRefs, onMounted } from 'vue'
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
      getFilterModel()
    })

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
