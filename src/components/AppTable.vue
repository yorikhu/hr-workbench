<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue'

interface Props {
  data: any[]
  border?: boolean
  stripe?: boolean
  size?: 'large' | 'default' | 'small'
  fit?: boolean
  showHeader?: boolean
  highlightCurrentRow?: boolean
  currentRowKey?: string | number
  rowKey?: string | number
  showSummary?: boolean
  sumText?: string
}

withDefaults(defineProps<Props>(), {
  border: false,
  stripe: false,
  size: 'default',
  fit: true,
  showHeader: true,
  highlightCurrentRow: false,
  showSummary: false,
  sumText: '合计',
})

const tableClass = computed(() => 'app-table')

let tableWrapper: HTMLElement | null = null

// ============ 列悬停高亮 ============
const handleCellEnter = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  const cell = target.closest('td, th')
  if (!cell) return

  const parent = cell.parentElement
  if (!parent) return

  // 获取单元格所在列的索引
  const isHeader = cell.tagName === 'TH'
  const cells = parent.querySelectorAll(isHeader ? 'th' : 'td')
  const columnIndex = Array.from(cells).indexOf(cell as HTMLTableCellElement)

  if (tableWrapper) {
    // 高亮当前行
    const currentRow = cell.closest('tr')
    if (currentRow) currentRow.classList.add('row-hover')

    // 高亮表头对应列
    const headerRow = tableWrapper.querySelector(
      '.el-table__header-wrapper thead tr',
    )
    if (headerRow) {
      const headerCell = headerRow.querySelectorAll('th')[
        columnIndex
      ] as HTMLElement
      if (headerCell) headerCell.classList.add('column-hover')
    }

    // 高亮数据行对应列
    tableWrapper
      .querySelectorAll('.el-table__body-wrapper tr')
      .forEach((row) => {
        const rowCells = row.querySelectorAll('td')
        if (rowCells[columnIndex]) {
          ;(rowCells[columnIndex] as HTMLElement).classList.add('column-hover')
        }
      })
  }
}

// 移除所有高亮效果
const handleCellLeave = () => {
  if (tableWrapper) {
    tableWrapper
      .querySelectorAll('.column-hover, .row-hover')
      .forEach((el: Element) => {
        el.classList.remove('column-hover', 'row-hover')
      })
  }
}

// ============ 事件监听器 ============
const setupTableListeners = () => {
  if (!tableWrapper) return

  // Bind to body-wrapper for td hover
  const bodyWrapper = tableWrapper.querySelector('.el-table__body-wrapper')
  // Bind to header-wrapper for th hover
  const headerWrapper = tableWrapper.querySelector('.el-table__header-wrapper')

  if (bodyWrapper) {
    bodyWrapper.addEventListener('mouseover', handleCellEnter as EventListener)
    bodyWrapper.addEventListener('mouseout', handleCellLeave as EventListener)
  }

  if (headerWrapper) {
    headerWrapper.addEventListener(
      'mouseover',
      handleCellEnter as EventListener,
    )
    headerWrapper.addEventListener('mouseout', handleCellLeave as EventListener)
  }
}

const removeTableListeners = () => {
  if (!tableWrapper) return

  const bodyWrapper = tableWrapper.querySelector('.el-table__body-wrapper')
  const headerWrapper = tableWrapper.querySelector('.el-table__header-wrapper')

  if (bodyWrapper) {
    bodyWrapper.removeEventListener(
      'mouseover',
      handleCellEnter as EventListener,
    )
    bodyWrapper.removeEventListener(
      'mouseout',
      handleCellLeave as EventListener,
    )
  }

  if (headerWrapper) {
    headerWrapper.removeEventListener(
      'mouseover',
      handleCellEnter as EventListener,
    )
    headerWrapper.removeEventListener(
      'mouseout',
      handleCellLeave as EventListener,
    )
  }
}

onMounted(() => {
  tableWrapper = document.querySelector('.table-wrapper')
  // Wait for table to render
  setTimeout(setupTableListeners, 100)
})

onUnmounted(() => {
  removeTableListeners()
})
</script>

<template>
  <div class="table-wrapper">
    <el-table
      :class="tableClass"
      :data="data"
      :border="border"
      :stripe="stripe"
      :size="size"
      :fit="fit"
      :show-header="showHeader"
      :highlight-current-row="highlightCurrentRow"
      :current-row-key="currentRowKey"
      :row-key="rowKey"
      :show-summary="showSummary"
      :sum-text="sumText"
    >
      <slot></slot>
    </el-table>
  </div>
</template>

<style scoped lang="scss">
.table-wrapper {
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #ebeef5;
}

.app-table {
  :deep(.el-table) {
    margin: 0;
  }

  :deep(.el-table__inner-wrapper) {
    &::before {
      display: none;
    }
  }

  :deep(.el-table__header-wrapper) {
    th {
      background: #f9fafb;
      font-size: 12px;
      color: #6b7280;
      font-weight: 500;

      &.column-hover {
        background-color: #dbeafe !important;
      }
    }
  }

  :deep(.el-table__body-wrapper) {
    td {
      font-size: 13px;
    }

    // 行高亮
    tr.row-hover {
      background: #eff6ff;
    }

    tr.row-hover td {
      background-color: #eff6ff;
    }

    // 列高亮
    td.column-hover {
      background-color: #eff6ff !important;

      // 当前悬停的单元格更深色
      &:hover {
        background-color: #dbeafe !important;
      }
    }

    th.column-hover {
      background-color: #dbeafe !important;
    }

    .el-table__row:last-child {
      td {
        border-bottom: none !important;
      }

      td::before {
        display: none;
      }
    }
  }
}
</style>
