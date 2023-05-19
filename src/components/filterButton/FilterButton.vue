<!--FilterButton 筛选按钮-->
<template>
  <div class="function-box">
    <a-space>
      <span
        style="margin-right: 10px"
        v-show="filterButtonConfig.isFold ? filterButtonConfig.isFold : false"
      >
        <a @click="foldBtn" v-if="isFold">展开 <DownOutlined /></a>
        <a @click="foldBtn" v-else>收起 <UpOutlined /></a
      ></span>
      <a-button
        v-show="
          filterButtonConfig.isClear !== null &&
          filterButtonConfig.isClear !== undefined
            ? filterButtonConfig.isClear
            : true
        "
        title="重置"
        @click="clearBtn"
        style="width: 60px; line-height: 32px;"
      >
        <template #icon>
          <my-icon type="icon-qingchucachu" style="font-size: 28px" />
        </template>
      </a-button>
      <a-button
        title="刷新"
        @click="refreshBtn"
        style="width: 60px; line-height: 32px;"
      >
        <template #icon>
          <SyncOutlined />
        </template>
      </a-button>

      <template
        v-for="(item, index) in filterButtonConfig.buttonList"
        :key="index"
      >
        <component
          v-bind:is="item.component"
          v-show="item.isShow"
          :filterButtonConfig="item"
        />
      </template>
      <!--      <a-button-->
      <!--        type="primary"-->
      <!--        style="width: 60px; line-height: 32px;"-->
      <!--        title="新增"-->
      <!--        @click="addBtn"-->
      <!--        v-show="filterButtonConfig.isAdd"-->
      <!--      >-->
      <!--        <template #icon>-->
      <!--          <PlusOutlined />-->
      <!--        </template>-->
      <!--      </a-button>-->
    </a-space>
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs } from 'vue'
import Button from '@/components/filterButton/base/Button'
import Popover from '@/components/filterButton/base/Popover'
export default defineComponent({
  components: {
    Button,
    Popover
  },
  props: {
    filterButtonConfig: Array //筛选按钮数据
  },
  setup(props, { emit }) {
    const state = reactive({
      search: {},
      isFold: true //是否收起（默认展开）
    })

    /*------------------------------生命周期----------------------------------*/

    /*------------------------------事件函数----------------------------------*/
    //刷新
    const refreshBtn = () => {
      emit('refresh-btn')
    }

    //重置
    const clearBtn = () => {
      emit('clear-btn')
    }

    //新增
    const addBtn = () => {
      emit('add-btn')
    }

    //展开收起
    const foldBtn = () => {
      state.isFold = !state.isFold
      emit('fold-btn', state.isFold)
    }

    return {
      ...toRefs(state),
      refreshBtn,
      clearBtn,
      addBtn,
      foldBtn
    }
  }
})
</script>
<style scoped lang="less">
/* @import url(); 引入css类 */
</style>
