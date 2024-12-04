<script setup lang="ts">
import { ref, reactive } from 'vue'
import axios from 'axios'
import { Plus } from '@element-plus/icons-vue'

const taskId = ref(null)
const taskStatus = ref('')
const progressVisible = ref(false)
const progressPercentage = ref(0)

const formData = reactive({})

//定义一个响应式数组用来接收图片
const fileList = ref([])

//自定义函数用来覆盖原有的XHR行为（默认提交行为）
function httpRequest(option) {
  //将图片存到数组中
  fileList.value.push(option)
  console.log(fileList.value)
}

async function onBtn() {
  const dataForm = new FormData()

  //将图片的二进制通过表单的形式发送到后台
  fileList.value.forEach((it, index) => {
    dataForm.append('files', it.file)
  })
  await axios({
    method: 'POST',
    url: 'http://localhost:8000/API_IMAGE_SYNTHESIS/',
    data: dataForm,
    //设置请求参数的规则
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }).then(response => {
    taskId.value = response.data.task_id
    startPolling()
  })
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
const handleRemove = file => {
  // 直接操作 fileList，不需要再传递 fileList 参数
  const index = fileList.value.findIndex(item => item.file.name === file.name)
  if (index !== -1) {
    fileList.value.splice(index, 1) // 删除文件
    console.log('File removed:', file.name)
  }
}
</script>

<template>
  <div class="image-uploader-container">
    <el-form :model="formData">
      <el-form-item label="文件:" label-width="100">
        <el-upload
          :http-request="httpRequest"
          multiple
          :show-file-list="true"
          :on-remove="handleRemove"
          list-type="picture-card"
          ><el-icon><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <div style="text-align: right">
        <el-button type="primary" @click="onBtn" size="small">合成</el-button>
      </div>
    </el-form>
    <el-divider />
    <!-- 进度条 -->
    <el-progress v-if="progressVisible" :percentage="progressPercentage" />
  </div>
</template>

<style scoped lang="scss">
.image-uploader-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background: #fafafa;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
