<script setup lang="ts">
import { ElMenu, ElMenuItem, ElSubMenu } from 'element-plus'
import { isCollapse } from './isCollapse'
import { House, MapLocation, Menu } from '@element-plus/icons-vue'
</script>

<template>
  <el-aside>
    <el-scrollbar>
      <ElMenu router unique-opened :collapse="isCollapse">
        <a href="/" class="logo">
          <img src="@/assets/logo.svg" alt="" />
          <h1>xx系统</h1>
        </a>
        <ElMenuItem index="/">
          <el-icon>
            <House />
          </el-icon>
          <span>首页</span>
        </ElMenuItem>

        <ElSubMenu index="/1">
          <template #title>
            <el-icon>
              <Menu />
            </el-icon>
            <span>基础功能</span>
          </template>
          <ElMenuItem index="/baseMap">
            <el-icon>
              <MapLocation />
            </el-icon>
            <span>基础地图</span>
          </ElMenuItem>

          <ElMenuItem index="/pathPlanning">
            <el-icon>
              <Guide />
            </el-icon>
            <span>路径规划</span>
          </ElMenuItem>
        </ElSubMenu>

        <ElSubMenu index="/2">
          <template #title>
            <el-icon>
              <Folder />
            </el-icon>
            <span>高级功能</span>
          </template>
          <ElSubMenu index="/2_1">
            <template #title>
              <el-icon>
                <Star />
              </el-icon>
              <span>lanshu's project</span>
            </template>
            <ElMenuItem index="/soilRemove">
              <el-icon>
                <Plus />
              </el-icon>
              <span>土壤去除</span>
            </ElMenuItem>
            <ElMenuItem index="/featureSelect">
              <el-icon>
                <Plus />
              </el-icon>
              <span>特征选取</span>
            </ElMenuItem>
          </ElSubMenu>
        </ElSubMenu>
        <ElMenuItem index="/positionPoints">
          <el-icon>
            <Position />
          </el-icon>
          <span>坐标点管理</span>
        </ElMenuItem>
        <ElMenuItem index="/tasksManagement">
          <el-icon>
            <Tickets />
          </el-icon>
          <span>任务管理</span>
        </ElMenuItem>
      </ElMenu>
    </el-scrollbar>
  </el-aside>
</template>

<style scoped lang="scss">
.el-aside {
  background-color: white;
  height: 100vh;
  width: auto;
}
.el-menu {
  width: 200px;
  background-color: white;
  border-right: none;
  &.el-menu--collapse {
    width: 60px;
    & h1 {
      display: none;
    }
  }
}

.logo {
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: black;
  height: 60px;
  img {
    width: 32px;
    height: 32px;
  }
}
</style>
