<template>

  <AuthShell v-if="!token">
    <LoginForm @logged-in="handleLoggedIn" />
  </AuthShell>

  <DashboardShell
    v-else
    :active-menu="activeMenu"
    :user-name="userName"
    @change-section="activeMenu = $event"
    @toggle-theme="toggleTheme"
    @logout="handleLogout"
  >
    <ContactsPanel v-if="activeMenu === 'contacts'" />
    <UsersPanel v-else />
  </DashboardShell>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

import AuthShell from '../components/layout/AppShell.vue';
import DashboardShell from '../components/layout/DashboardShell.vue';

import LoginForm from '../components/LoginForm.vue';
import ContactsPanel from '../components/ContactsPanel.vue';
import UsersPanel from '../components/UsersPanel.vue';

const token = ref<string | null>(localStorage.getItem('token'));
const userName = ref<string | null>(localStorage.getItem('userName'));  // << novo
const activeMenu = ref<'contacts' | 'users'>('contacts');

function handleLoggedIn(payload: { token: string; displayName: string }) {
  token.value = payload.token;
  userName.value = payload.displayName;

  localStorage.setItem('token', payload.token);
  localStorage.setItem('userName', payload.displayName);
}

function handleLogout() {
  token.value = null;
  userName.value = null;
  localStorage.removeItem('token');
  localStorage.removeItem('userName');
}

/* Tema light/dark */
const theme = ref<'light' | 'dark'>('light');

function applyTheme() {
  if (theme.value === 'light') {
    document.body.classList.add('light-theme');
  } else {
    document.body.classList.remove('light-theme');
  }
}

function toggleTheme() {
  theme.value = theme.value === 'light' ? 'dark' : 'light';
  applyTheme();
}

onMounted(() => {
  applyTheme();
});
</script>
