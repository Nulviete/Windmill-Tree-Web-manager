<template>
  <q-page padding>
    <div v-if="dataLoaded">
      <ModifyProjectTable :project="data" />
    </div>
    <div v-else>
      <q-spinner></q-spinner>
    </div>

  </q-page>
</template>

<script setup>
import getProject from 'src/composables/getProject'
import ModifyProjectTable from 'src/components/ModifyProjectTable.vue'

const props = defineProps({
  name: String
})

const { loadProject, data, dataLoaded, error } = getProject()
loadProject(props.name)

if (error) console.log(error)

</script>
