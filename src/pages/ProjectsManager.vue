<template>
  <q-page padding >

    <div class="row">
      <h5 style="padding: 0">Projects</h5>
      <q-btn round color="primary" icon="add" class="self-center q-mx-sm"  to="Projects/AddProject" />
      <p class="self-center" style="padding-left: 80px; padding-right: 20px">Filters:</p>
      <q-select v-model="yearSel" :options="years" label="Year" style="width: 180px" class="q-pa-md self-center" >

      <template v-if="yearSel" v-slot:append><q-icon name="cancel" @click.stop.prevent="yearSel =''" class="cursor-pointer" /></template>
      </q-select>
      <q-select v-model="categorySel" :options="categories" label="Category" style="width: 200px" class="q-pa-md self-center" >
      <template v-if="categorySel" v-slot:append><q-icon name="cancel" @click.stop.prevent="categorySel =''" class="cursor-pointer" /></template>
      </q-select>
    </div>

    <ProjectsTable :filteredDocuments="filteredDocuments" :dataLoaded="dataLoaded" />

  </q-page>
</template>

<script setup>
import { onMounted, ref, watchEffect } from 'vue'

import getProjects from 'src/composables/getProjects'
import ProjectsTable from 'src/components/ProjectsTable.vue'

const { loadProjects, selectByYear, categories, years, dataLoaded } = getProjects()

onMounted(async () => {
  await loadProjects()
})

const filteredDocuments = ref(null)
// const error = ref(null)

const yearSel = ref('')
const categorySel = ref('')

watchEffect(() => {
  filteredDocuments.value = selectByYear(yearSel.value, categorySel.value)
})

</script>
