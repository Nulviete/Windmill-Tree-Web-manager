<template>

  <q-form style="width: 600px" class="q-pa-md q-mx-auto" >
    <q-input label="Project name" v-model="project.name"></q-input>
    <q-select label="Category" v-model="project.category"></q-select>
    <q-select label="Year" v-model="project.year"></q-select>
    <q-input label="Description of project" v-model="project.projectDescription" type="textarea"></q-input>
    <div class="row q-py-xs">
      <q-input label="Main photo URL" v-model="project.photoUrl" class="col-10 q-pr-sm" filled>
        <template v-if="project.photoUrl" v-slot:append>
          <q-icon name="cancel" @click.stop.prevent="project.photoUrl = ''" class="cursor-pointer" />
        </template>
      </q-input>
      <q-img :src="project.photoUrl" :ratio="16/9" width="80px" class="q-ml-sm" loading="lazy" @load="console.log('loading')" @error="console.log('cannot load')" ></q-img>
    </div>

    <q-input label="Participants' countries" v-model="project.countries"></q-input>
    <div class="h5-text q-pt-md">Photos:</div>
    <div v-for="(photo, index) in project.photos" :key="index" class="row q-py-xs">
      <q-input :label="'Photo '+(index+1)" v-model="project.photos[index]" class="col-10 q-pr-sm" filled>
        <template v-if="project.photos[index]" v-slot:append>
          <q-icon name="cancel" @click.stop.prevent="project.photos[index] = ''" class="cursor-pointer" />
        </template>
      </q-input>
      <q-img :src="photo" :ratio="16/9" width="80px" class="q-ml-sm" loading="lazy" @load="console.log('loading')" @error="console.log(error)" ></q-img>
    </div>
    <div class="row justify-start ">
      <q-btn label="Add Photo" @click="project.photos.length++" class="q-mt-md bg-blue-2 text-black"></q-btn>
    </div>
    <div class="row justify-center ">
      <q-btn label="Confirm Changes" @click="handleSubmit" class="q-mt-md bg-green-2 text-black"></q-btn>
    </div>

  </q-form>
</template>

<script setup>

import { supabase } from 'src/config/supabaseClient'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

const props = defineProps({
  project: Object
})

const router = useRouter()
const $q = useQuasar()

const project = ref({
  name: props.project.name,
  category: props.project.category,
  year: props.project.year,
  projectDescription: props.project.projectDescription,
  photoUrl: props.project.photoUrl,
  countries: props.project.countries,
  photos: props.project.photos
})

if (!project.value.photos) project.value.photos = []

const photosDupl = computed(() => {
  return project.value.photos.filter((value, index) => project.value.photos.indexOf(value) === index)
})

// const handleSubmit = () => {
//   project.value.photos = project.value.photos.filter((pic) => pic.length > 0)
//   project.value.photos = photosDupl.value
//   console.log(project.value)
// }

// supabase
async function handleSubmit () {
  project.value.photos = project.value.photos.filter((pic) => pic.length > 0)
  project.value.photos = photosDupl.value

  //  push the data

  const { data, error } = await supabase
    .from('projects')
    .update({
      name: project.value.name,
      category: project.value.category,
      year: project.value.year,
      projectDescription: project.value.projectDescription,
      photoUrl: project.value.photoUrl,
      countries: project.value.countries,
      photos: project.value.photos

    })
    .eq('name', props.project.name)
    .select()

  if (error) console.log(error)
  if (data) console.log(data)

  // notify pop up message
  $q.notify('Project has been successfully modified')

  // redirect to Member page
  setTimeout(() => router.push({ path: '/Projects' }), 1500)
}

</script>

<style scoped>
.q-form {
width: 700px;
border: 0.1rem solid black;
box-shadow: 2px 2px #8a8989;
border-radius: 10px;
}
h5 {
  margin: 0;
}
.q-field {
  min-width: 150px;
}
</style>
