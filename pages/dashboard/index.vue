<template>
  <!-- <div class="file_upload_container">
    <input type="text" v-model="label" />
    <input type="file" @change="handleFileChange" />
    <Button @click.prevent="uploadFile" label="Submit" />
  </div> -->
  <div class="dashboard_container">
    <NuxtLink v-if="isAdmin" to="/admin">admin</NuxtLink>

    <ImageComponentVue
      v-for="(item, index) in data"
      v-model="data[index].label"
      @update:image="(e)=>updateImage(e,index)"
      @update:entry="(e)=>updateEntry(e,index)"
    :index="index"

      :key="index"
    ></ImageComponentVue>

    <Button size="small" class="btn_add" @click.prevent="addEntry" label="+Add entry" />
    <Button
    class='btn_submit'
      @click.prevent="uploadFile"
      label="Submit"
    />
    <div class="preview_wrapper">
      <div class="error_preview">
        <p v-if="imageList?.length===0">no images are available for preview</p>

      </div>
    <PeviewComponentVue
    @image:deleted="()=>deleteImage(item._id)"
    v-for="item in imageList"
    :data="item"
    >
    </PeviewComponentVue>
  </div>
  </div>
</template>

<script setup>

const isAdmin=useCookie("isAdmin").value
const label = ref(null);
const data=ref([{label,image:null}])
const file = ref(null);
const imageList=ref([])
const uploadStatus = ref("");
const updateImage=(e,i)=>{
data.value[i].image=e

}
const deleteImage=async(id)=>{
  try{
    const response = await fetchWithAuth('http://localhost:7000/api/v1/image/delete',{
      method: 'POST',
     
body: {
  id
}
    })
    getImages()

  }catch(e){
    console.error(e);
  }
}
const updateEntry=(e,index)=>{
  data.value.splice(index,1);
}
const addEntry=()=>{
           data.value.push({label:null,image:null});

          }
const handleFileChange = (event) => {
  file.value = event.target.files[0];
};

const uploadFile = async () => {
  

 

  try {
    const formData = new FormData();
  data.value.forEach((x,i)=>{
    if(!x.label ||!x.image){
      console.log('please fill ups');
      throw new Error("Please fill ups")
    }
    formData.append(`image${i}`, x.image)
  formData.append(`label${i}`, x.label)

  })
    const response = await fetchWithAuth("http://localhost:7000/api/v1/image", {
      method: "POST",
      body: formData,
    });
getImages()
    uploadStatus.value = "Upload successful!";
  } catch (error) {
    uploadStatus.value = "Upload failed!";
    console.error("Upload error:", error);
  }
};


// Define the onMounted lifecycle hook
const getImages=async () => {
  try {
    // fetchWithAuth data from an API
    const response = await fetchWithAuth('http://localhost:7000/api/v1/image/images',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // body: JSON.stringify({}),
    });
    imageList.value=response.data;

  }catch (error) {
    console.error('Error fetchWithAuthing data:', error);
  
}}
getImages()
</script>
<style scoped>
.file_upload_container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 100%;
}
.preview_wrapper{
  border:1px solid black;
  margin-top:2rem;
  border-radius:10px ;
  min-height: 40px;
}
.dashboard_container{
  display:flex;
  flex-direction:column;
  
  gap: 10px;
}
.btn_submit{
  width: fit-content;
  align-self:center;
 
}
.btn_add{
  width:fit-content;
  align-self:flex-end;

}
.error_preview{
  display: flex;
  justify-content: center;
}
</style>
