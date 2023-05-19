<!--Table 表格-->
<template>
  <div style="position: relative">
    <a-table
      :row-selection="rowSelection"
      :rowKey="tableConfig.rowKey"
      :loading="
        tableConfig.loading
          ? {
              size: 'large',
              wrapperClassName: 'loading-wrap'
            }
          : false
      "
      :columns="tableConfig.columns"
      :data-source="tableConfig.dataSource"
      size="middle"
      :scroll="{ x: true }"
      :pagination="{
        current: pageIndex,
        pageSize: pageSize,
        total: tableConfig.total,
        showTotal: total => `共${total}条记录`,
        showQuickJumper:
          tableConfig.showQuickJumper !== null &&
          tableConfig.showQuickJumper !== undefined &&
          !tableConfig.showQuickJumper
            ? false
            : true,
        onChange: changePage,
        pageSizeOptions: pageSizeOptions,
        showSizeChanger: showSizeChanger,
        onShowSizeChange: onShowSizeChange
      }"
      :rowClassName="tableStriped"
    >
      <template #name="{ text, record }" v-if="tableConfig.isDetail">
        <a-tooltip v-if="text && text !== ''">
          <template v-slot:title>
            {{ text }}
          </template>
          <a @click="detailBtn(record)" v-if="tableConfig.detailLength">
            {{
              text.length > tableConfig.detailLength
                ? text.slice(0, tableConfig.detailLength) + '...'
                : text
            }}
          </a>
          <a @click="detailBtn(record)" v-else>
            {{ text.length > 20 ? text.slice(0, 20) + '...' : text }}
          </a>
        </a-tooltip>
        <span v-else>-</span>
      </template>

      <template #updateTime="{ record }" v-if="tableConfig.isUpdateTime">
        <a-tooltip>
          <template v-slot:title>
            {{ record.updateTime }}
          </template>
          <span>{{ record.updateTimeFormat }}</span>
        </a-tooltip>
      </template>

      <template #createTime="{ record }" v-if="tableConfig.isCreateTime">
        <a-tooltip>
          <template v-slot:title>
            {{ record.createTime }}
          </template>
          <span>{{ record.createTimeFormat }}</span>
        </a-tooltip>
      </template>

      <template #operation="{ record }">
        <div>
          <a-space>
            <span
              v-for="(item, index) in tableConfig.operationConfig"
              :key="index"
            >
              <component
                v-bind:is="item.component"
                :formConfig="item"
                :formModel="record"
                v-if="item.isShow"
              />
            </span>
          </a-space>
        </div>
      </template>
    </a-table>
    <div v-if="tableConfig.description" class="description description-color">
      {{ tableConfig.description }}
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs, computed, watch } from 'vue'
import Switch from '@/components/table/base/Switch'
import Link from '@/components/table/base/Link'
import LinkList from '@/components/table/base/LinkList'
export default defineComponent({
  components: {
    Switch,
    Link,
    LinkList
  },
  props: {
    tableConfig: Object //列表数据
  },
  setup(props, { emit }) {
    const state = reactive({
      // 表格分页属性
      pageIndex: 1,
      pageSize: 10
    })

    /*------------------------------生命周期----------------------------------*/
    //列表多选框禁用状态判断
    let rowSelection = computed(() => {
      if (props.tableConfig.isRowSelection === true) {
        return {
          selectedRowKeys: props.tableConfig.rowData,
          type: props.tableConfig.rowType === 'radio' ? 'radio' : 'checkbox',
          onChange: (keyList, paramsList) => {
            emit('get-row-selection', {
              keyList: keyList,
              paramsList: paramsList
            })
          },
          getCheckboxProps: () => ({
            // disabled:
            //   (!record.published &&
            //     record.published !== null &&
            //     record.published !== undefined) ||
            //   record.dataDeleted
          })
        }
      } else {
        return null
      }
    })

    //监听tableConfig
    watch(
      () => props.tableConfig,
      () => {
        state.pageIndex = props.tableConfig.current
        state.pageSize = props.tableConfig.pageSize
      },
      {
        deep: true,
        immediate: true
      }
    )
    /*------------------------------事件函数----------------------------------*/
    //切换每页显示条数
    const onShowSizeChange = (current, pageSize) => {
      state.pageIndex = 1
      state.pageSize = pageSize
      emit('get-page', {
        pageSize: state.pageSize,
        pageIndex: state.pageIndex
      })
      emit('refresh-btn')
    }

    //切换页码
    let changePage = page => {
      //获取当前页码
      state.pageIndex = page
      emit('get-page', {
        pageSize: state.pageSize,
        pageIndex: state.pageIndex
      })
      emit('refresh-btn')
    }

    //编辑
    const detailBtn = row => {
      emit('detail-btn', row)
    }

    return {
      ...toRefs(state),
      rowSelection,
      changePage,
      onShowSizeChange,
      detailBtn
    }
  }
})
</script>
<style scoped lang="less">
/* @import url(); 引入css类 */
.description {
  position: absolute;
  bottom: 20px;
  left: 0;
}
</style>
