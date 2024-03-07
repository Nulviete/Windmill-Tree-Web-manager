import { supabase } from 'src/config/supabaseClient'
import { ref } from 'vue'

const getProjects = () => {
  const documents = ref(null)
  const dataLoaded = ref(false)
  const errorMess = ref(null)
  const years = ref([])
  const categories = ref([])

  const loadProjects = async () => {
    try {
      const { data: projects } = await supabase.from('projects').select()

      if (projects) {
        documents.value = projects
        dataLoaded.value = true
        for (let i = 0; i < documents.value.length; i++) {
          if (!years.value.includes(documents.value[i].year)) {
            years.value.push(documents.value[i].year)
          }
          if (!categories.value.includes(documents.value[i].category)) {
            categories.value.push(documents.value[i].category)
          }
        }

        years.value.sort(function (a, b) {
          return b - a
        })
      }
    } catch (err) {
      errorMess.value = err.message
    }
  }
  const selectByYear = (rok, kategorie) => {
    if (rok === '' && kategorie === '') return documents.value
    else if (rok === '' && kategorie !== '') {
      return documents.value.filter((doc) => doc.category === kategorie)
    } else if (rok !== '' && kategorie === '') {
      return documents.value.filter((doc) => doc.year === rok)
    } else return documents.value.filter((doc) => doc.year === rok && doc.category === kategorie)
  }
  return { loadProjects, selectByYear, documents, categories, years, dataLoaded, errorMess }
}
export default getProjects
