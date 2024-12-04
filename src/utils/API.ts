import axios from 'axios'
import { ElMessage } from 'element-plus'
export const SEND_POINTS = async (data: any) => {
  try {
    // 发送 POST 请求
    const response = await axios.post(
      'http://localhost:8000/API_SEND_POINTS/',
      {
        data: data,
      },
      {
        headers: {
          'Content-Type': 'application/json', // 确保请求头正确
        },
      },
    )

    // 处理响应数据
    console.log('Response:', response.data)
    ElMessage({
      message: '点位数据发送成功.',
      type: 'success',
      plain: true,
    })
  } catch (error) {
    console.error('Error sending data:', error)
    ElMessage({
      message: '点位数据发送失败.',
      type: 'error',
    })
  }
}

export const GET_POINTS = async () => {
  try {
    // 发送请求
    const response = await axios.get('http://localhost:8000/API_GET_POINTS/')

    // 处理响应数据

    console.log('Response:', response.data)
    ElMessage({
      message: '点位数据获取成功.',
      type: 'success',
      plain: true,
    })
    return response.data || []
  } catch (error) {
    console.error('Error sending data:', error)
    ElMessage({
      message: '点位数据获取失败.',
      type: 'error',
    })
    return []
  }
}

export const DELETE_POINTS = async pk => {
  try {
    // 发送请求
    const response = await axios.get(
      'http://localhost:8000/API_DELETE_POINTS/',
      {
        params: {
          id: pk,
        },
      },
    )

    // 处理响应数据

    console.log('Response:', response.data)
    ElMessage({
      message: '点位数据删除成功.',
      type: 'success',
      plain: true,
    })
  } catch (error) {
    console.error('Error sending data:', error)
    ElMessage({
      message: '点位数据删除失败.',
      type: 'error',
    })
  }
}

export const GET_TASKS = async () => {
  try {
    // 发送请求
    const response = await axios.get('http://localhost:8000/API_GET_TASKS/')

    // 处理响应数据

    console.log('Response:', response.data)
    ElMessage({
      message: '任务数据获取成功.',
      type: 'success',
      plain: true,
    })
    return response.data || []
  } catch (error) {
    console.error('Error sending data:', error)
    ElMessage({
      message: '任务数据获取失败.',
      type: 'error',
    })
    return []
  }
}

export const DELETE_TASKS = async pk => {
  try {
    // 发送请求
    const response = await axios.get(
      'http://localhost:8000/API_DELETE_TASKS/',
      {
        params: {
          id: pk,
        },
      },
    )

    // 处理响应数据

    console.log('Response:', response.data)
    ElMessage({
      message: '任务数据删除成功.',
      type: 'success',
      plain: true,
    })
  } catch (error) {
    console.error('Error sending data:', error)
    ElMessage({
      message: '任务数据删除失败.',
      type: 'error',
    })
  }
}

export const TASKS_RESULTS_DOWNLOAD = async pk => {
  try {
    // 发送请求
    const response = await axios.get(
      'http://localhost:8000/API_TASKS_RESULTS_DOWNLOAD/',
      {
        params: {
          id: pk,
        },
        responseType: 'blob',
      },
    )

    // 处理响应数据
    // 创建一个 Blob 对象用于保存文件
    const blob = new Blob([response.data], { type: 'application/zip' })
    const link = document.createElement('a')
    link.href = window.URL.createObjectURL(blob)
    link.download = `task_results_${pk}.zip`
    link.click()
    // console.log('Response:', response.data)
    ElMessage({
      message: '任务结果下载成功.',
      type: 'success',
      plain: true,
    })
  } catch (error) {
    console.error('Error sending data:', error)
    ElMessage({
      message: '任务结果下载失败.',
      type: 'error',
    })
  }
}
