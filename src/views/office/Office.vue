<template>
  <div class="office-container">
    <el-row class="full-height">
      <el-col :span="isCollapse ? 1 : 4" class="sidebar-col">
        <div class="sidebar-content">
          <div class="logo-container" :class="{ 'collapsed': isCollapse }">
            <img src="/src/assets/icon/office_icon.png" alt="Logo" class="logo" />
          </div>
          <el-menu
            :default-active="activeIndex"
            class="el-menu-vertical"
            :collapse="isCollapse"
            @select="handleSelect"
          >
            <el-menu-item index="1">
              <el-icon><HomeFilled /></el-icon>
              <template #title>{{ $t('office.home') }}</template>
            </el-menu-item>
            <el-menu-item index="2" @click="$router.push('/office/excel')">
              <el-icon><Connection /></el-icon>
              <template #title>{{ $t('office.excel') }}</template>
            </el-menu-item>
            <el-menu-item index="3" @click="$router.push('/office/ppt')">
              <el-icon><Calendar /></el-icon>
              <template #title>{{ $t('office.ppt') }}</template>
            </el-menu-item>
            <el-sub-menu index="4">
              <template #title>
                <el-icon><Menu /></el-icon>
                <span>{{ $t('office.docx') }}</span>
              </template>
              <el-menu-item v-for="i in 8" :key="i" :index="`4-${i}`">
                {{ $t('office.menu_item', { number: i }) }}
              </el-menu-item>
            </el-sub-menu>
          </el-menu>
        </div>
        <div class="collapse-toggle" @click="toggleCollapse">
          <el-icon v-if="isCollapse"><Expand /></el-icon>
          <el-icon v-else><Fold /></el-icon>
        </div>
      </el-col>
      <el-col :span="isCollapse ? 23 : 20" class="content-col">
        <div class="content-area">
          <router-view></router-view>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { HomeFilled, Connection, Calendar, Menu, Expand, Fold } from '@element-plus/icons-vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
console.log(t)
const isCollapse = ref(true)
const activeIndex = ref('1')

const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

const toggleCollapse = () => {
  isCollapse.value = !isCollapse.value
}
</script>
<style scoped>
.office-container {
  background-color: #ffffff;
  color: #333333;
  /* min-height: calc(100vh - 60px); */
}

.full-height {
  height: calc(100vh - 148px);
  display: flex;
}

.sidebar-col {
  height: 100%;
  transition: width 0.3s;
  display: flex;
  flex-direction: column;
  max-width: 10%;
}

.sidebar-content {
  flex-grow: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.logo-container {
  padding: 10px;
  text-align: center;
  position: sticky;
  top: 0;
  background-color: #ffffff;
  z-index: 1;
  transition: all 0.3s;
  border-bottom: 1px solid #e6e6e6;
}

.logo-container.collapsed {
  padding: 5px;
}

.logo {
  max-width: 100%;
  height: auto;
  transition: all 0.3s;
}

.logo-container.collapsed .logo {
  max-width: 80%;
}

.content-col {
  height: 100%;
  transition: width 0.3s;
  flex-grow: 1;
}

.el-menu-vertical {
  border-right: 0px solid #0f0e0e;
  height: 100%;
}

.content-area {
  padding: 20px;
  background-color: #f5f7fa;
  height: 100%;
  overflow-y: auto;
}

.collapse-toggle {
  width: 100%;
  text-align: center;
  padding: 10px 0;
  cursor: pointer;
  background-color: #f5f7fa;
  /* border-top: 1px solid #e6e6e6; */
}

.collapse-toggle:hover {
  background-color: #e6e6e6;
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 200px;
}

.el-menu--collapse .el-sub-menu__title span {
  display: none;
}

.el-menu--collapse .el-sub-menu__icon-arrow {
  display: none;
}

.el-menu--collapse .el-menu-item .el-icon,
.el-menu--collapse .el-sub-menu__title .el-icon {
  margin: 0;
  vertical-align: middle;
  width: 24px;
  text-align: center;
}
</style>