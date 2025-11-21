<template>
  <div class="dashboard">
    <!-- SIDEBAR -->
    <aside class="dash-sidebar">
      <div class="dash-logo">
        <div class="dash-logo-mark">AP</div>
        <div class="dash-logo-text">
          <span class="dash-logo-title">AgendaPro</span>
          <span class="dash-logo-subtitle">CRM simples</span>
        </div>
      </div>

      <nav class="dash-nav">
        <!-- MENU: CONTATOS -->
        <button
          class="dash-nav-item"
          :class="{ 'dash-nav-item--active': activeMenu === 'contacts' }"
          @click="changeSection('contacts')"
        >
          <i class="pi pi-address-book"></i>
          <span>Contatos</span>
        </button>

        <!-- MENU: LISTA DE USUÁRIOS -->
        <button
          class="dash-nav-item"
          :class="{ 'dash-nav-item--active': activeMenu === 'users' }"
          @click="changeSection('users')"
        >
          <i class="pi pi-users"></i>
          <span>Lista de usuários</span>
        </button>
      </nav>

      <div class="dash-sidebar-footer">
        <div class="dash-user">
          <i class="pi pi-user"></i>
          <span>{{ userName || 'Usuário logado' }}</span>
        </div>
      </div>
    </aside>

    <!-- MAIN -->
    <main class="dash-main">
      <header class="dash-header">
        <div>
          <h1>{{ headerTitle }}</h1>
          <p>{{ headerSubtitle }}</p>
        </div>

        <div class="flex align-items-center gap-2">
          <button type="button" class="theme-toggle" @click="$emit('toggle-theme')">
            <i class="pi pi-moon"></i>
            <span>Modo escuro</span>
          </button>

          <Button
            label="Sair"
            icon="pi pi-sign-out"
            severity="secondary"
            @click="$emit('logout')"
          />
        </div>
      </header>

      <section class="dash-content">
        <slot />
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import Button from 'primevue/button';

const props = defineProps<{
  activeMenu: 'contacts' | 'users';
  userName?: string | null;
}>();

const emit = defineEmits<{
  (e: 'logout'): void;
  (e: 'toggle-theme'): void;
  (e: 'change-section', value: 'contacts' | 'users'): void;
}>();

function changeSection(value: 'contacts' | 'users') {
  emit('change-section', value);
}

const headerTitle = computed(() =>
  props.activeMenu === 'contacts' ? 'Agenda de contatos' : 'Usuários cadastrados'
);

const headerSubtitle = computed(() =>
  props.activeMenu === 'contacts'
    ? 'Gerencie, edite e exclua seus contatos em um só lugar.'
    : 'Gerencie nome, e-mail e redefina senhas dos usuários.'
);

const userName = computed(() => props.userName);
</script>
