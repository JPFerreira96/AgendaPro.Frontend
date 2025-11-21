<template>
  <div>
    <div class="flex justify-content-between align-items-center mb-3">
      <div>
        <h3 class="m-0">Meus contatos</h3>
        <small class="text-500">Você está autenticado.</small>
      </div>

      <div class="flex gap-2">
        <Button
          label="Novo contato"
          icon="pi pi-plus"
          @click="openNew"
        />
      </div>
    </div>

    <DataTable
      :value="contacts"
      dataKey="id"
      class="w-full"
      responsive-layout="scroll"
      :loading="loading"
      emptyMessage="Nenhum contato cadastrado."
    >
      <Column field="name" header="Nome" />
      <Column field="email" header="E-mail" />
      <Column field="phone" header="Telefone" />
      <Column header="Ações" style="width: 140px">
        <template #body="slotProps">
          <div class="flex gap-2">
            <Button
              icon="pi pi-pencil"
              rounded
              text
              @click="editContact(slotProps.data)"
            />
            <Button
              icon="pi pi-trash"
              rounded
              text
              severity="danger"
              @click="deleteContactConfirm(slotProps.data)"
            />
          </div>
        </template>
      </Column>
    </DataTable>

    <Dialog
      v-model:visible="dialogVisible"
      :header="editingContact.id ? 'Editar contato' : 'Novo contato'"
      :modal="true"
      :style="{ width: '400px' }"
    >
      <form @submit.prevent="saveContact">
        <div class="field">
          <label for="name">Nome</label>
          <InputText
            id="name"
            v-model="editingContact.name"
            class="w-full"
            required
          />
        </div>

        <div class="field">
          <label for="email">E-mail</label>
          <InputText
            id="email"
            v-model="editingContact.email"
            type="email"
            class="w-full"
            required
          />
        </div>

        <div class="field">
          <label for="phone">Telefone</label>
          <InputText
            id="phone"
            v-model="editingContact.phone"
            class="w-full"
            required
          />
        </div>

        <div class="flex justify-content-end gap-2 mt-3">
          <Button
            type="button"
            label="Cancelar"
            class="p-button-text"
            @click="dialogVisible = false"
          />
          <Button
            type="submit"
            label="Salvar"
          />
        </div>
      </form>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import {
  getContacts,
  createContact,
  updateContact,
  deleteContact,
  type ContactDto,
} from '../api/contactsApi';

import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';

const emit = defineEmits<{
  (e: 'logout'): void;
}>();

const contacts = ref<ContactDto[]>([]);
const loading = ref(false);

const dialogVisible = ref(false);
const editingContact = ref<ContactDto>({
  name: '',
  email: '',
  phone: '',
});

async function loadContacts() {
  loading.value = true;
  try {
    contacts.value = await getContacts();
  } catch (err) {
    console.error('Erro ao carregar contatos', err);
  } finally {
    loading.value = false;
  }
}

function openNew() {
  editingContact.value = { name: '', email: '', phone: '' };
  dialogVisible.value = true;
}

function editContact(contact: ContactDto) {
  editingContact.value = { ...contact };
  dialogVisible.value = true;
}

async function saveContact() {
  try {
    if (editingContact.value.id) {
      await updateContact(editingContact.value);
    } else {
      await createContact(editingContact.value);
    }
    dialogVisible.value = false;
    await loadContacts();
  } catch (err) {
    console.error('Erro ao salvar contato', err);
  }
}

async function deleteContactConfirm(contact: ContactDto) {
  if (!contact.id) return;
  const ok = window.confirm(`Excluir contato "${contact.name}"?`);
  if (!ok) return;

  try {
    await deleteContact(contact.id);
    await loadContacts();
  } catch (err) {
    console.error('Erro ao excluir contato', err);
  }
}

onMounted(loadContacts);
</script>
