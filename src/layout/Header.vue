<template>
    <header class="header" :class="{ 'dark-theme': isDarkTheme }">
      <div class="logo-search">
        <div class="logo">
          <img src="../assets/logo.svg" alt="Logo" />
        </div>
        <div class="search-bar" @click="openSearchPopup">
          <img src="../assets/search.svg" alt="Search" />
          <input type="text" placeholder="Search..." readonly />
        </div>
      </div>
    
      <div class="user-actions">
      <button @click="toggleTheme" class="theme-toggle">
        <svg v-if="isDarkTheme" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      </button>
      <div class="language-select">
        <select>
          <option value="en">
            <img src="../assets/icon/lang.png" alt="Language" />
            Español
          </option>
        </select>
      </div>
        <div class="user-avatar" style="border-radius: 100%;">
        </div>
      <!-- <button @click="openLoginPopup">Login</button>
      <button>Sign Up</button> -->
    </div>
    </header>
    <div v-if="isSearchPopupOpen" class="search-popup">
      <div class="search-popup-content">
        <input type="text" placeholder="Tìm kiếm..." ref="popupSearchInput" @keyup.esc="closeSearchPopup" />
        <button @click="closeSearchPopup">Close</button>
      </div>
    </div>
    <Login v-if="isLoginPopupOpen" @close="closeLoginPopup" />
  </template>
  
  <script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useTheme } from '../theme/useTheme';
// import  Login  from '../views/Login.vue';

const isSearchPopupOpen = ref(false);
const isLoginPopupOpen = ref(false);
const popupSearchInput = ref<HTMLInputElement | null>(null);
const { isDarkTheme, toggleTheme } = useTheme();
const emit = defineEmits(['login-success']);
const openSearchPopup = () => {
  isSearchPopupOpen.value = true;
  setTimeout(() => {
    popupSearchInput.value?.focus();
  }, 0);
};

const closeSearchPopup = () => {
  isSearchPopupOpen.value = false;
};
const openLoginPopup = () => {
  isLoginPopupOpen.value = true;
};

const closeLoginPopup = (success: boolean) => {
  isLoginPopupOpen.value = false;
  if (success) {
    emit('login-success');
  }
};

onMounted(() => {
  window.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'k') {
      e.preventDefault();
      openSearchPopup();
    }
  });
});
</script>
  
  <style scoped>
  .header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    background-color: rgb(246, 247, 249);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s ease;
    
  }
  
  .header.dark-theme {
    background-color: #333;
    color: white;
  }
  
  .logo-search {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  
  .logo img {
    height: 40px;
  }
  
  .search-bar {
    display: flex;
    align-items: center;
    background-color: #f0f0f0;
    border-radius: 20px;
    padding: 5px 10px;
    cursor: pointer;
    width: 200px;
  }
  
  .search-bar img {
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }
  
  .search-bar input {
    border: none;
    background: transparent;
    padding: 5px;
    width: 100%;
    cursor: pointer;
  }
  
  .navigation ul {
    display: flex;
    list-style-type: none;
    gap: 1rem;
  }
  
  .navigation a {
    text-decoration: none;
    color: inherit;
    font-weight: bold;
  }
  
  .user-actions {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }
  
  .user-actions button {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .user-actions button:first-child {
    background-color: transparent;
    color: inherit;
  }
  
  .user-actions button:last-child {
    background-color: #007bff;
    color: white;
  }
  
  .theme-toggle {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
  }
  
  .theme-toggle svg {
    width: 18px;
    height: 18px;
  }
  
  .search-popup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding-top: 80px;
    z-index: 1001;
  }
  
  .search-popup-content {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    width: 80%;
    max-width: 600px;
    display: flex;
    gap: 10px;
  }
  
  .search-popup-content input {
    flex-grow: 1;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .search-popup-content button {
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  .dark-theme .search-bar {
  background-color: #444;
  color: #ffffff;
}

.dark-theme .search-bar input {
  color: #ffffff;
}

.dark-theme .user-actions button {
  color: #ffffff;
}

.dark-theme .search-popup-content {
  background-color: #2c2c2c;
  color: #ffffff;
}

.dark-theme .search-popup-content input {
  background-color: #444;
  color: #ffffff;
  border-color: #555;
}

.dark-theme .search-popup-content button {
  background-color: #007bff;
  color: #ffffff;
}
.user-avatar {
  width: 30px;
  height: 30px;
  background-image: url('../assets/avatar/avatar.jpg');
  background-size: cover;
  background-position: center;
  border-color: aqua;
  margin-left: 15px;
}
.language-select {
  position: relative;
  display: inline-block;
}

.language-select select {
  appearance: none;
  background-color: transparent;
  border: none;
  padding: 0 20px 0 30px;
  margin: 0;
  width: 100%;
  font-family: inherit;
  font-size: 14px;
  cursor: pointer;
  line-height: 1.5;
  color: inherit;
}

.language-select::before {
  content: '';
  position: absolute;
  left: 5px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  background-image: url('../assets/icon/lang.png');
  background-size: contain;
  background-repeat: no-repeat;
}

.language-select::after {
  content: '\25BC';
  position: absolute;
  top: 50%;
  right: 5px;
  transform: translateY(-50%);
  pointer-events: none;
}

.dark-theme .language-select select {
  color: #ffffff;
}
  </style>