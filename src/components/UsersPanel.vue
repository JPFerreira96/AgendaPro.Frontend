<template>
  <div class="mt-4">
    <div class="flex justify-content-between align-items-center mb-2">
      <div>
        <h3 class="m-0">Usuários cadastrados</h3>
        <small class="text-500">
          Gerencie nome, e-mail e redefina senhas dos usuários.
        </small>
      </div>
    </div>

    <DataTable
      :value="users"
      dataKey="id"
      class="w-full"
      responsive-layout="scroll"
      :loading="loading"
      emptyMessage="Nenhum usuário cadastrado."
    >
      <Column field="name" header="Nome" />
      <Column field="email" header="E-mail" />
      <Column header="Ações" style="width: 120px">
        <template #body="slotProps">
          <Button
            icon="pi pi-pencil"
            rounded
            text
            @click="editUser(slotProps.data)"
          />
        </template>
      </Column>
    </DataTable>

    <Dialog
      v-model:visible="dialogVisible"
      header="Editar usuário"
      :modal="true"
      :style="{ width: '420px' }"
    >
      <form @submit.prevent="saveUser">
        <div class="field">
          <label for="u-name">Nome</label>
          <InputText
            id="u-name"
            v-model="editingUser.name"
            class="w-full"
            required
          />
        </div>

        <div class="field">
          <label for="u-email">E-mail</label>
          <InputText
            id="u-email"
            v-model="editingUser.email"
            type="email"
            class="w-full"
            required
          />
        </div>

        <div class="field">
          <label for="u-password">
            Senha (opcional – preencha para redefinir)
          </label>
          <Password
            id="u-password"
            v-model="password"
            class="w-full"
            toggleMask
            :feedback="false"
            input-class="w-full"
          />
        </div>

        <div class="flex justify-content-end gap-2 mt-3">
          <Button
            type="button"
            label="Cancelar"
            class="p-button-text"
            @click="dialogVisible = false"
          />
          <Button type="submit" label="Salvar" />
        </div>
      </form>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getUsers, updateUser, type UserDto } from '../api/usersApi';

import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';

const users = ref<UserDto[]>([]);
const loading = ref(false);

const dialogVisible = ref(false);
const editingUser = ref<UserDto>({ id: 0, name: '', email: '' });
const password = ref('');

async function loadUsers() {
  loading.value = true;
  try {
    users.value = await getUsers();
  } catch (err) {
    console.error('Erro ao carregar usuários', err);
  } finally {
    loading.value = false;
  }
}

function editUser(user: UserDto) {
  editingUser.value = { ...user };
  password.value = '';
  dialogVisible.value = true;
}

async function saveUser() {
  try {
    await updateUser({
      id: editingUser.value.id,
      name: editingUser.value.name,
      email: editingUser.value.email,
      password: password.value || undefined,
    });
    dialogVisible.value = false;
    await loadUsers();
  } catch (err) {
    console.error('Erro ao salvar usuário', err);
  }
}

onMounted(loadUsers);
</script>
