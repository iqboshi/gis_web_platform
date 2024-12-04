<script setup lang="ts">
import { ref, reactive } from 'vue'
import axios from 'axios'
import { Plus } from '@element-plus/icons-vue'
import { defineProps } from 'vue'
const props = defineProps({
  pk: {
    type: Number,
    required: true,
  },
})
const formData = reactive({
  describe: '',
})

//定义一个响应式数组用来接收图片
const fileList = ref([])

//自定义函数用来覆盖原有的XHR行为（默认提交行为）
function httpRequest(option) {
  //将图片存到数组中
  fileList.value.push(option)
}

async function onBtn() {
  const dataForm = new FormData()
  dataForm.append('id', props.pk.toString())
  dataForm.append('describe', formData.describe)

  //将图片的二进制通过表单的形式发送到后台
  fileList.value.forEach((it, index) => {
    dataForm.append('files', it.file)
  })
  await axios({
    method: 'POST',
    url: 'http://localhost:8000/API_EDIT_POINTS/',
    data: dataForm,
    //设置请求参数的规则
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }).then(response => {
    console.log(response.data)
  })
}
</script>

<template>
  <el-form :model="formData">
    <el-form-item label="编号:" label-width="100">
      <el-input disabled style="width: 20vw" :value="pk"></el-input>
    </el-form-item>
    <el-form-item label="描述:" label-width="100">
      <el-input
        v-model="formData.describe"
        type="textarea"
        style="width: 20vw"
      ></el-input>
    </el-form-item>
    <el-form-item label="图片:" label-width="100">
      <el-upload
        :http-request="httpRequest"
        multiple
        :show-file-list="true"
        list-type="picture-card"
        ><el-icon><Plus /></el-icon>
      </el-upload>
    </el-form-item>
    <div style="text-align: right">
      <el-button type="primary" @click="onBtn" size="small">添加</el-button>
    </div>
  </el-form>
</template>

<style scoped lang="scss"></style>
