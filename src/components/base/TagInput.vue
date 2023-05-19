<!--TagInput tag-->
<template>
  <span v-for="tag in formModelObj[formConfig.value]" :key="tag">
    <a-tag closable @close="handleClose(tag)">
      {{ tag }}
    </a-tag>
  </span>
  <a-input
    v-if="tagInputVisible"
    ref="inputRef"
    type="text"
    :style="{ width: '78px' }"
    v-model:value="tagInputValue"
    @blur="handleInputConfirm"
    :disabled="
      formConfig.disabled !== null && formConfig.disabled !== undefined
        ? formConfig.disabled
        : false
    "
    @keyup.enter="handleInputConfirm"
  ></a-input>
  <a-tag @click="showInput" style="cursor: pointer">
    <plus-outlined />
    添加标签
  </a-tag>
</template>

<script>
import {
  defineComponent,
  reactive,
  toRefs,
  onMounted,
  ref,
  nextTick,
  watch
} from 'vue'
import { message } from 'ant-design-vue'
export default defineComponent({
  props: {
    formConfig: Array, //表单数据
    formModel: Object
  },
  setup(props) {
    const state = reactive({
      formModelObj: {},
      tagInputVisible: false,
      tagInputValue: ''
      // tagList: []
    })

    const inputRef = ref()
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

    //监听tagList
    watch(
      () => state.formModelObj[props.formConfig.value],
      () => {
        props.formConfig.event(
          state.formModelObj[props.formConfig.value],
          props.formConfig.value
        )
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

    //校验
    const handleInputConfirm = () => {
      const inputValue = state.tagInputValue
      // let tags = state.tagList
      let tags = state.formModelObj[props.formConfig.value]

      //判断是否有重复元素
      if (tags.filter(item => item === inputValue).length === 0) {
        if (inputValue.length > 20) {
          //判断长度是否大于20
          message.warning('标签名称不能超过20！')
        } else {
          if (inputValue && tags.indexOf(inputValue) === -1) {
            state.formModelObj[props.formConfig.value] = [...tags, inputValue]
            // state.tagList = [...tags, inputValue]
          }
        }
      } else {
        message.warning('标签名称不能重复！')
      }

      Object.assign(state, {
        tagInputVisible: false,
        tagInputValue: ''
      })
    }

    //关闭tag
    const handleClose = removedTag => {
      const tags = state.formModelObj[props.formConfig.value].filter(
        tag => tag !== removedTag
      )
      // state.tagList = tags
      state.formModelObj[props.formConfig.value] = [...tags]
      // const tags = state.formModelObj[props.formConfig.value].filter(
      //   tag => tag !== removedTag
      // )
    }

    const showInput = () => {
      state.tagInputVisible = true
      nextTick(() => {
        inputRef.value.focus()
      })
    }

    return {
      ...toRefs(state),
      handleInputConfirm,
      handleClose,
      showInput,
      inputRef
    }
  }
})
</script>
<style scoped lang="less">
/* @import url(); 引入css类 */
</style>
