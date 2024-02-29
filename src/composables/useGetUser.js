import { supabase } from 'src/config/supabaseClient'
import { ref } from 'vue'

export default function useGetUser () {
  const user = ref(null)

  async function getUser () {
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      user.value = user
      console.log(user.value.id)
    }
  }
  getUser()
  return { user }
}
