<script setup lang="ts">
import { ref } from 'vue';
import Header from './layout/Header.vue';
import Footer from './layout/Footer.vue';

const activeTab = ref('home');

const setActiveTab = (tab: string) => {
  activeTab.value = tab;
};
</script>

<template>
  <div class="app">
    <Header :activeTab="activeTab" @set-active-tab="setActiveTab" />
    <router-view></router-view>
    <Footer />
  </div>
</template>

<style>
.app {
  font-family: Arial, sans-serif;
  color: #333;
  padding-top: 80px; /* Add padding to account for fixed header */
}
</style>