<!--LinkList 根据参数判断是否显示的文字按钮-->
<template>
  <template v-for="(item, index) in formConfig.buttonList" :key="index">
    <a
      type="link"
      @click="item.event(formModel)"
      :class="item.buttonName === '停用' ? 'error-color' : 'table-link-color'"
      v-if="formModelObj[formConfig.value] === item.value"
    >
      {{ item.buttonName }}
    </a>
    <span v-else>-</span>
  </template>
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
