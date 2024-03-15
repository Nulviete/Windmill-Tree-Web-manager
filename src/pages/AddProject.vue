<template>
  <q-page padding >

    <!-- Header -->

    <h2 class="q-mx-auto text-center">Add new projecto :-)</h2>

    <!-- Form -->

    <div style="width: 700px" class="q-mx-auto">
      <q-form action="" @submit.prevent="handleSubmit" >
      <q-input filled v-model="objekt.name" label="Project name"  class="q-my-sm" required />
      <q-select filled v-model="objekt.category" :options="categoryOpts" label="Category" class="q-pb-sm"  />
      <q-input filled v-model="objekt.year" label="Year"   required />
      <q-input filled v-model="objekt.countries" label="Participants countries"  class="q-my-sm q-mb-xl"></q-input>

    <!-- Main photo -->

    <div class="q-pt-sm text-h4">Main photo</div>

    <div class="row q-col-gutter-lg q-py-xs">
      <q-input v-model="objekt.photoUrl" label="Main photo" class="col-9"></q-input>
        <div class="row justify-center col-3">
          <img :src="objekt.photoUrl" alt="" class="obrazek" v-if="objekt.photoUrl"  />
          <p v-else>(Image)</p>
        </div>
    </div>

    <!-- Gallery slide show -->

    <div class="q-pt-sm text-h4">Gallery slide show</div>

    <div>
      <q-input type="textarea" label="Here copy direct links from Imgur.com" v-model="links"
      ></q-input>
    </div>

    <!-- Buttons -->

    <div class="row justify-start ">
      <q-btn label="Add Photo" @click="objekt.photos.length++" class="q-mt-md bg-blue-2 text-black"></q-btn>
    </div>

    <div class="row justify-center ">
      <q-btn class="glossy q-mt-md" color="teal" label="Add Project" type="submit" />
    </div>

    </q-form>
    </div>

  </q-page>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { computed, ref } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const router = useRouter()

const links = ref('')

const formatedLinks = computed(() => {
  return links.value.split(/\r?\n|\r|\n/g)
})

const categoryOpts = ref([
  'international',
  'forUkraine',
  'LOCAL'
])

const objekt = ref({
  name: '',
  category: null,
  year: null,
  photos: formatedLinks,
  photoUrl: null,
  countries: ''
})

objekt.value.photos.length = 15

/* supabase insert */

import useProject from 'src/composables/useProject'

const { addProject, data, errorMess } = useProject()

async function handleSubmit () {
  await addProject(objekt.value)

  if (data.value) {
    $q.notify('Project has been successfully added')
    setTimeout(() => router.push({ path: '/Projects' }), 1500)
  }
  if (errorMess.value) alert(errorMess.value)
}

/* testing in console */

// function handleSubmit () {
//   if (objekt.value.category === null) return alert('category must be selected')
//   else { console.log(objekt) }
// }
</script>

<style scoped>
img {
  max-height: 100px;
  width: auto;
  max-width: 100%;
  padding: auto;
  margin: auto;
}
</style>
