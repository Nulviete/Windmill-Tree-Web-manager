/*eslint-disable */
import { supabase } from "src/config/supabaseClient";
import { ref } from "vue";

const useMember = () => {
  const data = ref(null);
  const dataLoaded = ref(false);
  const errorMess = ref(null);

  const loadMember = async (id) => {
    try {
      const { data: member } = await supabase
        .from("members")
        .select("*")
        .eq("id", id);


      if (member) {
        data.value = member[0];
        dataLoaded.value = true;

      }
    } catch (err) {
      errorMess.value = err.message;
    }
  };

const updateMember = async (id, name, country, position, positionDescription, dateSince, dateTill) => {
  const { data: member, error } = await supabase
  .from('members')
  .update({
    name: name,
    country: country,
    position: position,
    positionDescription: positionDescription,
    dateSince: dateSince,
    dateTill: dateTill

  })
  .eq('id', id)
  .select()

if (error) {
  errorMess.value = error
}
if (member)
  data.value = member
}

const addMember = async (newMember) => {
  const { data: member, error } = await supabase
       .from('members')
       .insert(newMember)
       .select()

       if (member) {
          data.value = member
       }
       if (error) {
        errorMess.value = error
       }
}

const deleteMember = async (id) => {
  const { error } = await supabase
  .from('members')
  .delete()
  .eq('id', id)

  if (error) {
    errorMess.value = error
  }

}

  return { loadMember, addMember, updateMember, deleteMember, data, dataLoaded, errorMess };
};
export default useMember;
