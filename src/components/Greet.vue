<template>
  <div class="greet-background">
    <div class="feature-circle" :style="circleStyle">
      <div
        v-for="(feature, index) in features"
        :key="feature.title"
        class="feature-item"
        :style="getPosition(index)"
      >
        <div class="icon-container" @click="viewDetail(feature.title)" :title="feature.title">
          <div class="gradient-background">
            <img src="../assets/logo_cool.png" alt="Logo" class="feature-icon">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { computed, ref, watchEffect } from 'vue';

const router = useRouter();

const features = ref([
  {
    title: 'Office',
    description: 'Understand the design guidelines'
  },
  {
    title: 'Component',
    description: 'Experience interaction details by strolling through component demos.'
  },
  {
    title: 'Resource',
    description: 'Download relevant design resources for shaping page prototype or visual draft'
  },
  {
    title: 'Guide',
    description: 'Understand the design guidelines'
  },
  {
    title: 'Component',
    description: 'Experience interaction details by strolling through component demos.'
  },
  
  {
    title: 'Design',
    description: 'Design form and components'
  }
]);

const baseRadius = 180;
const radius = ref(baseRadius);

watchEffect(() => {
  radius.value = baseRadius + (features.value.length - 6) * 20;
});

const circleStyle = computed(() => ({
  width: `${radius.value * 2}px`,
  height: `${radius.value * 2}px`,
}));

const getPosition = (index: number) => {
  const angle = (index / features.value.length) * 2 * Math.PI;
  const x = Math.cos(angle) * radius.value;
  const y = Math.sin(angle) * radius.value;
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
.greet-background {
  background-image: url('../assets/greet-bg.svg');
  background-size: cover;
  background-position: center;
  min-height: calc(100vh - 150px);
  display: flex;
  justify-content: center;
  align-items: center;
}

.greet-background .feature-circle {
  margin: auto;
  transition: all 0.5s ease;
}

.greet-background .feature-circle .feature-item {
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: all 0.5s ease;
}

.icon-container {
  background-color: rgba(236, 245, 255, 0.8);
  border-radius: 50%;
  width: 80px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
  overflow: hidden;
}

.icon-container:hover {
  transform: scale(1.1);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.gradient-background {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(45deg, rgba(255, 154, 158, 0.8), rgba(250, 208, 196, 0.8), rgba(255, 236, 210, 0.8));
}

.feature-icon {
  width: 50px;
  height: 50px;
  object-fit: contain;
}
</style>
