<template>
  <a-cascader
    allow-clear
    :show-search="{ filter }"
    v-model:value="formModelObj[formConfig.value]"
    :options="formConfig.options"
    expand-trigger="hover"
    style="width: 100%"
    :dropdown-style="{
      maxHeight: '400px',
      overflow: 'auto'
    }"
    :multiple="formConfig.multiple"
    :disabled="
      formConfig.disabled !== null && formConfig.disabled !== undefined
        ? formConfig.disabled
        : false
    "
    :getPopupContainer="
      triggerNode => {
        return triggerNode.parentNode || document.body
      }
    "
    :placeholder="formConfig.placeholder"
    @change="formConfig.event(formModelObj[formConfig.value], formConfig.value)"
  />
</template>

<script>
import { defineComponent, reactive, toRefs, onMounted, watch } from 'vue'
export default defineComponent({
  props: {
    isDetail: {
      type: Boolean,
      default: false
    },
    formConfig: Object, //表单数据
    formModel: Object,
    valueKey: {
      type: String,
      default: 'id'
    },
    labelKey: {
      type: String,
      default: 'name'
    }
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

    const filter = (inputValue, path) => {
      return path.some(
        option =>
          option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
      )
    }

    return {
      ...toRefs(state),
      filter
    }
  }
})
</script>
<style scoped lang="less">
/* @import url(); 引入css类 */
</style>
