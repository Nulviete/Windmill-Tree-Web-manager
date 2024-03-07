<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title class="row items-center">
          <q-avatar style="width: 50px">
            <img src="/favicon.png" style="">
          </q-avatar>
          <p class="q-ma-none"> Windmill Tree Web Manager</p>

        </q-toolbar-title>
      </q-toolbar>

<div class="row justify-between">
      <q-tabs align="left">
        <q-route-tab to="/Members" label="Members" />
        <q-route-tab to="/Projects" label="Projects" />
        <q-route-tab to="/Test" label="Test zone" />

      </q-tabs>

      <q-tabs align="right" v-if="user">
        <p class="q-pl-md q-pr-md" style="margin: 0">{{ user.user.email }}</p>
        <q-tab @click="handleLogout">Logout</q-tab>
      </q-tabs>
      </div>

    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script setup>
import { supabase } from 'src/config/supabaseClient'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const user = ref()

const login = async () => {
  const { data } = await supabase.auth.getUser()
  user.value = data
}

onMounted(async () => {
  login()
})

const { data } = supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'SIGNED_IN') {
    login()
    console.log(data)
  }
})

async function handleLogout () {
  await supabase.auth.signOut()
  user.value = null
  router.push({ name: 'Login' })
}

</script>
