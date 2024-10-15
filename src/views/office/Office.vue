<template>
  <div class="office-container" :class="{ 'dark-theme': isDarkTheme }">
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
            <el-menu-item index="1" @click="$router.push('/office/officehome')">
              <img src="/src/assets/icon/home-icon.png" alt="Excel" class="menu-icon" />
              <template #title>{{ $t('office.home') }}</template>
            </el-menu-item>
            <el-menu-item index="2" @click="$router.push('/office/excel')">
              <!-- <el-icon><Connection /></el-icon> -->
              <img src="/src/assets/icon/excel-icon.png" alt="Excel" class="menu-icon" />
              <template #title>{{ $t('office.excel') }}</template>
            </el-menu-item>
            <el-menu-item index="3" @click="$router.push('/office/ppt')">
              <img src="/src/assets/icon/ppt-icon.png" alt="Excel" class="menu-icon" />
              <template #title>{{ $t('office.ppt') }}</template>
            </el-menu-item>
            <el-sub-menu index="4">
              <template #title>
                <img src="/src/assets/icon/docx-icon.png" alt="Excel" class="menu-icon" />
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
import { useTheme } from '../../theme/useTheme'

const { t } = useI18n()
const { isDarkTheme } = useTheme()

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

.office-container .full-height {
  height: calc(100vh - 150px);
  display: flex;
}

.sidebar-col {
  height: 100%;
  transition: width 0.3s;
  display: flex;
  flex-direction: column;
  max-width: 10%;
  border-right: 1px solid #e6e6e6; 
}

.sidebar-content {
  flex-grow: 1;
  /* overflow-y: auto; */
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
  padding-left: 20px;
}

.el-menu-vertical {
  border-right: 0px solid #0f0e0e;
  height: 100%;
}

.office-container .content-area {
  /* padding: 20px; */
  background-color: #f5f7fa;
  height: 100%;
  overflow-y: auto;
  border-radius: 10px;
  border: 1px solid #e6e6e6;
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
  max-width: 10%;
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
.dark-theme {
  background-color: #130b3f;
  color: #ffffff;
}

.dark-theme .sidebar-col,
.dark-theme .logo-container,
.dark-theme .el-menu {
  background-color: #212052;
  color: #ffffff;
  border-color: #444;
}

.dark-theme .content-area {
  background-color: #333;
}

.dark-theme .collapse-toggle {
  background-color: #2c2c2c;
  color: #ffffff;
}

.dark-theme .collapse-toggle:hover {
  background-color: #444;
}
.menu-icon {
  margin-right: 10px;
}

.el-menu-item,
.el-sub-menu__title {
  display: flex;
  align-items: center;
}

.el-menu-item .el-icon,
.el-sub-menu__title .el-icon {
  margin-right: 10px;
}

</style>