<script setup lang="ts">
import { Expand, Fold } from '@element-plus/icons-vue'
import { isCollapse } from './isCollapse'
</script>

<template>
  <el-header>
    <el-icon @click="isCollapse = !isCollapse">
      <Expand v-show="isCollapse"></Expand>
      <Fold v-show="!isCollapse"></Fold>
    </el-icon>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item
        v-for="(item, index) in $route.matched"
        :key="index"
        :to="{ path: item.path }"
        >{{ item.meta.title }}</el-breadcrumb-item
      >
    </el-breadcrumb>

    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar
          :size="32"
          :src="'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'"
        />
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>用户名</el-dropdown-item>
          <el-dropdown-item divided>退出</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </el-header>
</template>

<style scoped lang="scss">
.el-header {
  display: flex;
  align-items: center;
  background-color: rgba(159, 186, 218, 0.197);
  .el-icon {
    margin-right: 17px;
  }
}

.el-dropdown {
  margin-left: auto;
}

:deep(.el-tooltip__trigger:focus-visible) {
  outline: unset;
}

.el-dropdown-link {
  cursor: pointer;
}
</style>
