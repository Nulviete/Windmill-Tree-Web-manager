<template>
  <q-form class="q-mx-auto q-pa-md" style="width: 450px" @submit="handleSubmit"  >
    <q-input label="Login" v-model="username" type="email" required></q-input>
    <q-input label="Password" v-model="password" required type="password"></q-input>
    <div class="row justify-around q-gutter-sm">
      <q-btn label="Login" class="q-mt-md" type="submit"></q-btn>

    </div>

  </q-form>

</template>

<script setup>

import { supabase } from 'src/config/supabaseClient'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const username = ref('')
const password = ref('')

const router = useRouter()

async function handleSubmit () {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: username.value,
    password: password.value
  })
  if (data) router.push({ name: 'Index' })
  if (error) {
    username.value = ''
    password.value = ''
    alert(error)
  }
}

</script>

<style scoped>
.q-form {
  border: 1px solid black;
  border-radius: 10px;
}
</style>
