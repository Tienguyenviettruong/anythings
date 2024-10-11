<template>
    <header class="header" :class="{ 'dark-theme': isDarkTheme }">
      <el-row class="logo-search">
        <div class="logo">
          <img src="../assets/logo.svg" alt="Logo" />
        </div>
        <div class="search-bar" @click="openSearchPopup">
          <img src="../assets/search.svg" alt="Search" />
          <input type="text" placeholder="Search..." readonly />
        </div>
      </el-row>
    
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
  <select v-model="$i18n.locale">
    <option value="en">{{ $t('languages.english') }}</option>
    <option value="vi">{{ $t('languages.vietnamese') }}</option>
  </select>
</div>
        <div class="user-avatar">
          <img src="../assets/avatar/avatar.jpg" alt="User Avatar" />
          <div class="avatar-options">
            <div v-if="isLoggedIn" class="option" @click="logout"><i class="icon-heart"></i> Logout</div>
            <div v-else class="option" @click="openLoginPopup"><i class="icon-heart"></i> Login</div>
            <div class="option"><i class="icon-star"></i> Oddo</div>
            <div class="option"><i class="icon-history"></i> Market</div>
          </div>
        </div>
    </div>
    </header>
    <div v-if="isSearchPopupOpen" class="search-popup">
      <div class="search-popup-content">
        <input type="text" placeholder="Tìm kiếm..." ref="popupSearchInput" @keyup.esc="closeSearchPopup" />
        <button @click="closeSearchPopup">Close</button>
      </div>
    </div>
    <Login v-if="showLoginPopup" @close="closeLoginPopup" @login-success="handleLoginSuccess" />
  </template>
  
  <script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useTheme } from '../theme/useTheme';
import Login from '../views/login/Login.vue';
import { useRouter } from 'vue-router';
const isSearchPopupOpen = ref(false);
const showLoginPopup = ref(false);
const popupSearchInput = ref<HTMLInputElement | null>(null);
const { isDarkTheme, toggleTheme } = useTheme();
const emit = defineEmits(['login-success', 'logout']);
const isLoggedIn = ref(false);

onMounted(() => {
  const loggedInStatus = localStorage.getItem('isLoggedIn');
  isLoggedIn.value = loggedInStatus === 'true';
});

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
  showLoginPopup.value = true;
};

const closeLoginPopup = () => {
  showLoginPopup.value = false;
};

  
  const router = useRouter();
const logout = () => {
  localStorage.removeItem('isLoggedIn');
  isLoggedIn.value = false;
  emit('logout');
  router.push('/');
};

watch(() => localStorage.getItem('isLoggedIn'), (newValue) => {
  isLoggedIn.value = newValue === 'true';
  if (isLoggedIn.value) {
    emit('login-success');
  }
});

onMounted(() => {
  window.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'k') {
      e.preventDefault();
      openSearchPopup();
    }
  });
});

const handleLoginSuccess = () => {
  isLoggedIn.value = true;
  showLoginPopup.value = false;
};
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
  position: relative;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  overflow: visible;
  cursor: pointer;
  border: 2px solid green;
}

.user-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 100%;
}
.avatar-options {
  position: absolute;
  top: calc(100% + 10px);
  right: -10px;
  background-color: #928e8e; /* Changed to black */
  border-radius: 14px;
  padding: 8px 0;
  min-width: 200px;
  box-shadow: 0 4px 12px rgba(255, 0, 212, 0.15);
  z-index: 1000;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.2s, visibility 0.2s;
}
.user-avatar:hover .avatar-options {
  opacity: 1;
  visibility: visible;
}

.option {
    border-radius: 10px;
    padding: 8px 16px;
    color: #fff; /* Text color remains white */
    display: flex;
    align-items: center;
    transition: background-color 0.2s;
    margin: 12px; /* Added margin-left of 8px */
}

.option:hover {
  background-color: #3a3a3a;
}

.option i {
  margin-right: 8px;
  font-size: 18px;
}
.language-select {
  position: relative;
  display: inline-block;
}

.language-select select {
  background-color: transparent;
  border: none;
  padding: 0 20px 0 30px;
  margin: 0;
  width: 100%;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 14px;
  cursor: pointer;
  line-height: 1.5;
  color: inherit;
}

.language-select::before {
  content: '';
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  background-image: url('../assets/icon/lang.png');
  background-size: contain;
  background-repeat: no-repeat;
  
}
.language-select::after{
margin-right: 80px;
}

.dark-theme .language-select select {
  color: #79d9ff;
}
.icon-heart::before { content: '❤️'; }
.icon-star::before { content: '⭐'; }
.icon-history::before { content: '🕒'; }
.icon-replay::before { content: '🔁'; }
.icon-video::before { content: '🎥'; }
.icon-order::before { content: '📋'; }
  </style>