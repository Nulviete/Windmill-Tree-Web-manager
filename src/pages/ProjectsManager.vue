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
 <div class="q-pa-md" v-if="filteredDocuments">
    <q-table

      :rows="rows"
      :columns="columns"
      row-key="name"
      :rows-per-page-options="[10, 20]"
  style="width: 600px"
    >
    <template #body="filteredDocuments">
      <q-tr :props="filteredDocuments" >
        <q-td key="name">
          {{ filteredDocuments.row.name }}
        </q-td>
         <q-td key="year">
          {{ filteredDocuments.row.year }}
        </q-td>
        <q-td key="category">
          {{ filteredDocuments.row.category }}
        </q-td>

         <q-td key="edit" >
          <q-icon name="mdi-pencil" size="sm" @click="handleClick(filteredDocuments.row.name)" class="edit" />
        </q-td>
      </q-tr>
    </template>
     </q-table>
    </div>

  </q-page>
</template>

<script setup>
import { ref, watchEffect } from 'vue'
import { supabase } from 'src/config/supabaseClient'
import { useRouter } from 'vue-router'

const router = useRouter()
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
console.log(filteredDocuments)

const columns = [
  {
    name: 'name',
    required: true,
    label: 'Name of Project',
    align: 'left',
    field: row => row.name,
    sortable: true

  },
  {
    name: 'year',
    label: 'Year',
    align: 'left',
    field: 'year',
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'category',
    label: 'Category',
    align: 'left',
    field: 'category',
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'edit',
    label: 'Edit',
    align: 'left',
    field: 'dateTill'
  }
]

const rows = filteredDocuments

const handleClick = (a) => {
  router.push({ path: '/Projects/' + a })
}

// console.log(years.value)

</script>

<style scoped>
.q-icon.edit {
border: 1px solid;
border-radius: 2px;
background: rgb(255, 243, 243);
}
.q-icon:hover {
cursor: pointer;
}
</style>
