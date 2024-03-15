<template>

<!-- Check if it is Head member -->
  <div v-if="props.member.position==='Head of the Foundation' || props.member.position==='Vice' ">Not elligible to modify head members of foundation</div>

  <div v-else>
    <q-form style="" class="q-mx-auto q-pa-md" @submit="handleSubmit" >
      <h5 class="text-center">Memba modifajar</h5>
      <q-input v-model="member.name" label="Name" required></q-input>
      <q-select v-model="member.country" :options="countryOpts" label="Country" required></q-select>
      <q-select v-model="member.position" :options="positionOpts" label="Position" required></q-select>
      <q-input v-model="member.positionDescription" label="Description of position"></q-input>

    <div class="row q-gutter-sm justify-center">
     <div class="leftBlock">
        <div class="row items-center">
          <q-checkbox v-model="valSOC" />
          <div class="h3-text">Start of cooperation</div>
        </div>
        <div class="row q-gutter-xs">
          <q-select filled v-model="monthS" :options="monthSel" label="Month" :disable="!valSOC" ></q-select>
          <q-select filled v-model="yearS" :options="yearSel" label="Year" :disable="!valSOC" ></q-select>
        </div>
      </div>

      <div class="rightBlock">
        <div class="row items-center">
          <q-checkbox v-model="valEOC" @click="curWorking = !valEOC"  />
          <div class="h3-text">End of cooperation</div>
             <q-checkbox v-model="curWorking" @click="valEOC = !curWorking"   />
          <div class="h3-text">Currently working</div>
        </div>
        <div class="row q-gutter-xs">
          <q-select filled v-model="monthE" :options="monthSel" label="Month" class="" :disable="!valEOC"></q-select>
          <q-select filled v-model="yearE" :options="yearSel" label="Year" class="" :disable="!valEOC"></q-select>
        </div>
      </div>

    </div>
      <div class="row justify-center">
        <q-btn label="Update Membo" class="q-mt-md bg-green-3" type="submit"></q-btn>
      </div>

    </q-form>

  </div>

</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import useMember from 'src/composables/useMember'

const props = defineProps({
  member: {
    type: Object,
    default: null
  }
})

console.log(props)

const $q = useQuasar()
const router = useRouter()

const member = ref({
  name: props.member.name,
  country: props.member.country,
  position: props.member.position,
  positionDescription: props.member.positionDescription,
  dateSince: props.member.dateSince,
  dateTill: props.member.dateTill
})

const monthS = ref('')
const yearS = ref('')

if (member.value.dateSince) {
  monthS.value = props.member.dateSince.substr(0, 3)
  yearS.value = props.member.dateSince.substr(4, 7)
}

const curWorking = ref(props.member.dateTill === 'now')

const monthE = ref('')
const yearE = ref('')

const valSOC = ref(false)
const valEOC = ref(false)

if (props.member.dateTill !== 'now') {
  valEOC.value = true
  monthE.value = props.member.dateTill.substr(0, 3)
  yearE.value = props.member.dateTill.substr(4, 7)
}

const countryOpts = ref([
  { label: 'Poland', value: 'pl' },
  { label: 'Ukraine', value: 'ua' },
  { label: 'Czech republic', value: 'cz' },
  { label: 'Spain', value: 'sp' },
  { label: 'Italy', value: 'it' },
  { label: 'Morocco', value: 'mo' }
])
const positionOpts = ref([
  { label: 'Root Member', value: 'Root Member' },
  { label: 'Volunteer', value: 'Volunteer' }
])

const datum = new Date()
const curYear = datum.getFullYear()

const monthSel = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Sep', 'Oct', 'Nov', 'Dec']
const yearSel = ref([])

for (let i = curYear - 5; i < curYear + 5; i++) {
  yearSel.value.push(i)
}

const { updateMember, errorMess } = useMember()

// supabase
async function handleSubmit () {
  // country set
  member.value.country = member.value.country.value

  // date of start set
  if (valSOC.value) {
    member.value.dateSince = monthS.value + ' of ' + (yearS.value)
  }

  // date of end set
  if (valEOC.value) {
    member.value.dateTill = monthE.value + ' of ' + (yearE.value)
  }
  if (curWorking.value) member.value.dateTill = 'now'

  //  push the data

  updateMember(props.member.id, member.value.name, member.value.country, member.value.position.value, member.value.positionDescription, member.value.dateSince, member.value.dateTill)

  if (errorMess.value) alert(errorMess.value)
  else {
    // notify pop up message
    $q.notify('Member has been successfully modified')

    // redirect to Member page
    setTimeout(() => router.push({ path: '/Members' }), 1500)
  }
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
