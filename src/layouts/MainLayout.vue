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

<div class="row justify-between">
      <q-tabs align="left">
        <q-route-tab to="/Members" label="Members" />
        <q-route-tab to="/Projects" label="Projects" />

      </q-tabs>
      <q-tabs align="right">
<p v-if="curUser" class="q-pl-md q-pr-md" style="margin: 0px">  {{ curUser.email }}</p>
        <q-route-tab v-if="curUser"  @click="Logout" class="row flex" >
          <q-icon name="mdi-logout"></q-icon> Logout
        </q-route-tab>
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

const curUser = ref([])
const router = useRouter()

onMounted(() => {
  useGetUser()
})

const useGetUser = async () => {
  const { data: { user } } = await supabase.auth.getUser()
  curUser.value = user
}

const { data } = supabase.auth.onAuthStateChange((event, session) => {
  console.log(event, session)

  if (event === 'INITIAL_SESSION') {
    // handle initial session
  } else if (event === 'SIGNED_IN') {
    useGetUser()
  } else if (event === 'SIGNED_OUT') {
    console.log(data)
    curUser.value = null
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
  router.push({ name: 'Login' })
  if (!error) console.log('Logout success')
}

</script>
