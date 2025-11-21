<template>
  <div class="app-shell">
    <section class="app-card">
      <aside class="app-card-left">
        <span class="app-badge">Desafio .NET + Vue</span>

        <h1 class="app-title">Agenda de Contatos</h1>
        <p class="app-subtitle">
          Gerencie seus contatos e mantenha sempre guardados.
        </p>

        <ul class="app-benefits">
          <li>✔ Login e registro</li>
          <li>✔ Cadastro, edição e exclusão de contatos</li>
          <li>✔ Layout responsivo para desktop e mobile</li>
        </ul>
      </aside>

      <section class="app-card-right">
        <slot />
      </section>
    </section>
  </div>
</template>

<script setup lang="ts">
import AppHeader from './AppHeader.vue';
</script>