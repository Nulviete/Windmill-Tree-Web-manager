<template>
  <div class="q-pa-md">
    <q-table
      title="Members"
      :rows="rows"
      :columns="columns"
      row-key="name"
      :rows-per-page-options="[10, 20]"
      wrap-cells
  style="width: 800px"
    >
    <template #body="props">
      <q-tr :props="props" >
        <q-td key="name">
          {{ props.row.name }}
        </q-td>
        <q-td key="position" auto-width>
          {{ props.row.position }}
        </q-td>
        <q-td key="positionDescription">
          {{ props.row.positionDescription }}
        </q-td>
        <q-td key="country">
          {{ props.row.country }}
        </q-td>

        <q-td key="dateOfJoin">
          {{ props.row.dateSince }}
        </q-td>
        <q-td key="dateOfEnd">
          {{ props.row.dateTill }}
        </q-td>
        <q-td key="edit" >
          <q-icon v-if="props.row.position==='Volunteer' || props.row.position==='Root Member'" name="mdi-pencil" size="sm" @click="

          handleClick(props.row.id);
          "  />
        </q-td>
        <q-td key="delete" >
          <q-icon v-if="props.row.position==='Volunteer' || props.row.position==='Root Member'" name="mdi-delete" size="sm" @click="
          whatToDelete = props.row.id;
          confirm = true;
          "  />
        </q-td>
      </q-tr>
    </template>
    </q-table>

  </div>

  <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-icon name="mdi-delete-alert" size="md" style="cursor: default"  />
          <span class="q-ml-sm">Are you sure you want to delete member?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Delete" color="primary" @click="handleClickDelete(whatToDelete)" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

</template>

<script setup>
import useMember from 'src/composables/useMember'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
  members: {
    type: Array,
    default: () => []
  }
})

const { errorMess, deleteMember } = useMember()

const handleClickDelete = async (id) => {
  await deleteMember(id)

  if (errorMess.value) alert(errorMess.value)
  else router.go()
}

const confirm = ref(false)

const columns = [
  {
    name: 'name',
    required: true,
    label: 'Name',
    align: 'left',
    field: row => row.name

  },
  {
    name: 'position',
    label: 'Position',
    align: 'left',
    field: 'position',
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'positionDescription',
    label: 'Description',
    align: 'left',
    field: 'positionDescription',
    format: val => `${val}`,
    sortable: true

  },
  {
    name: 'country',
    label: 'Country',
    align: 'left',
    field: 'country'

  },
  {
    name: 'dateOfJoin',
    label: 'Start',
    align: 'left',
    field: 'dateSince'
  },
  {
    name: 'dateOfEnd',
    label: 'End',
    align: 'left',
    field: 'dateTill'
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

const rows = props.members

const handleClick = (id) => {
  router.push({ path: '/Members/' + id })
}

</script>

<style scoped>
.q-icon {
border: 1px solid;
border-radius: 2px;
background: rgb(255, 243, 243);
}
.q-icon:hover {
cursor: pointer;
}
</style>
