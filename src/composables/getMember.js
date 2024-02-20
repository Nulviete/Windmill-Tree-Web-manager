/*eslint-disable */
import { supabase } from "src/config/supabaseClient";
import { ref } from "vue";

const getMember = () => {
  const data = ref(null);
  const dataLoaded = ref(false);
  const error = ref(null);

  const loadMember = async (name) => {
    try {
      const { data: member } = await supabase
        .from("members")
        .select("*")
        .eq("name", name);

      if (error.value) console.log(error);
      if (member) {
        data.value = member;
        dataLoaded.value = true;
      }
    } catch (err) {
      error.value = err.message;
    }
  };
  return { loadMember, data, dataLoaded, error };
};
export default getMember;
