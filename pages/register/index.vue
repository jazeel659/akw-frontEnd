<template>
     <div class="card flex justify-center login_wrapper">
      <h1> Register</h1>

        <FloatLabel class="mb-2">
            <InputText id="name" v-model="name" />
            <label for="name">name</label>
        </FloatLabel>
        <FloatLabel class="mb-2">
            <InputText id="email" v-model="email" />
            <label for="email">email</label>
        </FloatLabel>
        <FloatLabel>
            <Password :invalid="password!=rePassword" class="pass_el" id="password" v-model="password" toggleMask  />
            <label for="password">password</label>
        </FloatLabel>
        <FloatLabel>
            <Password :invalid="password!=rePassword" class="pass_el" id="password" v-model="rePassword" toggleMask  />
            <label for="password">password</label>
        </FloatLabel>
        <div class="card flex justify-center">
        <Button @click.prevent="registerUser" label="Register" />
    </div>
    <NuxtLink to="/">Login</NuxtLink>
    </div>
</template>


<script setup>
import { useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';
definePageMeta({
  layout: 'custom'
})
const toast = useToast();
const router=useRouter()
const name=ref("")
const email=ref("")
const password=ref("")
const rePassword=ref("")
const registerUser=async()=>{

try{
    if(email.value=="" || name.value=="" || password.value=="" || rePassword.value=="" || password.value!=rePassword.value){
        console.log(name,email,password,rePassword);
        return 
    }

  const response=await $fetch('http://localhost:7000/api/v1/user/register',{
    method: 'POST',
    body: JSON.stringify({name:name.value,email:email.value,password:password.value})
  })
if(response.status==="ok"){
    toast.add({ severity: 'info', summary: 'Info', detail: 'User Registered', life: 3000 });
router.push('/');


}

}catch(e){

console.log(e);
}

}

</script>

<style scoped>
.p-inputtext{
  width:14rem !important;

}
.p-inputtext,p-component,p-password-input{
    width: 14rem !important;
}
.login_wrapper{
  height: 100vh !important;
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 25px;
}

</style>