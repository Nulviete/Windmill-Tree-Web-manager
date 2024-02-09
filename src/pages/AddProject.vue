<template>
  <q-page padding >
    <h2 class="q-mx-auto text-center">Add new projecto :-)</h2>
    <div style="width: 500px" class="q-mx-auto">
      <q-form action="" @submit.prevent="handleSubmit" >
      <q-input filled v-model="projectName" label="Project name" :dense="dense" class="q-my-sm" required />
    <q-select filled v-model="category" :options="categoryOpts" label="Category" required />
    <q-input filled v-model="year" label="Year" :dense="dense" class="q-my-sm" required />
    <q-btn class="glossy" color="teal" label="Add Project" type="submit" />
    </q-form>
    </div>

  </q-page>
</template>

<script setup>
import { ref } from 'vue'

const dense = ref(false)
const projectName = ref('')
const category = ref(null)
const year = ref(null)
const categoryOpts = ref([
  'international',
  'forUkraine'
])

function handleSubmit () {
  console.log('you clickt submit', category)
}
</script>
