/*eslint-disable */
import { supabase } from "src/config/supabaseClient";
import { ref } from "vue";

const getProject = () => {
  const data = ref(null);
  const dataLoaded = ref(false);
  const error = ref(null);

  const loadProject = async (name) => {
    try {
      const { data: project } = await supabase
        .from("projects")
        .select("*")
        .eq("name", name);

      if (error.value) console.log(error);
      if (project) {
        data.value = project[0];
        dataLoaded.value = true;
      }
    } catch (err) {
      error.value = err.message;
    }
  };
  return { loadProject, data, dataLoaded, error };
};
export default getProject;
