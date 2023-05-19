<!--RangePicker 时间选择器-->
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
  <a-range-picker
    v-else
    v-model:value="formModelObj[formConfig.value]"
    style="width: 100%"
    valueFormat="YYYY-MM-DD"
    :disabledDate="disabledDate"
    :disabled="
      formConfig.disabled !== null && formConfig.disabled !== undefined
        ? formConfig.disabled
        : false
    "
    @change="formConfig.event(formModelObj[formConfig.value], formConfig.value)"
  >
  </a-range-picker>
</template>

<script>
import { defineComponent, reactive, toRefs, onMounted, watch } from 'vue'
import moment from 'moment'
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
    //大于当前时间不可选择
    const disabledDate = current => {
      return current && current > moment().endOf('day')
    }
    //获取双向绑定的动态变量
    function getFilterModel() {
      if (props.formModel) {
        state.formModelObj = props.formModel
      }
    }

    return {
      ...toRefs(state),
      disabledDate
    }
  }
})
</script>
<style scoped lang="less">
/* @import url(); 引入css类 */
</style>
