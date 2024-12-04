<script setup lang="ts">
import { ref } from 'vue'
import { useTrackAnimation } from 'vue3-baidu-map-gl'
import { ElMessageBox } from 'element-plus'
import PathPlanningForm from '@/components/forms/PathPlanningForm.vue'
import { origin, destination, selectValue } from '@/components/forms/shareVar'
const map = ref(null)
const dialogVisible = ref(false)
const { setPath, start, cancel, stop, proceed, status } = useTrackAnimation(
  map,
  {
    duration: 10000,
    delay: 0,
  },
)
const path = [
  {
    lng: 116.297611,
    lat: 40.047363,
  },
  {
    lng: 116.302839,
    lat: 40.048219,
  },
  {
    lng: 116.308301,
    lat: 40.050566,
  },
  {
    lng: 116.305732,
    lat: 40.054957,
  },
  {
    lng: 116.304754,
    lat: 40.057953,
  },
  {
    lng: 116.306487,
    lat: 40.058312,
  },
  {
    lng: 116.307223,
    lat: 40.056379,
  },
]
function handleInitd() {
  setPath(path)
}
const handleClose = (done: () => void) => {
  ElMessageBox.confirm('确认退出吗？')
    .then(() => {
      done()
    })
    .catch(() => {
      // catch error
    })
}
function startFunction() {
  dialogVisible.value = false
  //构造网络请求 获得路径规划
  start()
}
</script>

<template>
  <div>
    <BMap
      :center="{
        lng: 116.308301,
        lat: 40.050566,
      }"
      :zoom="16"
      :plugins="['TrackAnimation']"
      ref="map"
      @pluginReady="handleInitd"
    />
    <div class="state" style="margin-bottom: 8px; font-size: small">
      <span>动画状态: {{ status !== 'INITIAL' ? '已开始' : '未开始' }}</span>
      <span
        >播放状态:
        {{
          status === 'INITIAL' || status === 'STOPPING' ? '未播放' : '播放中'
        }}</span
      >
    </div>
    <el-popover
      placement="top-start"
      title="介绍"
      :width="200"
      trigger="hover"
      content="选择需要路径规划的两点及出行方式."
    >
      <template #reference>
        <el-button
          type="default"
          class="m-2"
          size="small"
          @click="dialogVisible = true"
          >开始
        </el-button>
      </template>
    </el-popover>

    <!-- <el-button size="small" @click="startFunction">开始</el-button> -->
    <el-button size="small" @click="stop">暂停</el-button>
    <el-button size="small" @click="proceed">继续</el-button>
    <el-button size="small" @click="cancel">取消</el-button>
  </div>

  <div class="dialog">
    <el-dialog
      v-model="dialogVisible"
      title="设置"
      width="500"
      :before-close="handleClose"
    >
      <PathPlanningForm />
      <template #footer>
        <div class="dialog-footer">
          <el-button size="small" @click="dialogVisible = false"
            >取消</el-button
          >
          <el-button size="small" type="primary" @click="startFunction">
            确定
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.state {
  margin-top: 15px;
}
.state span {
  margin-right: 25px;
}
</style>
