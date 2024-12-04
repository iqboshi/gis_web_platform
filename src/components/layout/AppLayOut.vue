<script setup lang="ts">
import AppAside from './AppAside.vue'
import AppHeader from './AppHeader.vue'
</script>

<template>
  <div class="common-layout">
    <el-container>
      <AppAside></AppAside>
      <el-container class="header-and-main">
        <AppHeader></AppHeader>
        <el-main>
          <el-scrollbar>
            <RouterView></RouterView>
          </el-scrollbar>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped lang="scss">
.header-and-main {
  flex-direction: column;
  height: 100vh;
}
.el-main {
  padding: 8px;
  background-color: rgba(159, 186, 218, 0.158);
}
</style>
