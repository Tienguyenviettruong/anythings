<template>
  <div class="feature-grid">
    <div class="feature-row" v-for="row in featureRows" :key="row[0].title">
      <div class="feature-card" v-for="feature in row" :key="feature.title">
        <div class="icon-container">
          <el-icon :size="50" :color="'#409EFF'">
            <component :is="feature.icon"></component>
          </el-icon>
        </div>
        <h2>{{ feature.title }}</h2>
        <p>{{ feature.description }}</p>
        <el-button type="primary" plain @click="viewDetail(feature.title)">View Detail</el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { OfficeBuilding, Tickets, Download, Folder } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router';

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
  },{
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
]

const featureRows: any[] = []
for (let i = 0; i < features.length; i += 3) {
  featureRows.push(features.slice(i, i + 3))
}

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
}
</script>

<style scoped>
.feature-grid {
  display: flex;
  flex-direction: column;
  gap: 20px; /* Tăng khoảng cách giãn giữa các card */
  padding: 10px;
  align-items: center;
  margin-top: 5%;
}

.feature-row {
  display: flex;
  justify-content: center;
  gap: 20px; /* Tăng khoảng cách giãn giữa các card */
}

.feature-card {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 10px;
  width: calc(16.666% - 20px); /* Giảm kích cỡ thẻ xuống một nửa */
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; /* Căn giữa theo chiều dọc */
}

.icon-container {
  background-color: #ecf5ff;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
}

h2 {
  margin-bottom: 5px;
  color: #303133;
}

p {
  color: #606266;
  margin-bottom: 10px;
}
</style>
