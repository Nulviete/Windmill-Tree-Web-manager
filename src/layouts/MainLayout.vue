<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
          Windmill Tree Web Manager
        </q-toolbar-title>
      </q-toolbar>

      <q-tabs align="left">
        <q-route-tab to="/Members" label="Members" />
        <q-route-tab to="/Projects" label="Projects" />
        <q-route-tab label="Logout" @click="Logout" />

      </q-tabs>
      <p v-if="curUser"> {{ curUser.email }}</p>

    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script setup>
import { supabase } from 'src/config/supabaseClient'
import { onMounted, ref } from 'vue'

const curUser = ref([])

onMounted(() => {
  logIN()
})

const logIN = async () => {
  const { data: { user } } = await supabase.auth.getUser()
  curUser.value = user
}

const { data } = supabase.auth.onAuthStateChange((event, session) => {
  console.log(event, session)

  if (event === 'INITIAL_SESSION') {
    // handle initial session
  } else if (event === 'SIGNED_IN') {
    logIN()
  } else if (event === 'SIGNED_OUT') {
    console.log(data)
    curUser.value = []
  } else if (event === 'PASSWORD_RECOVERY') {
    // handle password recovery event
  } else if (event === 'TOKEN_REFRESHED') {
    // handle token refreshed event
  } else if (event === 'USER_UPDATED') {
    // handle user updated event
  }
})

async function Logout () {
  console.log('logout')
  const { error } = await supabase.auth.signOut()
  if (!error) console.log('Logout success')
}

</script>
