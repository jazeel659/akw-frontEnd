<template>
    <div  class="file_upload_container">
      <input type="text" accept="image/*" v-model="textInput"  />
      <input type="file" @change="handleFileChange" :name="textInput" />
      <Button v-if="index!=0" icon="pi pi-trash" @click.prevent="deleteEntry" severity="danger" text rounded aria-label="Filter" />
    </div>
  
  </template>
  
  <script setup>
  import { ref, watch } from 'vue';
  const textInput = ref('');
  const imageUrl = ref('');
  
  const uploadStatus = ref("");
  
  
  
  
  // Props
  const props = defineProps({
    textPlaceholder: {
      type: String,
      default: 'Enter text here'
    },
    index:{
      type: Number,
      
    }
  });
  
  // Emits
  const emit = defineEmits(['update:modelValue', 'update:image','update:entry']);

  function handleFileChange(event) {
    const file = event.target.files[0];
   
        emit('update:image', file);
    
  }
  const deleteEntry=()=>{
    emit('update:entry');
   
    
 
  }
  
  
  watch(textInput, (newValue) =>{
    emit('update:modelValue', newValue);
  });
  </script>
  
  <style scoped>
  .file_upload_container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
          padding:30px ;
        margin-top: 20px;
    
    width: 100%;
  margin-top:2rem;
  border:1px solid black;
  border-radius:10px ;
  }
  </style>
  