<!-- 共用上传 -->
<template>
  <!--详情-->
  <div v-if="isDetail">
    <div v-for="(item, index) in formModelObj[formConfig.value]" :key="index">
      <PaperClipOutlined /> {{ item.name }}
    </div>
  </div>

  <!--新增、编辑-->
  <div v-else>
    <a-upload
      :showUploadList="false"
      :multiple="true"
      v-model:fileList="formModelObj[formConfig.value]"
      :data="formConfig.ajaxData"
      :action="formConfig.action"
      :name="formConfig.name"
      @change="changeEvent"
      :before-upload="beforeUploadEvent"
    >
      <a-button class="primary-second-btn"> 选择文件 </a-button>
    </a-upload>
    <div class="file-list-wrap">
      <div
        class="file-item"
        v-for="item in formModelObj[formConfig.value]"
        :key="item.uid"
      >
        <div class="file-name">
          <span
            class="name"
            :class="{
              success: item.status === 'done',
              error: item.status === 'error'
            }"
          >
            <PaperClipOutlined /> {{ item.name }}</span
          >
          <div class="button-list">
            <span
              v-if="
                item.status === 'error' ||
                  (item.response && item.response.code !== 200000)
              "
            >
              <a-tooltip
                placement="top"
                :title="item.response.msg"
                :get-popup-container="getPopupContainer"
              >
                <span
                  class="warning-color"
                  style="margin-right: 5px;font-size: 16px"
                  ><ExclamationCircleFilled />
                </span>
              </a-tooltip>

              <span style="color: #F37B6B;">上传失败 </span>
              <a
                href="javascript:;"
                @click="reloadUpload(item)"
                class="reload-btn"
              >
                <RedoOutlined />
              </a>
            </span>
            <a href="javascript:;" @click="removeFile(item)" class="remove-btn">
              <CloseCircleFilled />
            </a>
          </div>
        </div>
        <a-progress :percent="item.percent" :showInfo="false" size="small" />
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, watch } from 'vue'
import { Upload, Progress } from 'ant-design-vue'
import axios from 'axios'

export default {
  components: {
    [Upload.name]: Upload,
    [Progress.name]: Progress
  },
  props: {
    isDetail: Boolean,
    formConfig: Array, //表单数据
    formModel: Object,
    action: String,
    name: {
      type: String,
      default: 'files'
    },
    ajaxData: Object,
    fileList: Array
  },
  setup(props) {
    const state = reactive({
      formModelObj: {}
    })

    /*------------------------------生命周期----------------------------------*/
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

    watch(
      () => state.formModelObj[props.formConfig.value],
      () => {
        props.formConfig.event(
          state.formModelObj[props.formConfig.value],
          props.formConfig.value
        )
      },
      {
        deep: true
      }
    )
    /*------------------------------事件函数----------------------------------*/
    //获取筛选的动态变量
    function getFilterModel() {
      if (props.formModel) {
        state.formModelObj = { ...props.formModel }
      }
    }

    //文件上传change事件
    const changeEvent = info => {
      state.formModelObj[props.formConfig.value] = info.fileList.map(item => {
        if (item.status === 'error') {
          item.percent = 0
        } else if (item.response && item.response.code !== 200000) {
          item.status = 'error'
          item.percent = 0
        }
        return item
      })
    }

    //移除文件
    function removeFile(file) {
      state.formModelObj[props.formConfig.value] = state.formModelObj[
        props.formConfig.value
      ].filter(item => item.uid !== file.uid)
    }

    //重新上传
    function reloadUpload(file) {
      const params = new FormData()
      params.append('files', file.originFileObj)

      axios({
        url: props.formConfig.action,
        method: 'post',
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: progressEvent => {
          const loader = progressEvent.loaded
          const total = progressEvent.total
          const iScale = (loader / total) * 100
          state.formModelObj[props.formConfig.value] = state.formModelObj[
            props.formConfig.value
          ].map(item => {
            if (item.uid === file.uid) {
              item.status = 'uploading'
              item.percent = iScale
            }
            return item
          })
        },
        data: params
      })
        .then(response => {
          if (response.data.code === 200000) {
            state.formModelObj[props.formConfig.value] = state.formModelObj[
              props.formConfig.value
            ].map(item => {
              if (file.uid === item.uid) {
                item.status = 'done'
                item.response = { ...response.data }
              }
              return item
            })
          } else {
            state.formModelObj[props.formConfig.value] = state.formModelObj[
              props.formConfig.value
            ].map(item => {
              if (file.uid === item.uid) {
                item.status = 'error'
                item.percent = 0
                item.response = { ...response.data }
              }
              return item
            })
          }
        })
        .catch(() => {
          state.formModelObj[props.formConfig.value] = state.formModelObj[
            props.formConfig.value
          ].map(item => {
            if (item.uid === file.uid) {
              item.percent = 0
              item.status = 'error'
            }
            return item
          })
        })
    }
    //上传文件之前对文件进行校验
    function beforeUploadEvent(file, fileList) {
      return props.formConfig.beforeUpload
        ? props.formConfig.beforeUpload(file, fileList)
        : Promise.resolve()
    }
    return {
      ...toRefs(state),
      changeEvent,
      removeFile,
      reloadUpload,
      beforeUploadEvent
    }
  }
}
</script>
<style scoped lang="less">
/* @import url(); 引入css类 */
.file-name {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .name {
    &.success {
      /*color: #fff;*/
    }
    &.error {
      /*color: #fff;*/
    }
  }
}
.file-list-wrap {
  margin: 10px 0;
  min-height: 0;
  max-height: 151px;
  overflow-y: scroll;
  overflow-x: hidden;
  padding-right: 10px;
  .file-item {
    margin: 5px 0;
  }
}
.button-list {
  display: flex;
  align-items: center;
  .remove-btn {
    display: block;
    .anticon-close-circle {
      color: #b7b7b7;
      font-size: 16px;
    }
  }
  .reload-btn {
    margin-right: 10px;
  }
}
</style>
