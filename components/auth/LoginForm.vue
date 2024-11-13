<template>
  <div>
    <v-row class="mb-3">
      <v-col cols="12">
        <v-label class="font-weight-medium mb-1">Email</v-label>
        <v-text-field v-model="email" variant="outlined" class="pwdInput" hide-details color="primary"></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-label class="font-weight-medium mb-1">Пароль</v-label>
        <v-text-field v-model="password" variant="outlined" class="border-borderColor" type="password" hide-details
                      color="primary"></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-btn :loading="loading" :disabled="loading" @click.prevent="send" size="large" rounded="pill" color="primary"
               class="rounded-pill" block
               type="submit" flat>Войти
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>
<script setup lang="ts">
const email = ref('asone7776@gmail.com');
const password = ref('12345678910');
const {signIn, loading} = useAuth();
const send = async () => {
  await signIn({
    email: email.value,
    password: password.value,
  })
}
</script>
