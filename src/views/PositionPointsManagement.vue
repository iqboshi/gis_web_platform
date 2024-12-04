<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { GET_POINTS, DELETE_POINTS } from '@/utils/API'
import { ElMessageBox } from 'element-plus'
import PositionPointDetailForm from '@/components/forms/PositionPointDetailForm.vue'
const search = ref('')

const filterTableData = computed(() =>
  tableData.value.filter(
    data =>
      !search.value ||
      data.created_at.toLowerCase().includes(search.value.toLowerCase()),
  ),
)
const cur_edit_pk = ref()
const handleEdit = (index: number, row: any) => {
  console.log(index, row)
  cur_edit_pk.value = row.pk
  dialogVisible.value = true
}
const handleDelete = async (index: number, row: any) => {
  console.log(index, row)
  DELETE_POINTS(row.pk)
  tableData.value = await GET_POINTS()
}

const tableData = ref([])

onMounted(async () => {
  tableData.value = await GET_POINTS()
})

const handleClose = (done: () => void) => {
  ElMessageBox.confirm('确认退出吗？')
    .then(() => {
      done()
    })
    .catch(() => {
      // catch error
    })
}
const dialogVisible = ref(false)
</script>

<template>
  <el-table :data="filterTableData" style="width: 100%">
    <el-table-column label="Date" prop="created_at" width="200" />
    <el-table-column label="Latitude" prop="latitude" />
    <el-table-column label="Longitude" prop="longitude" />
    <el-table-column label="Description" prop="description" />
    <!-- <el-table-column label="Detail" prop="DetailData" /> -->
    <el-table-column align="right">
      <template #header>
        <el-input v-model="search" size="small" placeholder="按时间搜索" />
      </template>
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">
          编辑
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
  <div class="dialog">
    <el-dialog
      v-model="dialogVisible"
      title="编辑"
      width="500"
      :before-close="handleClose"
    >
      <PositionPointDetailForm :pk="cur_edit_pk" />
      <template #footer>
        <div class="dialog-footer">
          <!-- <el-button size="small" @click="dialogVisible = false"
            >取消</el-button
          >
          <el-button size="small" type="primary" @click="dialogVisible = false">
            开始
          </el-button> -->
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss"></style>
