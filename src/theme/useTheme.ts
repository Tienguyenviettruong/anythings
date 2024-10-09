import { ref, onMounted, watch } from 'vue';

export function useTheme() {
  const isDarkTheme = ref(false);

  const toggleTheme = () => {
    isDarkTheme.value = !isDarkTheme.value;
    updateTheme();
  };

  const updateTheme = () => {
    if (isDarkTheme.value) {
      document.body.classList.add('dark-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-theme');
      localStorage.setItem('theme', 'light');
    }
  };

  onMounted(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      isDarkTheme.value = true;
      updateTheme();
    }
  });

  watch(isDarkTheme, updateTheme);

  return {
    isDarkTheme,
    toggleTheme
  };
}