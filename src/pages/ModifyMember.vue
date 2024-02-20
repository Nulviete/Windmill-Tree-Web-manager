<template>
  <q-page padding>
    <q-input v-model="data[0].name"></q-input>
    <p>{{ data[0].country}}</p>

  </q-page>
</template>

<script setup>
import getMember from 'src/composables/getMember'

const props = defineProps({
  name: {
    type: String,
    default: ''
  }
})

const { loadMember, data, dataLoaded, error } = getMember()
const b = async () => await loadMember(props.name)
b()

console.log(data, error, dataLoaded)

</script>
