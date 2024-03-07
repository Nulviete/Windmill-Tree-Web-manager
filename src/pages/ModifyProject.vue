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
import useProject from 'src/composables/useProject'
import ModifyProjectTable from 'src/components/ModifyProjectTable.vue'

const props = defineProps({
  name: String
})

const { loadProject, data, dataLoaded, errorMess } = useProject()
loadProject(props.name)

if (errorMess.value) console.log(errorMess.value)

</script>
