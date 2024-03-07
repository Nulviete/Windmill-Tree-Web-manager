<template>
  <q-page padding>

<div v-if="dataLoaded">
 <ModifyMemberTable :member="data" />

</div>
<div v-else>
  <q-spinner></q-spinner>
</div>

  </q-page>
</template>

<script setup>
import ModifyMemberTable from 'src/components/ModifyMemberTable.vue'
import useMember from 'src/composables/useMember'

const props = defineProps({
  id: String
})

const { loadMember, data, dataLoaded, errorMess } = useMember()
loadMember(props.id)

if (errorMess.value) console.log(errorMess.value)

</script>
