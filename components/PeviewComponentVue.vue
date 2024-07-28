<template>

    <div class="image_preview_container">
        
        <p>{{data.label}}</p>
        
        <img  class="image_preview" :src="image">
    </img>
    <div class="cont_1">


        <Button icon="pi pi-trash" @click.prevent="confirm2" severity="danger" text raised rounded aria-label="Remove" />
        <Button icon="pi pi-pencil" text raised rounded aria-label="Filter" />
    </div>
     </div>

     
</template>
<script setup>
import { useConfirm } from "primevue/useconfirm";
const confirm = useConfirm();
const isVisible = ref(false);
const confirm2 = () => {
    confirm.require({
        message: 'Do you want to delete this record?',
        header: 'Danger Zone',
        icon: 'pi pi-info-circle',
        rejectLabel: 'Cancel',
        rejectProps: {
            label: 'Cancel',
            severity: 'secondary',
            outlined: true
        },
        acceptProps: {
            label: 'Delete',
            severity: 'danger'
        },
        accept: () => {
            deleteImage()


        },
        reject: () => {
        }
    });
};

const props = defineProps({
    data: {
      type: Object,
      default:{}
   
    }
  });
  console.log(props.data);
const image=ref(null)
const getImage=async()=>{
const response = await $fetch("http://localhost:7000/api/v1/image/"+props?.data?.filename,{
    method:'GET'
})
image.value= URL.createObjectURL(response);
}
const emit = defineEmits(['image:deleted']);

getImage()
const deleteImage=()=>{
    emit('image:deleted');
}
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


