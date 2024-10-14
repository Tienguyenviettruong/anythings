<template>
  <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
    <el-radio-button :value="false">expand</el-radio-button>
    <el-radio-button :value="true">collapse</el-radio-button>
  </el-radio-group>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    @open="handleOpen"
    @close="handleClose"
  >
    <template v-for="(menu, index) in menuItems" :key="index">
      <el-sub-menu v-if="menu.children" :index="menu.index">
        <template #title>
          <el-icon><component :is="menu.icon" /></el-icon>
          <span>{{ menu.title }}</span>
        </template>
        <el-menu-item-group v-for="(group, groupIndex) in menu.children" :key="groupIndex">
          <template #title v-if="group.title">{{ group.title }}</template>
          <el-menu-item v-for="item in group.items" :key="item.index" :index="item.index">
            {{ item.title }}
          </el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
      <el-menu-item v-else :index="menu.index">
        <el-icon><component :is="menu.icon" /></el-icon>
        <template #title>{{ menu.title }}</template>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script lang="ts" setup>
import { PropType, ref } from 'vue'

const isCollapse = ref(true)
const activeIndex = ref('1')

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

// Define props for menu items
const props = defineProps({
  menuItems: {
    type: Array as PropType<Array<{ 
      index: string, 
      title: string, 
      icon: any, 
      children?: Array<{ 
        title?: string, 
        items: Array<{ 
          index: string, 
          title: string 
        }> 
      }> 
    }>>,
    required: true,
  }
})
console.log(props)
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>