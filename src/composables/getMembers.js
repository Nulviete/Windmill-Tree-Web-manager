/*eslint-disable */
import { supabase } from "src/config/supabaseClient";
import { ref } from "vue";

const getMembers = () => {
  const data = ref(null);
  const dataLoaded = ref(false);
  const error = ref(null);

  const loadMembers = async () => {
    try {
      const { data: members } = await supabase.from("members").select("*");

      if (error.value) console.log(error);
      if (members) {
        data.value = members;
        dataLoaded.value = true;
      }
    } catch (err) {
      error.value = err.message;
    }
  };
  return { loadMembers, data, dataLoaded, error };
};
export default getMembers;
