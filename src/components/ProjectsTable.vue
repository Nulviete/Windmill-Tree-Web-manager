<template>
  <div class="q-pa-md" v-if="props.dataLoaded">
    <q-table
      :rows="props.filteredDocuments"
      :columns="columns"
      row-key="name"
      :rows-per-page-options="[10, 20]"
      style="width: 600px"
    >
    <template #body="table">
      <q-tr :props="table" >
        <q-td key="name">
          {{ table.row.name }}
        </q-td>
         <q-td key="year">
          {{ table.row.year }}
        </q-td>
        <q-td key="category">
          {{ table.row.category }}
        </q-td>

         <q-td key="edit" >
          <q-icon name="mdi-pencil" size="sm" @click="handleClickEdit(table.row.name)" class="edit" />
        </q-td>
         <q-td key="delete" >
          <q-icon name="mdi-delete" size="sm" @click="
          whatToDelete = table.row.id;
          confirm = true;

          " class="edit" />
        </q-td>
      </q-tr>
    </template>
     </q-table>
    </div>

    <div v-else>
      <q-spinner>
        </q-spinner>
        </div>

    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-icon name="mdi-delete-alert" size="md" style="cursor: default"  />
          <span class="q-ml-sm">Are you sure you want to delete the project?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Delete" color="primary" @click="handleClickDelete(whatToDelete)" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

</template>

<script setup>
import useProject from 'src/composables/useProject'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
  filteredDocuments: Object,
  dataLoaded: Boolean
})

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
    align: 'left'

  },
  {
    name: 'delete',
    label: 'Delete',
    align: 'left'

  }
]

const handleClickEdit = (a) => {
  router.push({ path: '/Projects/' + a })
}

const confirm = ref(false)
const { errorMess, deleteProject } = useProject()

const handleClickDelete = async (id) => {
  await deleteProject(id)

  if (errorMess.value) alert(errorMess.value)
  else router.go()
}

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
