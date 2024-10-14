<template>
  <div class="feature-circle">
    <div
      v-for="(feature, index) in features"
      :key="feature.title"
      class="feature-item"
      :style="getPosition(index)"
    >
      <div class="icon-container" @click="viewDetail(feature.title)" :title="feature.description">
        <el-icon :size="50" :color="'#409EFF'">
          <component :is="feature.icon"></component>
        </el-icon>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { OfficeBuilding, Tickets, Download, Folder } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router';
import { computed } from 'vue';

const router = useRouter();

const features = [
  {
    icon: OfficeBuilding,
    title: 'Office',
    description: 'Understand the design guidelines'
  },
  {
    icon: Tickets,
    title: 'Component',
    description: 'Experience interaction details by strolling through component demos.'
  },
  {
    icon: Download,
    title: 'Resource',
    description: 'Download relevant design resources for shaping page prototype or visual draft'
  },
  {
    icon: Folder,
    title: 'Guide',
    description: 'Understand the design guidelines'
  },
  {
    icon: Tickets,
    title: 'Component',
    description: 'Experience interaction details by strolling through component demos.'
  },
  {
    icon: Download,
    title: 'Design',
    description: 'Design form and components'
  }
];

const getPosition = (index: number) => {
  const angle = (index / features.length) * 2 * Math.PI;
  const radius = 150; // Adjust this value to change the circle size
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius;
  return {
    transform: `translate(${x}px, ${y}px)`,
  };
};

const viewDetail = (title: string) => {
  switch (title) {
    case 'Office':
      router.push('/office');
      break;
    case 'Component':
      router.push('/component');
      break;
    case 'Design':
      router.push('/design');
      break;
    case 'Guide':
      router.push('/guide');
      break;
    default:
      console.log(`Không có trang tương ứng cho ${title}`);
  }
};
</script>

<style scoped>
.feature-circle {
  position: relative;
  width: 400px;
  height: 400px;
  margin: auto;
}

.feature-circle .feature-item {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.icon-container {
  background-color: #ecf5ff;
  border-radius: 50%;
  width: 80px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.icon-container:hover {
  transform: scale(1.1);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>
