<template>
  <div style="padding-left: 20px;">
    <!-- <h1>{{ t('ppt.title') }}</h1> -->
    <p>{{ t('ppt.description') }}</p>
    <iframe src="https://pipipi-pikachu.github.io/PPTist/" width="100%" height="850" frameborder="0"></iframe>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>
