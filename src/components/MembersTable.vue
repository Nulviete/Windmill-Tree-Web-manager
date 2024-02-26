<template>
  <div class="q-pa-md">
    <q-table
      title="Members"
      :rows="rows"
      :columns="columns"
      row-key="name"
  style="width: 600px"
    >
    <template #body="props">
      <q-tr :props="props" >
        <q-td key="name">
          {{ props.row.name }}
        </q-td>
        <q-td key="position">
          {{ props.row.position }}
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
          <q-icon v-if="props.row.position==='Volunteer' || props.row.position==='Root Member'" name="mdi-pencil" size="sm" @click="handleClick(props.row.name)"  />
        </q-td>
      </q-tr>
    </template>
    </q-table>

  </div>

</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
  members: {
    type: Array,
    default: () => []
  }
})

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
    align: 'left',
    field: 'dateTill'
  }
]

const rows = props.members

const handleClick = (a) => {
  router.push({ path: '/Members/' + a })
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
