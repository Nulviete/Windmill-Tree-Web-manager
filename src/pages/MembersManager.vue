<template>
  <q-page padding>
    <div class="row">
    <h5>Membas</h5>
     <q-btn round color="primary" icon="add" class="self-center q-mx-sm"  :to="{ name: 'AddMember'}" />
     </div>
    <div v-if="dataLoaded"> <MembersTable :members=data />
    </div>

    <div v-else> <q-spinner></q-spinner></div>
  </q-page>
</template>

<script setup>
import getMembers from 'src/composables/getMembers'
import MembersTable from 'src/components/MembersTable.vue'

const { loadMembers, data, dataLoaded, error } = getMembers()
loadMembers()

if (error.value !== null) {
  console.log(error, 'error message')
}

</script>
