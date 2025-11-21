<template>
  <div>
    <p class="mb-3 text-center">
      <strong>Autenticação</strong>
    </p>

    <div class="flex justify-content-center mb-3 gap-2">
      <Button
        label="Login"
        :severity="mode === 'login' ? 'primary' : 'secondary'"
        @click="mode = 'login'"
      />
      <Button
        label="Registrar"
        :severity="mode === 'register' ? 'primary' : 'secondary'"
        @click="mode = 'register'"
      />
    </div>

    <form @submit.prevent="submit">
      <div class="field" v-if="mode === 'register'">
        <label for="name">Nome</label>
        <InputText id="name" v-model="name" class="w-full" autocomplete="name" required />
      </div>

      <div class="field">
        <label for="email">E-mail</label>
        <InputText
          id="email"
          v-model="email"
          type="email"
          class="w-full"
          autocomplete="email"
          required
        />
      </div>

      <div class="field">
        <label for="password">Senha</label>
        <Password
          id="password"
          v-model="password"
          class="w-full"
          toggleMask
          :feedback="false"
          input-class="w-full"
          autocomplete="current-password"
          required
        />
      </div>

      <Button
        type="submit"
        class="w-full mt-3"
        :label="mode === 'login' ? 'Entrar' : 'Criar conta'"
      />

      <small v-if="error" class="p-error block mt-2">{{ error }}</small>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { login, register } from "../api/authApi";

import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Password from "primevue/password";

const emit = defineEmits<{
  (e: "logged-in", payload: { token: string; displayName: string }): void;
}>();

const mode = ref<"login" | "register">("login");
const name = ref("");
const email = ref("");
const password = ref("");
const error = ref("");

async function submit() {
  error.value = "";

  try {
    if (mode.value === "register") {
      const { token } = await register({
        name: name.value,
        email: email.value,
        password: password.value,
      });

      const displayName = name.value || email.value;

      emit("logged-in", {
        token,
        displayName,
      });
    } else {
      const { token } = await login({
        email: email.value,
        password: password.value,
      });

      const displayName = email.value;

      emit("logged-in", {
        token,
        displayName,
      });
    }
  } catch (err) {
    console.error(err);
    error.value = "Falha na autenticação. Verifique os dados.";
  }
}
</script>
