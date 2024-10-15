<script setup lang="ts">
import { ref } from 'vue';
import Header from './layout/Header.vue';
import Footer from './layout/Footer.vue';
import { useTheme } from './theme/useTheme';
const activeTab = ref('home');
const { isDarkTheme } = useTheme();
const setActiveTab = (tab: string) => {
  activeTab.value = tab;
};
</script>

<template>
  <div class="app" :class="{ 'dark-theme': isDarkTheme }">
    <Header :activeTab="activeTab" @set-active-tab="setActiveTab" />
    <router-view></router-view>
    <Footer />
  </div>
</template>

<style>
.app {
  font-family: Arial, sans-serif;
  color: #333;
  padding-top: 80px;
  transition: background-color 0.3s, color 0.3s;
}
.dark-theme {
  background-color: #1a1a1a;
  color: #ffffff;
}
</style>