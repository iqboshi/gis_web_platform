<script setup lang="ts">
import { BMap } from 'vue3-baidu-map-gl'
import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  usePointGeocoder,
  PointGeocoderResult,
  useBrowserLocation,
} from 'vue3-baidu-map-gl'
import LogLocationsForm from '@/components/forms/LogLocationsForm.vue'
import { logLocationRadio, interval } from '@/components/forms/shareVar'
import { SEND_POINTS } from '@/utils/API'
const {
  get: getSelfPosition,
  location,
  isLoading: isLoadingSelfPosition,
} = useBrowserLocation(null, () => {})
const { get, result, isLoading, isEmpty } =
  usePointGeocoder<PointGeocoderResult>()
const type = ref('BMAP_EARTH_MAP')
const point = ref({ lat: 40.012218454942996, lng: 116.3636465783671 })
const markerPoint = point
const dialogVisible = ref(false)

const logLocationButtonTag = ref(0)

const logLocationPointArr = ref([])

function handleInitd() {
  get(point.value)
  getSelfPosition()
}
function handleClick(e: any) {
  console.log(e.latlng)
  // console.log(logLocationPointArr.value)
  markerPoint.value = e.latlng
  if (logLocationRadio.value === 0) {
    logLocationPointArr.value.push(markerPoint.value)
    ElMessage({
      message: '点位采集成功.',
      type: 'success',
      plain: true,
    })
  }
  get(e.latlng)
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

function logLocationsBegin() {
  dialogVisible.value = false
  logLocationButtonTag.value = 1
  ElMessage({
    message: '开始成功.',
    type: 'success',
    plain: true,
  })
  //开始采集
  if (!logLocationRadio.value) {
    logLocationPointArr.value = []
    const interval = setInterval(async () => {
      console.log('当前数组长度:', logLocationPointArr.value.length)

      if (logLocationButtonTag.value == 0) {
        console.log('发送所有点')
        SEND_POINTS(logLocationPointArr.value)
        clearInterval(interval)
        ElMessage({
          message: '停止成功.',
          type: 'success',
          plain: true,
        })
      }
    }, 500)
  } else {
    logLocationPointArr.value = []
    const intervalId = setInterval(() => {
      getSelfPosition()
      console.log(location.value.point)
      logLocationPointArr.value.push(location.value.point)
      ElMessage({
        message: '点位采集成功.',
        type: 'success',
        plain: true,
      })

      if (logLocationButtonTag.value == 0) {
        clearInterval(intervalId)
        ElMessage({
          message: '停止成功.',
          type: 'success',
          plain: true,
        })
        console.log('跟踪定位已停止')
      }
    }, interval.value * 1000)
  }
}
</script>

<template>
  <BMap
    enable-scroll-wheel-zoom
    :mapType="type"
    :center="logLocationRadio === 0 ? point : location.point"
    @initd="handleInitd"
    @click="handleClick"
  >
    <template v-if="!isLoading && !isEmpty">
      <BMarker :position="point" icon="loc_blue"></BMarker>
      <BLabel
        style="color: #333; font-size: 9px"
        :position="result.point"
        :content="`地址: ${result?.address} 经纬度: (${markerPoint.lng},${markerPoint.lat}) 最匹配地点: ${
          result?.surroundingPois[0]?.title || '无'
        }`"
      />
    </template>

    <template v-if="!isLoadingSelfPosition && logLocationRadio === 1">
      <BMarker :position="location.point" icon="loc_red"></BMarker>
      <BCircle
        strokeStyle="solid"
        strokeColor="#0099ff"
        :strokeOpacity="0.8"
        fillColor="#0099ff"
        :fillOpacity="0.5"
        :center="location.point"
        :radius="location.accuracy"
      />
    </template>
    <BCityList />
    <BNavigation3d />
    <BScale />
    <!-- <BZoom /> -->
    <BLocation />
  </BMap>
  <br />
  <el-select name="" id="" v-model="type" size="small" style="width: 240px">
    <el-option size="small" value="BMAP_NORMAL_MAP">常规地图</el-option>
    <el-option size="small" value="BMAP_EARTH_MAP">地球模式</el-option>
    <el-option size="small" value="BMAP_SATELLITE_MAP">卫星图</el-option>
  </el-select>
  <div class="functions">
    <el-popover
      placement="top-start"
      title="介绍"
      :width="200"
      trigger="hover"
      content="选择点击获取/跟踪获取.点击采集:收集鼠标在地图上点击的点,跟踪采集:收集一段时间内经过的点."
    >
      <template #reference>
        <el-button
          :type="logLocationButtonTag === 0 ? 'default' : 'danger'"
          class="m-2"
          size="small"
          @click="
            logLocationButtonTag === 0
              ? (dialogVisible = true)
              : (logLocationButtonTag = 0)
          "
          >{{ logLocationButtonTag === 0 ? '点位采集' : '停止' }}
        </el-button>
      </template>
    </el-popover>
  </div>

  <div class="table" style="margin-top: 8px">
    <el-table
      :data="logLocationPointArr"
      max-height="250"
      style="table-layout: auto; width: 100%"
    >
      <el-table-column prop="lng" label="经度" width="180" />
      <el-table-column prop="lat" label="维度" width="180" />
    </el-table>
  </div>

  <div class="dialog">
    <el-dialog
      v-model="dialogVisible"
      title="设置"
      width="500"
      :before-close="handleClose"
    >
      <LogLocationsForm />
      <template #footer>
        <div class="dialog-footer">
          <el-button size="small" @click="dialogVisible = false"
            >取消</el-button
          >
          <el-button size="small" type="primary" @click="logLocationsBegin">
            开始
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.functions {
  margin-left: 8px;
  display: inline-block;
}
</style>
