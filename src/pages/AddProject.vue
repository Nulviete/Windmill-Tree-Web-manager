<template>
  <q-page padding >
    <h2 class="q-mx-auto text-center">Add new projecto :-)</h2>
    <div style="width: 700px" class="q-mx-auto">
      <q-form action="" @submit.prevent="handleSubmit" >
      <q-input filled v-model="objekt.name" label="Project name" :dense="dense" class="q-my-sm" required />
    <q-select filled v-model="objekt.category" :options="categoryOpts" label="Category"  />
    <q-input filled v-model="objekt.year" label="Year" :dense="dense" class="q-my-sm q-mb-xl" required />
    <div class="q-pt-sm text-h4">Gallery Slide show</div>

    <div v-for="(item, idx) in 15" :key="idx" class="row q-col-gutter-lg q-py-xs">
      <q-input v-model="objekt.photos[idx]" :label="'Photo '+(idx+1)" class="col-9"></q-input>
      <div class="row justify-center col-3">
        <img :src="objekt.photos[idx]" alt="" class="obrazek" v-if="objekt.photos[idx]"  />
        <p v-else>(Image)</p>
        </div>

    </div>

    <q-btn class="glossy q-mt-md" color="teal" label="Add Project" type="submit" />
    </q-form>
    </div>

  </q-page>
</template>

<script setup>

import { ref, watchEffect } from 'vue'

const dense = ref(false)

const categoryOpts = ref([
  'international',
  'forUkraine'
])

const objekt = ref({
  name: '',
  category: null,
  year: null,
  photos: []
})

watchEffect(() => {
  console.log(objekt.value.photos)
  console.log(objekt.value.photos[0])
})

/* supabase insert */

import { supabase } from 'src/config/supabaseClient'
async function handleSubmit () {
  const { data, error } = await supabase
    .from('projects')
    .insert(objekt.value)
    .select()

  console.log(data, error)
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
