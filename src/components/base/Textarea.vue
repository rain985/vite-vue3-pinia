<!--Textarea 文本域-->
<template>
  <!--详情-->
  <a-textarea
    v-if="isDetail"
    v-model:value="formModelObj[formConfig.value]"
    placeholder="-"
    disabled="true"
    style="width: 100%"
    :auto-size="{ minRows: 2, maxRows: 5 }"
  ></a-textarea>

  <!--新增、编辑-->
  <a-textarea
    v-else
    v-model:value="formModelObj[formConfig.value]"
    :placeholder="formConfig.placeholder"
    allow-clear
    :auto-size="{ minRows: 2, maxRows: 5 }"
    :disabled="
      formConfig.disabled !== null && formConfig.disabled !== undefined
        ? formConfig.disabled
        : false
    "
    @change="formConfig.event(formModelObj[formConfig.value], formConfig.value)"
    style="width: 100%;"
  ></a-textarea>
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
/deep/ .ant-input:hover {
  border: none !important;
}
</style>
