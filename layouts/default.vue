<template>
    <div>
      <header>
        <slot name="header" >
            <div class="header_wrap">
                <h1> AKW consultants</h1>
                <Button @click.prevent="confirm2()" icon="pi pi-sign-out" class="logout_btn" severity="warning" rounded outlined aria-label="Star" />

            </div>
        </slot>
      </header>
      <main class="main_continer">
        <div class="sidebar_container" >
            <ConfirmDialog id="confirm" />

            <Button label="Home" as="router-link" to="/" icon="pi pi-home" severity="info" />
            <Button  as="router-link" to="/admin" label="Admin" icon="pi pi-user" severity="info" :disabled="!is_admin" />

        </div>
        <div class="content_container">
        <slot />

        </div>
      </main>
      <Toast />
    </div>
  </template>
  <script setup>
import { useConfirm } from "primevue/useconfirm";

import { useRouter } from 'vue-router';
const router=useRouter()
const confirm = useConfirm();

const is_admin=useCookie("isAdmin").value
const confirm2 = () => {
    confirm.require({
        message: 'Do you want to  Logout?',
        header: 'Danger Zone',
        icon: 'pi pi-info-circle',
        rejectLabel: 'Cancel',
        rejectProps: {
            label: 'Cancel',
            severity: 'secondary',
            outlined: true
        },
        acceptProps: {
            label: 'Logout',
            severity: 'warn'
        },
        accept: () => {
            logOutUser()


        },
        reject: () => {
        }
    });
};
const logOutUser=async()=>{
    try {
        const access_token = useCookie('access_token').value
const refresh_token = useCookie('refresh_token').value
const isAdmin = useCookie('isAdmin').value
const img_delete = useCookie('img_delete').value
const img_edit = useCookie('img_edit').value
const img_access = useCookie('img_access').value
        const response= await fetchWithAuth("http://localhost:7000/api/v1/user/logout",{
      method: 'POST',
     
body: {
    access_token:access_token,
    refresh_token:refresh_token
}
    })
if(response.status=="ok"){
    useCookie('access_token').value=null
useCookie('refresh_token').value=null
useCookie('isAdmin').value=null
useCookie('img_delete').value=null
useCookie('img_edit').value=null
useCookie('img_access').value=null
router.push('/');

}
        
    } catch (error) {
        console.log(error);
    }
}
</script>
  <style scoped>

.header_wrap{
    display: flex;
    justify-content: center;
    align-items: center;
   background-color: rgb(42, 41, 41);

    padding: 20px;
    border-bottom: 2px solid rgb(87, 85, 85) !important;
    height: 5rem !important;
}
h1{
    text-align: center;
    margin: 0;
    color: antiquewhite;
}
.main_continer{
display: flex;  

}
.content_container{
    flex: 1;
}
.sidebar_container{
    width: 15%;
    min-width: 105px !important;
    display: flex;
    flex-direction: column;
    gap: 0.8rem !important;
    background-color: rgb(232, 231, 231);
    /* border-right: 1px solid rgb(87, 85, 85); */
    margin-right: 6px !important;
    padding: 5px 5px !important;
    padding-bottom: 0;
}
.logout_btn{
    position: absolute;
    right: 30px;

}

</style>