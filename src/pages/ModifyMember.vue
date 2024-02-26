<template>
  <q-page padding>

    <div v-if="dataLoaded">
    <ModifyMemberTable :member="data" />
    </div>
    <div v-if="error">Chybicka</div>

  </q-page>
</template>

<script setup>
import ModifyMemberTable from 'src/components/ModifyMemberTable.vue'
import getMember from 'src/composables/getMember'

const props = defineProps({
  name: String
})

const { loadMember, data, dataLoaded, error } = getMember()
loadMember(props.name)

</script>
