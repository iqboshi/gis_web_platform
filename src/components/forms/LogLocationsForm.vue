<script setup lang="ts">
import { logLocationRadio, interval } from './shareVar'
</script>

<template>
  <el-radio-group v-model="logLocationRadio">
    <el-radio :value="0">点击采集</el-radio>
    <el-radio :value="1">跟踪采集</el-radio>
  </el-radio-group>
  <el-divider v-if="logLocationRadio" content-position="left"
    >请选择</el-divider
  >
  <el-input-number
    v-if="logLocationRadio"
    v-model="interval"
    style="width: 240px"
    placeholder="时间间隔(s)"
  />
</template>

<style scoped lang="scss"></style>
