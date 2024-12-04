<script setup lang="ts">
import { UploadFilled } from '@element-plus/icons-vue'
import { ref } from 'vue'
import axios from 'axios'

const taskId = ref(null)
const taskStatus = ref('')
const progressVisible = ref(false)
const progressPercentage = ref(0)

// 处理上传成功
const handleUploadSuccess = response => {
  console.log('上传成功：', response)
  // 获取任务 ID 并启动轮询
  taskId.value = response.task_id
  startPolling()
}

// 轮询任务状态
let pollingInterval = null
const startPolling = () => {
  progressVisible.value = true
  progressPercentage.value = 0
  pollingInterval = setInterval(checkTaskStatus, 1000) // 每1秒检查一次任务状态，增加频率
}

// 检查任务状态
const checkTaskStatus = async () => {
  if (!taskId.value) return

  try {
    const response = await axios.get(
      `http://localhost:8000/task-progress/${taskId.value}/`,
    )
    const { state, progress, result } = response.data
    // console.log(progress)
    // 更新进度条
    if (state === 'PROGRESS') {
      progressPercentage.value = progress
      taskStatus.value = `当前进度：${progress.toFixed(2)}%`
    }

    // 任务完成后，停止轮询
    if (state === 'SUCCESS') {
      clearInterval(pollingInterval)
      progressPercentage.value = 100
      taskStatus.value = result
    }
  } catch (error) {
    console.error('检查任务状态失败', error)
  }
}
</script>

<template>
  <el-upload
    class="upload-demo"
    drag
    action="http://localhost:8000/API_SOIL_REMOVE/"
    multiple
    :on-success="handleUploadSuccess"
  >
    <el-icon class="el-icon--upload"><upload-filled /></el-icon>
    <div class="el-upload__text">
      Drop file here or <em>click to upload</em>
    </div>
    <template #tip>
      <div class="el-upload__tip">
        jpg/png files with a size less than 500kb
      </div>
    </template>
  </el-upload>

  <!-- 进度条 -->
  <el-progress v-if="progressVisible" :percentage="progressPercentage" />
</template>

<style scoped lang="scss"></style>
