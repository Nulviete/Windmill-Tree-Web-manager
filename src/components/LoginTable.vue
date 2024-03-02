<template>
  <q-form class="q-mx-auto q-pa-md" style="width: 450px" @submit="handleSubmit">
    <q-input label="Login" v-model="login" type="email" required></q-input>
    <q-input label="Password" v-model="pass" required type="password"></q-input>
    <div class="row justify-around q-gutter-sm">
      <q-btn label="Login" class="q-mt-md" type="submit"></q-btn>

    </div>

  </q-form>

</template>

<script setup>
import { supabase } from 'src/config/supabaseClient'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const login = ref('')
const pass = ref('')
const user = ref(null)

const router = useRouter()

async function handleSubmit () {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: login.value,
    password: pass.value
  })

  if (data) {
    login.value = ''
    pass.value = ''
    user.value = data
    router.push({ name: 'Index' })
  }
  if (error) {
    console.log(error)
    login.value = ''
    pass.value = ''
  }
}

</script>

<style scoped>
.q-form {
  border: 1px solid black;
  border-radius: 10px;
}
</style>
