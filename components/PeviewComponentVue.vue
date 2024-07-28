<template>

    <div class="image_preview_container">
        
        <p>{{data.label}}</p>
        
        <img  class="image_preview" :src="image">
    </img>
    <div class="cont_1">

        <Button icon="pi pi-trash" @click.prevent="deleteImage" severity="danger" text raised rounded aria-label="Remove" />
        <Button icon="pi pi-pencil" text raised rounded aria-label="Filter" />
    </div>
     </div>

     
</template>
<script setup>

const props = defineProps({
    data: {
      type: Object,
      default:{}
   
    }
  });
  console.log(props.data);
const image=ref(null)
const getImage=async()=>{
const response = await $fetch("http://localhost:7000/api/v1/image/123",{
    method:'GET'
})
image.value= URL.createObjectURL(response);
}
const emit = defineEmits(['image:deleted']);

getImage()
const deleteImage=()=>{
    emit('image:deleted');
}
  console.log(props.data.paths);
const url=`www.${props.data.path}`
</script>


<style  scoped>
    .image_preview_container{
        display: flex;
        justify-content: space-between;
        gap:5px;
        align-items: center;
        min-height: 40px;
      padding:30px ;
        margin-top: 20px;
    }
    .image_preview{

        width:300px;
    }
    .cont_1{
        display: flex;
        gap:5px;
        align-items: center;
        justify-content: space-between;
 
    }
</style>


