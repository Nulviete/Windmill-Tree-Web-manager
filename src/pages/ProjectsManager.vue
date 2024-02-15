<template>
  <q-page padding >
    <div class="row"><h5 style="padding: 0">Projects</h5>
    <q-btn round color="primary" icon="add" class="self-center q-mx-sm"  to="Projects/AddProject" />
    <p class="self-center" style="padding-left: 80px; padding-right: 20px">Filters:</p>
    <q-select v-model="yearSel" :options="years" label="Year" style="width: 180px" class="q-pa-md self-center" >
      <template v-if="yearSel" v-slot:append><q-icon name="cancel" @click.stop.prevent="yearSel =''" class="cursor-pointer" /></template>
    </q-select>
    <q-select v-model="categorySel" :options="categories" label="Category" style="width: 200px" class="q-pa-md self-center" >
      <template v-if="categorySel" v-slot:append><q-icon name="cancel" @click.stop.prevent="categorySel =''" class="cursor-pointer" /></template>
      </q-select></div>

<!-- <q-list class="q-pa-xl">
  <q-item-label header>ALL PROJECTS</q-item-label>
  <q-item v-for="doc in documents" :key="doc.id" clickable>
    <q-item-section>
{{ doc.name }}
    </q-item-section>
  </q-item>
</q-list> -->
<q-list class="q-px-xl">
  <q-item-label header>FILTERED PROJECTS</q-item-label>
  <q-item v-for="doc in filteredDocuments" :key="doc.id" clickable>
    <q-item-section>
{{ doc.name }}
    </q-item-section>
  </q-item>
</q-list >

  </q-page>
</template>

<script setup>
import { ref, watchEffect } from 'vue'
import { supabase } from 'src/config/supabaseClient'

const documents = ref(null)
const filteredDocuments = ref(null)
// const error = ref(null)
const dataLoaded = ref(false)
const years = ref([])
const categories = ref([])

const yearSel = ref('')
const categorySel = ref('')

const load = async () => {
  const { data } = await supabase.from('projects').select()

  documents.value = data
  dataLoaded.value = true

  for (let i = 0; i < documents.value.length; i++) {
    if (!years.value.includes(documents.value[i].year)) {
      years.value.push(documents.value[i].year)
    }
    if (!categories.value.includes(documents.value[i].category)) {
      categories.value.push(documents.value[i].category)
    }
  }

  years.value.sort(function (a, b) {
    return b - a
  })

  const selectByYear = (rok, kategorie) => {
    if (rok === '' && kategorie === '') return documents.value
    else if (rok === '' && kategorie !== '') {
      return documents.value.filter((doc) => doc.category === kategorie)
    } else if (rok !== '' && kategorie === '') {
      return documents.value.filter((doc) => doc.year === rok)
    } else return documents.value.filter((doc) => doc.year === rok && doc.category === kategorie)
  }

  watchEffect(() => {
    filteredDocuments.value = selectByYear(yearSel.value, categorySel.value)
  })
}

load()

// console.log(years.value)

</script>
