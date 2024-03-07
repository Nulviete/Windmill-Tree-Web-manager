/*eslint-disable */
import { supabase } from "src/config/supabaseClient";
import { ref } from "vue";

const useProject = () => {
  const data = ref(null);
  const dataLoaded = ref(false);
  const errorMess = ref(null);

  const loadProject = async (name) => {
    try {
      const { data: project } = await supabase
        .from("projects")
        .select("*")
        .eq("name", name);


      if (project) {
        data.value = project[0];
        dataLoaded.value = true;
      }
    } catch (err) {
      errorMess.value = err.message;
    }
  };

  const updateProject = async (name, category, year, projectDescription, photoUrl, countries, photos) => {
    const { data, error } = await supabase
    .from('projects')
    .update({
      name: name,
      category: category,
      year: year,
      projectDescription: projectDescription,
      photoUrl: photoUrl,
      countries: countries,
      photos: photos
    })
    .eq('name', name)
    .select()

    if (error) {
      console.log(error.message)
    errorMess.value = error.message
    }

  if (data) errorMess.value = null
  }

const deleteProject = async (id) => {
  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', id)

  if (error) errorMess.value = error.message
}

const addProject = async (project) => {
  const { data: prj, error } = await supabase
    .from('projects')
    .insert(project)
    .select()

    if (prj) {
      data.value = prj
    }
    if (error) errorMess = error.value
}

  return { loadProject, addProject, updateProject, deleteProject, data, dataLoaded, errorMess };
};
export default useProject;
