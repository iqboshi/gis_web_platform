<script setup lang="ts">
import { origin, destination, selectValue } from './shareVar'
const options = [
  {
    value: '0',
    label: '驾车路线规划',
  },
  {
    value: '1',
    label: '骑行路线规划',
  },
  {
    value: '2',
    label: '步行路线规划',
  },
  {
    value: '3',
    label: '公交路线规划',
  },
]
</script>

<template>
  <el-input-number
    size="small"
    v-model="origin.lng"
    :min="0"
    :max="90"
    :step="0.000001"
    :precision="6"
    placeholder="起点经度"
    style="width: 200px"
  />
  <el-input-number
    size="small"
    v-model="origin.lat"
    :min="0"
    :max="180"
    :step="0.000001"
    :precision="6"
    placeholder="起点纬度"
    style="width: 200px"
  />
  <el-input-number
    size="small"
    v-model="destination.lng"
    :min="0"
    :max="90"
    :step="0.000001"
    :precision="6"
    placeholder="终点经度"
    style="width: 200px"
  />
  <el-input-number
    size="small"
    v-model="destination.lat"
    :min="0"
    :max="180"
    :step="0.000001"
    :precision="6"
    placeholder="终点纬度"
    style="width: 200px"
  />
  <el-select
    v-model="selectValue"
    placeholder="Select"
    size="small"
    style="width: 240px; margin-top: 8px; margin-left: 8px"
  >
    <el-option
      size="small"
      v-for="(item, index) in options"
      :key="index"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
</template>

<style scoped lang="scss">
.el-input-number {
  margin-top: 8px;
  margin-left: 8px;
}
</style>
