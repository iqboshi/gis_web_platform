<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { GET_TASKS, DELETE_TASKS, TASKS_RESULTS_DOWNLOAD } from '@/utils/API'

const search = ref('')

const filterTableData = computed(() =>
  tableData.value.filter(
    data =>
      !search.value ||
      data.created_at.toLowerCase().includes(search.value.toLowerCase()),
  ),
)
const cur_download_pk = ref()
const handleDownload = (index: number, row: any) => {
  console.log(index, row)
  cur_download_pk.value = row.pk
  TASKS_RESULTS_DOWNLOAD(row.pk)
}
const handleDelete = async (index: number, row: any) => {
  console.log(index, row)
  DELETE_TASKS(row.pk)
  tableData.value = await GET_TASKS()
}

const tableData = ref([])

onMounted(async () => {
  tableData.value = await GET_TASKS()
})
</script>

<template>
  <el-table :data="filterTableData" style="width: 100%">
    <el-table-column label="Date" prop="created_at" width="200" />
    <el-table-column label="Task_id" prop="task_id" />
    <el-table-column label="Task_type" prop="task_type" width="100">
      <template #default="scope">
        <el-tag type="warning">{{ scope.row.task_type }} </el-tag>
      </template>
    </el-table-column>
    <el-table-column label="Result" prop="results" />
    <!-- <el-table-column label="Detail" prop="DetailData" /> -->
    <el-table-column align="right">
      <template #header>
        <el-input v-model="search" size="small" placeholder="按时间搜索" />
      </template>
      <template #default="scope">
        <el-button
          size="small"
          @click="handleDownload(scope.$index, scope.row)"
        >
          下载
        </el-button>
        <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)"
        >
          删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<style scoped lang="scss"></style>
