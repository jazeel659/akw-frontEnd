<template>
  <div class="card admin_container">
    <NuxtLink to="/dashboard">add Images</NuxtLink>
    
    <ProgressSpinner class="overlay_spin" v-if="rolePending" />
    <Accordion value="0" expandIcon="pi pi-plus" collapseIcon="pi pi-minus">
      <AccordionPanel
        v-for="(item, index) in usersList"
        :value="index.toString()"
      >
        <AccordionHeader>
          <div class="heade_list">
            <div>
              {{ item?.name }}
            </div>
            <div>
              <p>
                {{ item?.email }}
              </p>
              <Chip :label="` ${item?.is_admin ?'Admin' : 'User'} `" />
              <p>{{}}</p>
            </div>
          </div>
        </AccordionHeader>
        <AccordionContent>
          <div class="content_wrapper">
            <div>
                <label for="img_access">Image List aceess</label>

                <div class="card flex justify-center">
                  <SelectButton @change="(e)=>{roleChange(e,index,'img_access',sortedUsers[index]._id)}"
                    v-model="sortedUsers[index].img_access"
                    :options="img_access"
                    id="img_access"
                    optionLabel="name"
                    aria-labelledby="multiple"
                  />
                </div>
              </div>
            <div>
              <label for="image_edit">Image Edit aceess</label>

              <div class="card flex justify-center">
                <SelectButton @change="(e)=>{roleChange(e,index,'img_edit',sortedUsers[index]._id)}"
                  v-model="sortedUsers[index].img_edit"
                  :options="image_edit"
                  id="image_edit"
                  optionLabel="name"
                  aria-labelledby="multiple"
                />
              </div>
            </div>
            
              
              <div>
              <label for="image_delete">Image Delete aceess</label>

              <div class="card flex justify-center">
                <SelectButton @change="(e)=>{roleChange(e,index,'img_delete',sortedUsers[index]._id)}"
                  v-model="sortedUsers[index].img_delete"
                  :options="image_edit"
                  id="image_edit"
                  optionLabel="name"
                  aria-labelledby="multiple"
                />
              </div>
            </div>
            </div>
          
        </AccordionContent>
      </AccordionPanel>
    </Accordion>
  </div>
</template>

<script setup>
import { useToast } from "primevue/usetoast";
const toast = useToast();


const usersList = ref([]);
const temp = ref("");
watch(temp, (newValue, oldValue) => {
  console.log(`Count changed from ${oldValue} to ${newValue.value}`);
});

const getUsers = async () => {
  const response = await fetchWithAuth("http://localhost:7000/api/v1/user")
  
  usersList.value = response?.data ?? [];
};
getUsers();
const sortedUsers = computed(() => {
  return usersList?.value?.map((user) => {
    return {
        _id: user._id,
      
      name: user.name,
      email: user.email,
      is_admin: user.is_admin,
      img_access:
        user.img_access == "full"
          ? { name: "Full", value: "full" }
          : user.img_access == "self"
          ? { name: "Self", value: "self" }
          : { name: "No Access", value: null },

      img_edit:
        user.img_edit == "full"
          ? { name: "Full", value: "full" }
          : user.img_edit == "self"
          ? { name: "Self", value: "self" }
          : { name: "No Access", value: null },

      img_delete:
        user.img_delete == "full"
          ? { name: "Full", value: "full" }
          : user.img_delete == "self"
          ? { name: "Self", value: "self" }
          : { name: "No Access", value: null },
    };
  });
});
const rolePending=ref(false)
const roleChange=async(i,ind,type,id)=>{
    if(rolePending.value){
    
    toast.add({ severity: 'info', summary: 'Info', detail: 'Please wait', life: 3000 });

return
    }
rolePending.value=true
try{
const response=await fetchWithAuth('http://localhost:7000/api/v1/user/role',{
    method:"POST",

    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        user_id:id,
        role_type:type,
        role:i.value.value
    })
})

rolePending.value=false
getUsers()
}catch(e) {
    rolePending.value=false
console.log(e);
}
}

const value = ref(null);
const img_access = ref([
  { name: "Full", value: "full" },
  { name: "Self", value: "self" },
  { name: "No Access", value: null },
]);
const image_edit = ref([
  { name: "Full", value: "full" },
  { name: "Self", value: "self" },
  { name: "No Access", value: null },
]);
const image_delete = ref([
  { name: "Full", value: "full" },
  { name: "Self", value: "self" },
  { name: "No Access", value: null },
]);
</script>

<style scoped>
Chip{
    max-width: 5px;
}
.admin_container{
    margin: 50px;
    border: 1px solid black;
    border-radius: 10px;
    padding: 20px;
}
.content_wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}
label {
  margin-bottom: 10px;
}
p {
  margin-bottom: 0 !important;
  margin-top: 0 !important;
  margin-right: 10px !important;
}
.heade_list {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100% !important;
}
.overlay_spin{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100px;
    height: 100px;
    background-color: rgba(255, 255, 255, 0.2);
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 24px;
    z-index: 100;
    transition: opacity 0.5s ease-in-out;
}
</style>
