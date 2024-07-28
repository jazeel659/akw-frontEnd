<template>

    

    <div class="card flex justify-center login_wrapper">
      <h1> Login</h1>
        <FloatLabel class="mb-2">
            <InputText id="email" v-model="email" />
            <label for="email">email</label>
        </FloatLabel>
        <FloatLabel>
            <Password  id="password" v-model="password" toggleMask  />
            <label for="password">password</label>
        </FloatLabel>
        <div class="card flex justify-center">
        <Button @click.prevent="loginUser" label="Submit" />
    </div>
    <NuxtLink to="/register">Register</NuxtLink>
    </div>

</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
definePageMeta({
  layout: 'custom'
})
const access_token = useCookie('access_token')
const refresh_token = useCookie('refresh_token')
const isAdmin = useCookie('isAdmin')
const img_delete = useCookie('img_delete')
const img_edit = useCookie('img_edit')
const img_access = useCookie('img_access')
const router = useRouter();



const email = ref(null);
const password = ref(null);

const loginUser=async()=>{

  try{

    const response=await $fetch('http://localhost:7000/api/v1/user/login',{
      method: 'POST',
      body: JSON.stringify({email:email.value,password:password.value})
    })
 if(response.status==="ok"){
access_token.value=response.token
refresh_token.value=response.refreshToken
img_access.value=response.img_access
img_delete.value=response.img_delete
img_edit.value=response.img_edit
isAdmin.value=response.isAdmin

  router.push('/dashboard');


 }

  }catch(e){

console.log(e);
  }

}
</script>

<style  scoped>
.p-inputtext{
  width:15.5rem !important;

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